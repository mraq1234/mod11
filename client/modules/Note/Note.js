import React, { PropTypes, Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './Note.css';
import Edit from '../../components/Edit';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Kanban/itemTypes';
import callApi from '../../util/apiCaller';
import _ from 'lodash';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const { connectDragSource, connectDropTarget, isDragging, note, laneId, ...props } = this.props;
    const dragSource = this.state.editing ? a => a : connectDragSource;
    return dragSource(connectDropTarget(
      <li style={{ opacity: isDragging ? 0 : 1 }} className={styles.Note} {...this.props}>
        <Edit
          editing={this.state.editing}
          value={note.task}
          onValueClick={() => this.setState({ editing: true })}
          onEdit={value => {
            props.updateNoteServ(note.id, value);
            this.setState({ editing: false });
          }}
          onDelete={() => props.deleteNoteServ(note.id, laneId)}
        />
      </li>
    ));
  }
}

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
    const sourceLaneId = props.laneId;
    let targetLaneId = monitor.getDropResult() ? monitor.getDropResult().targetLaneId : '';
    const sourceLaneNotes = props.lanes[sourceLaneId].notes.map(note => {
      return props.allNotes[note]._id;
    });
    let targetLaneNotes = '';
    if (targetLaneId) {
      targetLaneNotes = props.lanes[targetLaneId].notes.map(note => {
        return props.allNotes[note]._id;
      });
    } else {
      _.forEach(props.lanes, (val, key) => {
        if (props.lanes[key].notes.indexOf(props.note.id) >= 0) {
          targetLaneNotes = props.lanes[key].notes.map(note => {
            return props.allNotes[note]._id;
          });
          targetLaneId = props.lanes[key].id;
        }
      });
    }
    callApi('lanes', 'put', { sourceLaneNotes, targetLaneNotes, sourceLaneId, targetLaneId });
  },
};

const noteTarget = {
  hover(targetProps, monitor) {
    const { note, laneId } = targetProps;
    const sourceNote = monitor.getItem().note;
    if (sourceNote.id !== note.id) {
      targetProps.moveNote(note, sourceNote, laneId, monitor.getItem().laneId);
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

export default compose(
  connect(mapStateToProps),
  DragSource(ItemTypes.NOTE, noteSource, (connect, monitor) => ({ // eslint-disable-line
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  })),
  DropTarget(ItemTypes.NOTE, noteTarget, (connect) => ({ // eslint-disable-line
    connectDropTarget: connect.dropTarget(),
  })),
)(Note);

Note.propTypes = {
  laneId: PropTypes.string,
  note: PropTypes.object,
  children: PropTypes.any,
  connectDragSource: PropTypes.func,
  connectDropTarget: PropTypes.func,
  isDragging: PropTypes.bool,
};
