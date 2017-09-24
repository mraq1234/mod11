import { connect } from 'react-redux';
import Lane from './Lane';
import { deleteLaneServ, updateLaneServ, moveLane, moveLaneServ } from './LaneActions';
import { addNoteServ, moveNote } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import { getIdToken } from '../User/UserSelectors';


const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    if (!targetProps.lane.notes.length) {
      targetProps.moveNote('', sourceProps.note.id, targetProps.lane.id, sourceProps.laneId);
      monitor.getItem().laneId = targetProps.lane.id; // eslint-disable-line no-param-reassign
    }
  },
};

const laneTarget = {
  hover(targetProps, monitor) {
    const sourceLaneId = monitor.getItem().laneId;
    const targetLaneId = targetProps.lane.id;
    if (targetLaneId === sourceLaneId) {
      return;
    }
    targetProps.moveLane(sourceLaneId, targetLaneId);
  },
};

const laneSource = {
  beginDrag(props) {
    return {
      laneId: props.lane.id,
    };
  },
  isDragging(props, monitor) {
    return props.lane.id === monitor.getItem().laneId;
  },
  endDrag(props) {
    props.moveLaneServ(props.kanbanId, props.lanesIds);
  },
};

const mapStateToProps = (state) => {
  return {
    idToken: getIdToken(state),
  };
};

const mapDispatchToProps = {
  deleteLaneServ,
  addNoteServ,
  updateLaneServ,
  moveNote,
  moveLane,
  moveLaneServ,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragSource(ItemTypes.LANE, laneSource, (connect, monitor) => ({ // eslint-disable-line
    connectDragPreview: connect.dragPreview(),
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({ // eslint-disable-line
    connectDropTargetNote: connect.dropTarget(),
  })), // eslint-disable-line
  DropTarget(ItemTypes.LANE, laneTarget, (connect) => ({ // eslint-disable-line
    connectDropTargetLane: connect.dropTarget(),
  })),
)(Lane);
