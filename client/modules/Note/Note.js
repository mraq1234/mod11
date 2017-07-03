import React, { Component } from 'react';
import propTypes from 'prop-types';
import styles from './Note.css';
import Edit from '../../components/Edit';

class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const {
      connectDragSource,
      connectDropTarget,
      isDragging,
      note,
      laneId,
      updateNoteServ,
      deleteNoteServ,
    } = this.props;
    const dragSource = this.state.editing ? a => a : connectDragSource;
    return dragSource(
      connectDropTarget(
        <li
          style={{ opacity: isDragging ? 0 : 1 }}
          className={styles.Note}
        >
          <Edit
            editing={this.state.editing}
            value={note.task}
            onValueClick={() => this.setState({ editing: true })}
            onEdit={value => {
              updateNoteServ(note.id, value);
              this.setState({ editing: false });
            }}
            onDelete={() => deleteNoteServ(note.id, laneId)}
          />
        </li>
      )
    );
  }
}

Note.propTypes = {
  laneId: propTypes.string,
  note: propTypes.object,
  children: propTypes.any,
  connectDragSource: propTypes.func,
  connectDropTarget: propTypes.func,
  updateNoteServ: propTypes.func,
  deleteNoteServ: propTypes.func,
  isDragging: propTypes.bool,
};

export default Note;
