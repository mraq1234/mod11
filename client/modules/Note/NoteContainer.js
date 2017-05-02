import { connect } from 'react-redux';
import Notes from './Notes';
import * as noteActions from '../Note/NoteActions';
import _ from 'lodash';

const mapStateToProps = (state, ownProps) => {
  return {
    notes: ownProps.notes.map((noteId) => {
      const newNote = {
        ...state.notes[noteId],
        editing: false,
      };
      return newNote;
    }).filter((note) => note.id),
  };
};

const mapDispatchToProps = {
  ...noteActions,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Notes);
