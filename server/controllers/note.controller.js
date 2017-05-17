import Note from '../models/note';
import Lane from '../models/lane';
import uuid from 'uuid/v4';

export function addNote(req, res) {
  if (!req.body.task) {
    res.status(403).end();
  }
  const newNote = new Note(req.body);
  newNote.id = uuid();
  newNote.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes.push(saved);
        return lane.save();
      })
      .then(() => {
        res.json({ saved, laneId: req.params.laneId });
      });
  });
}

export function updateNoteTask(req, res) {
  Note.findOneAndUpdate(
    { id: req.params.noteId },
    { task: req.body.task },
    { new: true })
    .exec((err, note) => {
      if (err) res.status(500).send(err);
      else res.json({ note });
    });
}

export function deleteNote(req, res) {
  Note.findOneAndRemove({ id: req.params.noteId }, req).exec((err, note) => {
    if (err) res.status(500).send(err);
    Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes = lane.notes.filter((noteId) => { // eslint-disable-line
          if (noteId.toString() !== note._id.toString()) return noteId;
        });
        lane.save((errLane, saved) => {
          if (errLane) res.status(500).send(errLane);
          res.json({ saved });
        });
      });
  });
}
