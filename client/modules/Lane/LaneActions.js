import callApi from '../../util/apiCaller';
import { lanesSchema } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';
export const MOVE_LANE = 'MOVE_LANE';
export const RECYCLE_STATE = 'RECYCLE_STATE';
export const MOVED_LANE_TO_DB = 'MOVED_LANE_TO_DB';

export function createLanes(lanes) {
  return {
    type: CREATE_LANES,
    lanes,
  };
}

export function recycleState() {
  return {
    type: RECYCLE_STATE,
  };
}

export function fetchLanes(kanbanId, idToken) {
  return (dispatch) => {
    return callApi(`kanbans/${kanbanId}/lanes`, 'get', undefined, idToken).then(res => {
      const normalized = normalize(res.lanes, lanesSchema);
      const { lanes, notes } = normalized.entities;
      dispatch(recycleState());
      dispatch(createNotes(notes));
      dispatch(createLanes(lanes));
    });
  };
}

export function createLane(lane, kanbanId) {
  return {
    type: CREATE_LANE,
    lane,
    kanbanId,
  };
}

export function createLaneServ(lane, kanbanId, idToken) {
  return (dispatch) => {
    return callApi(`kanbans/${kanbanId}/lanes`, 'post', lane, idToken).then(res => {
      dispatch(createLane(res.saved, res.kanbanId));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function updateLaneServ(lane) {
  return (dispatch) => {
    return callApi(`/lanes/${lane.id}`, 'put', { name: lane.name }).then(() => {
      return dispatch(updateLane(lane));
    });
  };
}

export function deleteLane(id, notesId) {
  return {
    type: DELETE_LANE,
    id,
    notesId,
  };
}

export function deleteLaneServ(id) {
  return (dispatch) => {
    return callApi(`lanes/${id}`, 'delete').then((res) => {
      dispatch(deleteLane(id, res.lane.notes));
    });
  };
}

export function moveLane(sourceLaneId, targetLaneId) {
  return {
    type: MOVE_LANE, sourceLaneId, targetLaneId,
  };
}

export function moveLaneServ(kanbanId, lanes) {
  return (dispatch) => {
    return callApi(`/kanbans/${kanbanId}`, 'put', { lanes }).then(() => {
      return dispatch({
        type: MOVED_LANE_TO_DB,
      });
    });
  };
}

