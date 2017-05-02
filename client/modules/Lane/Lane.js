import React, { PropTypes, Component } from 'react';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    };
  }

  render() {
    const { lane, ...props } = this.props;
    const laneId = lane.id;
    return (
      <div>
        <div className={styles.LaneHeader}>
          <div
            className={styles.LaneAddNote}
            onClick={() => props.updateLane(lane)}
          >
            <button
              onClick={props.addNoteServ.bind(this, laneId)}
            >
              +
            </button>
          </div>
          <Edit
            className={styles.LaneName}
            editing={this.state.editing}
            value={lane.name}
            onValueClick={() => this.setState({ editing: true })}
            onEdit={value => {
              props.updateLane(Object.assign({}, lane, { name: value }));
              this.setState({ editing: false });
            }}
          />
          <div className={styles.LaneDelete}>
            <button onClick={props.deleteLaneServ.bind(this, lane.id)}>x</button>
          </div>
        </div>
        <NotesContainer laneId={lane.id} />
      </div>
    );
  }
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  deleteLaneServ: PropTypes.func,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
};

export default Lane;

