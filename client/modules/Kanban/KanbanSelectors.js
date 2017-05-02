import { createSelector } from 'reselect';

const notesSelector = state => state.notes;
const lanesSelector = state => state.lanes;

export const getLanes = createSelector(
  lanesSelector,
  lanes => Object.values(lanes)
);

export const getNotes = createSelector(
  notesSelector,
  notes => Object.values(notes)
);

