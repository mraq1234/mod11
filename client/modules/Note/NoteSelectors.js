import { createSelector } from 'reselect';

const notesSelector = state => {
  return state.notes;
};
const laneSelector = (state, props) => {
  return state.lanes[props.laneId];
};

export const getLaneNotes = createSelector(
  [laneSelector,
  notesSelector],
  (lane, selectedNotes) => {
    return lane ? lane.notes.map(noteId => selectedNotes[noteId]) : [];
  }
);
//
