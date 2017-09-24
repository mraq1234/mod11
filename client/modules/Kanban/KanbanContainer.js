import Kanban from './Kanban';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { createLaneServ, fetchLanes } from '../Lane/LaneActions';
import { getIdToken } from '../User/UserSelectors';
import { getKanban } from './KanbanSelectors';
import { updateKanbanServ, deleteKanbanServ } from './KanbanActions';

// Kanban.need = [(state) => { return fetchLanes(getLanesIds(Object.values(state.kanbans), ownProps.params.id), getIdToken(state)); }];
const mapStateToProps = (state, ownProps) => {
  return ({
    lanes: Object.values(state.lanes),
    notes: Object.values(state.notes),
    idToken: getIdToken(state),
    kanban: getKanban(state.kanbans, ownProps.params.id),
  });
};

const mapDispatchToProps = {
  createLaneServ, fetchLanes, updateKanbanServ, deleteKanbanServ,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend), // eslint-disable-line
)(Kanban);
