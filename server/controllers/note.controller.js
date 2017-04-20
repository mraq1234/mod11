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
        res.json(saved);
      });
  });
}

export function updateNoteTask(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err) res.status(500).send(err);
    note.task = req.body.task; // eslint-disable-line
    note.save((error, saved) => {
      if (error) res.status(500).send(error);
      res.json({ note: saved });
    });
  });
}

export function deleteNote(req, res) {
  Note.findOne({ id: req.params.noteId }).exec((err, note) => {
    if (err || !note) {
      res.status(500).send(err || "ERROR: Can't find note!");
      return;
    }
    note.remove((error, deleted) => {
      if (error) res.status(500).send(error);
      Lane.findOne({ id: req.params.laneId })
      .then(lane => {
        lane.notes = lane.notes.filter((noteId) => { // eslint-disable-line
          if (noteId.toString() !== deleted._id.toString()) {
            return noteId;
          }
        });
        return lane.save();
      })
      .then(() => res.json(note))
      .catch((removeErr) => res.status(500).send(removeErr));
    });
  });
}

