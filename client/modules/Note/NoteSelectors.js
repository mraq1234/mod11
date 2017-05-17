import { createSelector } from 'reselect';

const notesSelector = state => state.notes;
const laneSelector = (state, props) => state.lanes[props.laneId];

export const getLaneNotes = createSelector(
  [laneSelector,
  notesSelector],
  (lane, selectedNotes) => {
    return lane ? lane.notes.map(noteId => selectedNotes[noteId]) : [];
  }
);

