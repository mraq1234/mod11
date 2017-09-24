import callApi from '../../util/apiCaller';
import { kanbansSchema } from '../../util/schema';
import { normalize } from 'normalizr';

export const CREATE_KANBANS = 'CREATE_KANBANS';
export const CREATE_KANBAN = 'CREATE_KANBAN';
export const UPDATE_KANBAN = 'UPDATE_KANBAN';
export const DELETE_KANBAN = 'DELETE_KANBAN';

export function createKanbans(kanbans) {
  return {
    type: CREATE_KANBANS,
    kanbans,
  };
}

export function fetchKanbans(idToken) {
  return (dispatch) => {
    return callApi('kanbans', 'get', undefined, idToken).then(res => {
      const normalized = normalize(res.kanbans, kanbansSchema);
      const { kanbans } = normalized.entities;
      dispatch(createKanbans(kanbans));
    });
  };
}

export function updateKanban(kanban) {
  return {
    type: UPDATE_KANBAN,
    kanban,
  };
}

export function updateKanbanServ(kanbanId, name) {
  return (dispatch) => {
    return callApi('kanbans', 'put', { kanbanId, name }).then(res => {
      dispatch(updateKanban(res.kanban));
    });
  };
}

export function createKanban(kanban) {
  return {
    type: CREATE_KANBAN,
    kanban,
  };
}

export function createKanbanServ(kanban, idToken) {
  return (dispatch) => {
    return callApi('kanbans', 'post', kanban, idToken).then(res => {
      dispatch(createKanban(res.saved));
      return res.saved.id;
    });
  };
}

export function deleteKanban(kanbanId) {
  return {
    type: DELETE_KANBAN,
    kanbanId,
  };
}

export function deleteKanbanServ(kanbanId) {
  return (dispatch) => {
    return callApi(`/kanbans/${kanbanId}`, 'delete').then(res => {
      dispatch(deleteKanban(res.kanban.id));
    });
  };
}
