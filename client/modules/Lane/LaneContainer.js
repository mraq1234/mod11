import { connect } from 'react-redux';
import Lane from './Lane';
import * as laneActions from './LaneActions';
import { createNote, addNoteServ, moveNote } from '../Note/NoteActions';
import { compose } from 'redux';
import { DropTarget, DragSource } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';

const noteTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    if (!targetProps.lane.notes.length) {
      targetProps.moveNote('', sourceProps.note.id, targetProps.lane.id, sourceProps.laneId);
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
};

const mapDispatchToProps = {
  ...laneActions,
  createNote, addNoteServ, moveNote,
};

export default compose(
  connect(null, mapDispatchToProps),
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
