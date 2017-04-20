import mongoose from 'mongoose';
import Note from '../models/note';

const Schema = mongoose.Schema;

const laneSchema = new Schema({
  name: {
    type: 'String',
    required: true,
  },
  notes: [{
    type: Schema.ObjectId,
    ref: 'Note',
    required: true,
  }],
  id: {
    type: 'String',
    required: true,
    unique: true,
  },
});

laneSchema.pre('find', function (next) {
  this.populate('notes');
  next();
});

laneSchema.pre('remove', function (next) {
  const idsArray = this.notes;

  const removeLineNotesPromise = new Promise((resolve, reject) => {
    Note.remove({ _id: { $in: idsArray } }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
      return;
    });
  });

  removeLineNotesPromise
    .then(() => next())
    .catch((err) => next(err));
});

export default mongoose.model('Lane', laneSchema);
