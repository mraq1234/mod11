import { schema } from 'normalizr';

const note = new schema.Entity('notes');

const lane = new schema.Entity('lanes', {
  notes: [note],
});

const kanban = new schema.Entity('kanbans');

export const lanesSchema = [lane];
export const kanbansSchema = [kanban];
