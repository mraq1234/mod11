import { createSelector } from 'reselect';
import _ from 'lodash';

// const notesSelector = state => state.notes;
// const lanesSelector = state => state.lanes;
const kanbansSelector = (kanbans, id) => {
  return _.find(kanbans, kanban => kanban.id === id);
};

// export const getLanes = createSelector(
//   lanesSelector,
//   lanes => Object.values(lanes)
// );

// export const getNotes = createSelector(
//   notesSelector,
//   notes => Object.values(notes)
// );

export const getKanban = createSelector(
  kanbansSelector,
  kanban => {
    return kanban || {};
  },
);
