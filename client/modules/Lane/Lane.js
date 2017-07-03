import React, { Component } from 'react';
import propTypes from 'prop-types';
import NoteList from '../Note/NoteListContainer';
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
    const {
      connectDragSource,
      connectDragPreview,
      connectDropTargetNote,
      connectDropTargetLane,
      isDragging,
      deleteLaneServ,
      addNoteServ,
      updateLaneServ,
      lane,
    } = this.props;
    const laneId = lane.id;
    const dragSource = this.state.editing ? a => a : connectDragSource;
    return connectDragPreview(connectDropTargetLane(connectDropTargetNote(
      <div
        style={{
          opacity: isDragging ? 0 : 1,
        }}
        className={styles.lane}
      >
        <div className={styles.LaneHeader}>
          {dragSource(<div
            style={{
              background: `#b0b0b0 url(${drgIco}) center`,
            }}
            className={styles.LaneHandler}
          />)}
          <Edit
            className={styles.LaneName}
            editing={this.state.editing}
            value={lane.name}
            onValueClick={() => this.setState({ editing: true })}
            onEdit={value => {
              updateLaneServ(Object.assign({}, lane, { name: value }));
              this.setState({ editing: false });
            }}
          />
          <div className={styles.LaneDelete}>
            <button onClick={() => deleteLaneServ(lane.id)}>
              x
            </button>
          </div>
        </div>
        <NoteList laneId={lane.id} />
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNoteServ(laneId)}>
            ADD TASK
          </button>
        </div>
      </div>
    )));
  }
}

Lane.propTypes = {
  lane: propTypes.object,
  laneNotes: propTypes.array,
  deleteLaneServ: propTypes.func,
  updateLane: propTypes.func,
  addNoteServ: propTypes.func,
  updateLaneServ: propTypes.func,
  connectDragSource: propTypes.func,
  connectDropTargetNote: propTypes.func,
  connectDropTargetLane: propTypes.func,
  isDragging: propTypes.bool,
  connectDragPreview: propTypes.func,
};

export default Lane;
