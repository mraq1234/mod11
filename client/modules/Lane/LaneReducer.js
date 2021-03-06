/* eslint-disable no-case-declarations,no-redeclare */
import {
  CREATE_LANE,
  CREATE_LANES,
  UPDATE_LANE,
  DELETE_LANE,
  MOVE_LANE,
} from './LaneActions';
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
    case DELETE_LANE: {
      return _.omit(state, action.id);
    }
    case ADD_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = [...newLane.notes, action.note.id];
      return {
        ...state,
        [action.laneId]: newLane,
      };
    }
    case DELETE_NOTE: {
      const newLane = { ...state[action.laneId] };
      newLane.notes = _.without(
        state[action.laneId].notes,
        action.noteId
      );
      return {
        ...state,
        [action.laneId]: newLane,
      };
    }
    case MOVE_NOTE: {
      const sourceIndex = _.indexOf(
        state[action.sourceLaneId].notes,
        action.sourceNoteId
      );
      const targetIndex = _.indexOf(
        state[action.targetLaneId].notes,
        action.targetNoteId
      );
      const newSourceLane = { ...state[action.sourceLaneId] };
      if (action.sourceLaneId !== action.targetLaneId) {
        const newTargetLane = { ...state[action.targetLaneId] };
        newSourceLane.notes.splice(sourceIndex, 1);
        newTargetLane.notes.splice(targetIndex, 0, action.sourceNoteId);
        return {
          ...state,
          [action.sourceLaneId]: newSourceLane,
          [action.targetLaneId]: newTargetLane,
        };
      }
      newSourceLane.notes.splice(sourceIndex, 1);
      newSourceLane.notes.splice(targetIndex, 0, action.sourceNoteId);
      return {
        ...state,
        [action.sourceLaneId]: newSourceLane,
      };
    }
    case MOVE_LANE: {
      let returnState = {};
      _.forEach(state, (val, key) => {
        if (key === action.targetLaneId) {
          returnState = {
            ...returnState,
            [action.sourceLaneId]: state[action.sourceLaneId],
          };
        } else if (key === action.sourceLaneId) {
          returnState = {
            ...returnState,
            [action.targetLaneId]: state[action.targetLaneId],
          };
        } else {
          returnState = {
            ...returnState,
            [key]: val,
          };
        }
      });
      return returnState;
    }
    default:
      return state;
  }
}
