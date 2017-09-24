import Kanban from '../models/kanban';
import Lane from '../models/lane';
import uuid from 'uuid/v4';
import _ from 'lodash';

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
    Kanban.findOne({ id: req.params.kanbanId })
    .then(kanban => {
      kanban.lanes.push(saved._id);
      return kanban.save();
    })
    .then(() => {
      res.json({ saved, kanbanId: req.params.kanbanId });
    });
  });
}

export function getLanes(req, res) {
  Kanban.findOne({ id: req.params.kanbanId }).exec((err, kanban) => {
    if (err) res.status(500).send(err);
    Lane
      .find({ _id: { $in: kanban.lanes } })
      .exec((error, lanes) => {
        if (error) {
          res.status(500).send(error);
        }

        const returnLanes = [];
        if (kanban.lanes) {
          kanban.lanes.forEach(element => {
            returnLanes.push(_.filter(lanes, { _id: element })[0]);
          });
        }

        res.json({ lanes: returnLanes });
      });
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
