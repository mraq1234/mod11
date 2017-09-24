import {
  CREATE_KANBANS,
  CREATE_KANBAN,
  UPDATE_KANBAN,
  DELETE_KANBAN,
} from './KanbanActions';

import {
  CREATE_LANE,
} from '../Lane/LaneActions';
import _ from 'lodash';

const initialState = {};

export default function kanbans(state = initialState, action) {
  switch (action.type) {
    case CREATE_KANBANS:
      return {
        ...action.kanbans,
      };
    case CREATE_KANBAN:
    case UPDATE_KANBAN:
      return {
        ...state,
        [action.kanban.id]: action.kanban,
      };
    case CREATE_LANE: {
      const newKanban = { ...state[action.kanbanId] };
      newKanban.lanes.push(action.lane._id);
      return {
        ...state,
        [action.kanbanId]: newKanban,
      };
    }
    case DELETE_KANBAN:
      return _.omit(state, action.kanbanId);
    default:
      return state;
  }
}
