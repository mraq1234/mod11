import callApi from '../../util/apiCaller';
import { lanesSchema } from '../../util/schema';
import { normalize } from 'normalizr';
import { createNotes } from '../Note/NoteActions';

// Export Constants
export const CREATE_LANE = 'CREATE_LANE';
export const CREATE_LANES = 'CREATE_LANES';
export const UPDATE_LANE = 'UPDATE_LANE';
export const DELETE_LANE = 'DELETE_LANE';

export function createLanes(lanes) {
  return {
    type: CREATE_LANES,
    lanes,
  };
}

export function fetchLanes() {
  return (dispatch) => {
    return callApi('lanes', 'get').then(res => {
      const normalized = normalize(res.lanes, lanesSchema);
      const { lanes, notes } = normalized.entities;
      dispatch(createLanes(lanes));
      dispatch(createNotes(notes));
    });
  };
}

export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane,
  };
}

export function createLaneServ(lane) {
  return (dispatch) => {
    return callApi('lanes', 'post', lane).then(res => {
      dispatch(createLane(res.saved));
    });
  };
}

export function updateLane(lane) {
  return {
    type: UPDATE_LANE,
    lane,
  };
}

export function deleteLane(id) {
  return {
    type: DELETE_LANE,
    id,
  };
}

export function deleteLaneServ(id) {
  return (dispatch) => {
    return callApi(`lanes/${id}`, 'delete').then(() => {
      dispatch(deleteLane(id));
    });
  };
}
