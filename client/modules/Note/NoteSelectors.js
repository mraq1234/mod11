import { createSelector } from 'reselect';

const notesSelector = state => state.notes;
const laneSelector = (state, props) => state.lanes[props.laneId];

export const getLaneNotes = createSelector(
  laneSelector,
  notesSelector,
  (lane, notes) => lane.notes.map(noteId => notes[noteId])
);

