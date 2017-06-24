import Lane from '../models/lane';
import uuid from 'uuid/v4';

export function addLane(req, res) {
  if (!req.body.name) {
    res
      .status(403)
      .end();
  }
  const newLane = new Lane(req.body);
  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ saved });
  });
}

export function getLanes(req, res) {
  Lane
    .find()
    .exec((err, lanes) => {
      if (err) {
        res.status(500).send(err);
      }
      res.json({ lanes });
    });
}

export function deleteLane(req, res) {
  Lane
    .findOne({ id: req.params.laneId })
    .exec((err, lane) => {
      if (err) {
        res.status(500).send(err);
      }
      lane.remove((error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json({ lane });
        }
      });
    });
}

export function updateLaneName(req, res) {
  Lane.findOneAndUpdate({
    id: req.params.laneId,
  }, {
    name: req.body.name,
  }, { new: true }).exec((err, lane) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.json({ lane });
    }
  });
}

export function updateLaneNotes(req, res) {
  const sourceLaneId = req.body.sourceLaneId;
  const targetLaneId = req.body.targetLaneId;
  const sourceLaneNotes = req.body.sourceLaneNotes;
  const targetLaneNotes = req.body.targetLaneNotes;

  Lane.findOneAndUpdate({ id: sourceLaneId }, { notes: sourceLaneNotes }, { new: true }).exec((err) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
  })
  .then((srcLane) => {
    Lane.findOneAndUpdate({ id: targetLaneId }, { notes: targetLaneNotes }, { new: true }).exec((err, targetLane) => {
      if (!err) {
        res.json({ srcLane, targetLane });
      } else {
        res.status(500).send(err);
        return;
      }
    });
  })
  .catch((error) => { res.status(500).send(error); });
}

