import React, { PropTypes } from 'react';
import Note from './Note';
import styles from './Note.css';

const Notes = (props) => {
  const { notes, laneId, attachNote, moveNote } = props;
  return (
    <ul className={styles.notes}>
      {notes.map((note) => {
        return (
          <Note
            key={note.id}
            note={note}
            laneId={laneId}
            moveNote={moveNote}
            attachNote={attachNote}
            {...props}
          />
        );
      }
      )}
    </ul>
  );
};


Notes.propTypes = {
  laneId: PropTypes.string,
  notes: PropTypes.array,
  deleteNoteServ: PropTypes.func,
  updateNoteServ: PropTypes.func,
  moveNote: PropTypes.func,
  attachNote: PropTypes.func,
};

export default Notes;
