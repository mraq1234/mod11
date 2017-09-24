/**
 * Root Reducer
 */
import { combineReducers } from 'redux';
import recycleState from 'redux-recycle';

// Import Reducers
import user from './modules/User/UserReducer';
import kanbans from './modules/Kanban/KanbanReducer';
import lanes from './modules/Lane/LaneReducer';
import notes from './modules/Note/NoteReducer';
import intl from './modules/Intl/IntlReducer';

import * as lanesActions from './modules/Lane/LaneActions';

// Combine all reducers into one root reducer
export default combineReducers({
  user,
  kanbans,
  lanes: recycleState(lanes, [lanesActions.RECYCLE_STATE], {}),
  notes: recycleState(notes, [lanesActions.RECYCLE_STATE], {}),
  intl,
});
