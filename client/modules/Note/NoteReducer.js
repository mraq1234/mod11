import { CREATE_NOTE, CREATE_NOTES, UPDATE_NOTE, DELETE_NOTE, ADD_NOTE } from './NoteActions';
import _ from 'lodash';

const initialState = {};

export default function notes(state = initialState, action) {
  switch (action.type) {
    case CREATE_NOTE:
    case UPDATE_NOTE:
    case ADD_NOTE:
      return { ...state, [action.note.id]: action.note };
    case CREATE_NOTES:
      return { ...action.notes };
    case DELETE_NOTE:
      return _.omit(state, [action.noteId]);
    default:
      return state;
  }
}
