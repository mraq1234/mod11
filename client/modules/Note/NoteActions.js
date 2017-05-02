import callApi from '../../util/apiCaller';
export const CREATE_NOTE = 'CREATE_NOTE';
export const CREATE_NOTES = 'CREATE_NOTES';
export const UPDATE_NOTE = 'UPDATE_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
// Export Actions
export function createNote(note) {
  return {
    type: CREATE_NOTE,
    note,
  };
}

export function createNotes(notes) {
  return {
    type: CREATE_NOTES,
    notes,
  };
}

export function updateNote(note) {
  return {
    type: UPDATE_NOTE,
    note,
  };
}

export function deleteNote(noteId, laneId) {
  return {
    type: DELETE_NOTE,
    noteId,
    laneId,
  };
}

export function deleteNoteServ(noteId, laneId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}/notes/${noteId}`, 'delete').then(() => {
      return dispatch(deleteNote(noteId, laneId));
    });
  };
}

export function addNote(note, laneId) {
  return {
    type: ADD_NOTE,
    note, laneId,
  };
}

export function addNoteServ(laneId) {
  return (dispatch) => {
    return callApi(`lanes/${laneId}/notes`, 'post', { task: 'new task' }).then((res) => {
      return dispatch(addNote(res.saved, res.laneId));
    });
  };
}

