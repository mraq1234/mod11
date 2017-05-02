/**
 * Root Reducer
 */
import { combineReducers } from 'redux';

// Import Reducers
import kanban from './modules/Kanban/KanbanReducer';
import lanes from './modules/Lane/LaneReducer';
import notes from './modules/Note/NoteReducer';
import intl from './modules/Intl/IntlReducer';

// Combine all reducers into one root reducer
export default combineReducers({
  kanban,
  lanes,
  notes,
  intl,
});
