/* eslint-disable no-case-declarations,no-redeclare */
import { CREATE_LANE, CREATE_LANES, UPDATE_LANE, DELETE_LANE } from './LaneActions';
import { ADD_NOTE, DELETE_NOTE, MOVE_NOTE } from '../Note/NoteActions';
import _ from 'lodash';

const initialState = {};

export default function lanes(state = initialState, action) {
  switch (action.type) {
    case CREATE_LANE:
    case UPDATE_LANE:
      return {
        ...state,
        [action.lane.id]: action.lane,
      };
    case CREATE_LANES:
      return {
        ...action.lanes,
      };
    case DELETE_LANE:
      {
        return _.omit(state, action.id);
      }
    case ADD_NOTE:
      {
        const newLane = state[action.laneId];
        const lineNotesArray = [
          ...newLane.notes,
          action.note.id,
        ];
        newLane.notes = lineNotesArray;
        return {
          ...state,
          [action.laneId]: newLane,
        };
      }
    case DELETE_NOTE:
      {
        const newLane = state[action.laneId];
        const lineNotesArray = _.without(state[action.laneId].notes, action.noteId);
        newLane.notes = lineNotesArray;
        return {
          ...state,
          [action.laneId]: newLane,
        };
      }
    case MOVE_NOTE:
      {
        let newState = {};
        _.forEach(state, (val, key) => {
          const srcIdx = _.indexOf(val.notes, action.sourceNoteId);
          const trgIdx = _.indexOf(val.notes, action.targetNoteId);
          if (srcIdx >= 0) {
            val.notes.splice(srcIdx, 1);
          }
          if (key === action.targetLaneId) {
            val.notes.splice(trgIdx, 0, action.sourceNoteId);
          }
          newState = Object.assign(newState, { [key]: val });
        });
        return newState;
      }
    default:
      return state;
  }
}
