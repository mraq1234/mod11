import Kanban from './Kanban';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createLaneServ, fetchLanes } from '../Lane/LaneActions';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';


Kanban.need = [() => { return fetchLanes(); }];

const mapStateToProps = state => ({
  lanes: Object.values(state.lanes),
  notes: Object.values(state.notes),
});

const mapDispatchToProps = {
  createLaneServ,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragDropContext(HTML5Backend), // eslint-disable-line
)(Kanban);
