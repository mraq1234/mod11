import React, { PropTypes } from 'react';
import NotesContainer from '../Note/NoteContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';

const Lane = ({ lane, ...props }) => {
  const laneId = lane.id;
  return (
    <div {...props}>
      <div className={styles.LaneHeader}>
        <div
          className={styles.LaneAddNote}
          onClick={() => {
            const newlane = lane;
            newlane.editing = true;
            props.updateLane(lane);
          }}
        >
          <button
            onClick={props.addNoteServ.bind(this, laneId)}
          >
          +
          </button>
        </div>
        <Edit
          laneProp={lane}
          className={styles.LaneName}
          editing={lane.editing}
          value={lane.name}
          onEdit={newLane => props.updateLane(newLane)}
        />
        <div className={styles.LaneDelete}>
          <button onClick={props.deleteLaneServ.bind(this, lane.id)}>x</button>
        </div>
      </div>
      <NotesContainer
        laneId={lane.id}
        notes={lane.notes}
      />
    </div>
  );
};

Lane.propTypes = {
  lane: PropTypes.object,
  laneNotes: PropTypes.array,
  deleteLaneServ: PropTypes.func,
  updateLane: PropTypes.func,
  addNote: PropTypes.func,
};

export default Lane;

