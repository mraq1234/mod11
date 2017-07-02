import React, { PropTypes, Component } from 'react';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';
import drgIco from './drag.png';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { connectDragSource, connectDragPreview, connectDropTargetNote, connectDropTargetLane, isDragging, lane, ...props } = this.props;
    const laneId = lane.id;
    const dragSource = this.state.editing ? a => a : connectDragSource;
    return connectDragPreview(connectDropTargetLane(connectDropTargetNote(
      <div style={{ opacity: isDragging ? 0 : 1 }} className={styles.lane}>
        <div className={styles.LaneHeader}>
          {dragSource(
            <div style={{ background: `#b0b0b0 url(${drgIco}) center` }} className={styles.LaneHandler} />
          )}
          <Edit
            className={styles.LaneName}
            editing={this.state.editing}
            value={lane.name}
            onValueClick={() => this.setState({ editing: true })}
            onEdit={value => {
              props.updateLaneServ(Object.assign({}, lane, { name: value }));
              this.setState({ editing: false });
            }}
          />
          <div className={styles.LaneDelete}>
            <button onClick={props.deleteLaneServ.bind(this, lane.id)}> x </button>
          </div>
        </div>
        <NotesContainer laneId={lane.id} />
        <div
          className={styles.LaneAddNote}
          // onClick={() => props.updateLane(lane)}
        >
          <button
            onClick={props.addNoteServ.bind(this, laneId)}
          >
            ADD TASK
          </button>
        </div>
      </div>
    )));
  }
}

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  deleteLaneServ: PropTypes.func,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
  connectDragSource: PropTypes.func,
  connectDropTargetNote: PropTypes.func,
  connectDropTargetLane: PropTypes.func,
  isDragging: PropTypes.bool,
  connectDragPreview: PropTypes.func,
};

export default Lane;

