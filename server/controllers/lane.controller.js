import Lane from '../models/lane';
import uuid from 'uuid/v4';

export function addLane(req, res) {
  if (!req.body.name) {
    res.status(403).end();
  }
  const newLane = new Lane(req.body);
  newLane.notes = [];
  newLane.id = uuid();
  newLane.save((err, saved) => {
    if (err) res.status(500).send(err);
    res.json({ saved });
  });
}

export function getLanes(req, res) {
  Lane.find().exec((err, lanes) => {
    if (err) res.status(500).send(err);
    res.json({ lanes });
  });
}

export function deleteLane(req, res) {
  Lane.findOne({ id: req.params.laneId }).exec((err, lane) => {
    if (err) res.status(500).send(err);
    lane.remove((error) => {
      if (error) res.status(500).send(error);
      else {
        res.json({ lane });
      }
    });
  });
}

// export function deleteLane(req, res) {
//   Lane.findOneAndRemove({ id: req.params.laneId }).exec((err) => {
//     if (err) res.status(500).send(err);
//     else res.status(200).end();
//   });
// }

export function updateLaneName(req, res) {
  Lane.findOneAndUpdate({ id: req.params.laneId }, { name: req.body.name }, { new: true }).exec((err, lane) => {
    if (err) res.status(500).send(err);
    else res.json({ lane });
  });
}
