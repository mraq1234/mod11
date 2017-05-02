import Kanban from './Kanban';
import { connect } from 'react-redux';
import { createLaneServ, fetchLanes } from '../Lane/LaneActions';

Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
  notes: Object.values(state.notes),
});

const mapDispatchToProps = {
  createLaneServ,
};

export default connect(mapStateToProps, mapDispatchToProps)(Kanban);
