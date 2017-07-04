import React, { Component } from 'react';
import propTypes from 'prop-types';
import NoteList from '../Note/NoteListContainer';
import Edit from '../../components/Edit';
import styles from './Lane.css';
import dragIcon from './drag.png';
import _ from 'lodash';

class Lane extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
    };
  }

  render() {
    const {
      connectDragSource,
      isDragging,
      deleteLaneServ,
      addNoteServ,
      updateLaneServ,
      lane,
      ...props,
    } = this.props;

    const dragSource = this.state.editing ? a => a : connectDragSource;
    const composedDndElement = _.flowRight([
      props.connectDragPreview,
      props.connectDropTargetLane,
      props.connectDropTargetNote,
    ]);
    const laneId = lane.id;

    return composedDndElement(
      <div
        style={{
          opacity: isDragging ? 0 : 1,
        }}
        className={styles.lane}
      >
        <div className={styles.LaneHeader}>
          {dragSource(
            <div
              style={{
                background: `#b0b0b0 url(${dragIcon}) center`,
              }}
              className={styles.LaneHandler}
            />
          )}
          <Edit
            className={styles.LaneName}
            editing={this.state.editing}
            value={lane.name}
            onValueClick={() => this.setState({ editing: true })}
            onEdit={value => {
              updateLaneServ({ ...lane, name: value });
              this.setState({ editing: false });
            }}
          />
          <div className={styles.LaneDelete}>
            <button onClick={() => deleteLaneServ(lane.id)}>
              x
            </button>
          </div>
        </div>
        <NoteList laneId={lane.id} />
        <div className={styles.LaneAddNote}>
          <button onClick={() => addNoteServ(laneId)}>
            ADD TASK
          </button>
        </div>
      </div>
    );
  }
}

Lane.propTypes = {
  lane: propTypes.object,
  laneNotes: propTypes.array,
  deleteLaneServ: propTypes.func,
  updateLane: propTypes.func,
  addNoteServ: propTypes.func,
  updateLaneServ: propTypes.func,
  connectDragSource: propTypes.func,
  connectDropTargetNote: propTypes.func,
  connectDropTargetLane: propTypes.func,
  isDragging: propTypes.bool,
  connectDragPreview: propTypes.func,
};

export default Lane;
