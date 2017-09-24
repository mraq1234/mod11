import mongoose from 'mongoose';
import Lane from '../models/lane';

const Schema = mongoose.Schema;

const kanbanSchema = new Schema({
  name: {
    type: 'String',
    required: true,
  },
  lanes: [{
    type: Schema.ObjectId,
    ref: 'Lane',
    required: true,
  }],
  id: {
    type: 'String',
    required: true,
    unique: true,
  },
  userId: {
    type: 'String',
    required: true,
  },
});

kanbanSchema.pre('remove', function (next) {  // eslint-disable-line
  const idsArray = this.lanes;
  const removeKanbanLanesPromise = new Promise((resolve, reject) => {
    Lane.remove({ _id: { $in: idsArray } }, (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
      return;
    });
  });

  removeKanbanLanesPromise
    .then(() => next())
    .catch((err) => next(err));
});

export default mongoose.model('Kanban', kanbanSchema);
