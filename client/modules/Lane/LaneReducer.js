import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE } from './LaneActions';
import { ADD_NOTE, DELETE_NOTE } from '../Note/NoteActions';
import _ from 'lodash';

const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return { ...state, [action.lane.id]: action.lane };
    case CREATE_LANES:
      return { ...action.lanes };
    case DELETE_LANE:
      return _.omit(state, action.id);
    case ADD_NOTE:
      {
        const newLane = state[action.laneId];
        newLane.notes.push(action.note.id);
        newLane.editing = true;
        return { ...state, [action.laneId]: newLane };
      }
    case DELETE_NOTE:
      {
        const newLane = state[action.laneId];
        const lineNotesArray = _.without(state[action.laneId].notes, action.noteId);
        newLane.notes = lineNotesArray;
        return { ...state, [action.laneId]: newLane };
      }
    default:
      return state;
  }
}