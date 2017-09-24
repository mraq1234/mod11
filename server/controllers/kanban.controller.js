import Kanban from '../models/kanban';
import uuid from 'uuid/v4';
import jwtDecode from 'jwt-decode';

function getUserId(req) {
  const token = req.headers.authorization.split(' ')[1].trim();
  return jwtDecode(token).sub;
}

export function addKanban(req, res) {
  const newKanban = new Kanban(req.body);
  newKanban.lanes = [];
  newKanban.id = uuid();
  newKanban.userId = getUserId(req);
  newKanban.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({
      saved,
    });
  });
}

export function getKanbans(req, res) {
  Kanban.find({ userId: getUserId(req) }).exec((err, kanbans) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ kanbans });
  });
}

export function deleteKanban(req, res) {
  Kanban
    .findOne({ id: req.params.kanbanId })
    .exec((err, kanban) => {
      if (err) {
        res.status(500).send(err);
      }
      kanban.remove((error) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.json({ kanban });
        }
      });
    });
}

export function updateKanbanName(req, res) {
  Kanban
    .findOneAndUpdate({ id: req.body.kanbanId }, { name: req.body.name }, { new: true }).exec((err, kanban) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ kanban });
      }
    });
}

export function updateKanbanLanes(req, res) {
  Kanban
    .findOneAndUpdate({ id: req.params.kanbanId }, { lanes: req.body.lanes }).exec((err, kanban) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.json({ kanban });
      }
    });
}
