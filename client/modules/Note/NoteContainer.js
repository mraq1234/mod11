import { compose } from 'redux';
import { connect } from 'react-redux';
import { DragSource, DropTarget } from 'react-dnd';
import Note from './Note';
import { updateNoteServ, deleteNoteServ, moveNote, moveNoteServ } from '../Note/NoteActions';
import ItemTypes from '../Kanban/itemTypes';
import _ from 'lodash';

const noteSource = {
  beginDrag(props) {
    return {
      note: props.note,
      laneId: props.laneId,
      targetNoteId: '',
    };
  },
  isDragging(props, monitor) {
    return props.note.id === monitor.getItem().note.id;
  },
  endDrag(props, monitor) {
    function mapNotesId(laneId) {
      return props.lanes[laneId].notes.map(note => {
        return props.allNotes[note]._id;
      });
    }

    const sourceLaneId = props.laneId;
    const sourceLaneNotes = mapNotesId(sourceLaneId);
    let targetLaneId = monitor.getDropResult() ? monitor.getDropResult().targetLaneId : '';
    let targetLaneNotes = '';

    if (targetLaneId) {
      targetLaneNotes = mapNotesId(targetLaneId);
    } else {
      _.forEach(props.lanes, (val, key) => {
        if (props.lanes[key].notes.indexOf(props.note.id) >= 0) {
          targetLaneNotes = mapNotesId(key);
          targetLaneId = props.lanes[key].id;
          return false;
        }
        return true;
      });
    }
    props.moveNoteServ(sourceLaneNotes, targetLaneNotes, sourceLaneId, targetLaneId);
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const { note, laneId } = targetProps;
    const sourceNote = monitor.getItem().note;
    if (sourceNote.id !== note.id) {
      targetProps.moveNote(note.id, sourceNote.id, laneId, monitor.getItem().laneId);
      monitor.getItem().laneId = laneId; // eslint-disable-line no-param-reassign
    }
  },
  drop(props) {
    return {
      targetLaneId: props.laneId,
      noteId: props.note._id,
    };
  },
};

const mapStateToProps = (state) => {
  return {
    lanes: state.lanes,
    allNotes: state.notes,
  };
};

const mapDispatchToProps = {
  updateNoteServ, deleteNoteServ, moveNote, moveNoteServ,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({ // eslint-disable-line
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({ // eslint-disable-line
    connectDropTarget: connect.dropTarget(),
  })),
)(Note);
