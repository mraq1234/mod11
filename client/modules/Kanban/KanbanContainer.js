import Kanban from './Kanban';
import { connect } from 'react-redux';
import { createLaneServ, fetchLanes } from '../Lane/LaneActions';
import { getLanes, getNotes } from './KanbanSelectors';

Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: getLanes(state),
  notes: getNotes(state),
});

const mapDispatchToProps = {
  createLaneServ,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
