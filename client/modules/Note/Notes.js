import React, { PropTypes } from 'react';
import Edit from '../../components/Edit';
import Note from './Note';
const onValueClick = (e, updateNote, note) => {
  note.editing = true;
//updateNote(note);
//  e.target.editing = true;
//
}

const Notes = ({ notes, ...props }) => {
  return (
    <ul className="notes">{notes.map((note) =>
      <Note
        id={note.id}
        key={note.id}
        editing={note.editing}
      >
        <Edit
          editing={note.editing}
          value={note.task}
          onValueClick={(e, note) => onValueClick(e, props.updateNote, note)}
          onEdit={() => props.updateNote(note)}
          onDelete={() => props.deleteNoteServ(note.id, props.laneId)}
        />
      </Note>
  )}</ul>);
};

Notes.propTypes = {
  laneId: PropTypes.string,
  notes: PropTypes.array,
  deleteNote: PropTypes.func,
  updateNote: PropTypes.func,
};

export default Notes;
