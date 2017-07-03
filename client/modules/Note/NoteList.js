import React from 'react';
import propTypes from 'prop-types';
import Note from './NoteContainer';
import styles from './Note.css';

const Notes = (props) => {
  const { notes, laneId } = props;
  return (
    <ul className={styles.notes}>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            laneId={laneId}
          />
        );
      }
      )}
    </ul>
  );
};


Notes.propTypes = {
  laneId: propTypes.string,
  notes: propTypes.array,
  deleteNoteServ: propTypes.func,
  updateNoteServ: propTypes.func,
  moveNote: propTypes.func,
  attachNote: propTypes.func,
};

export default Notes;
