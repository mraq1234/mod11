import React, { PropTypes } from 'react';
import Note from './Note';
import styles from './Note.css';

const Notes = ({ notes, ...props }) => {
  return (
    <ul className={styles.notes}>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            laneId={props.laneId}
            deleteNote={props.deleteNoteServ}
            updateNote={props.updateNoteServ}
          />
        );
      }
      )}</ul>);
};


Notes.propTypes = {
  laneId: PropTypes.string,
  notes: PropTypes.array,
  deleteNoteServ: PropTypes.func,
  updateNoteServ: PropTypes.func,
};

export default Notes;
