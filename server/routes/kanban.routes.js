import { Router } from 'express';
import * as KanbanController from '../controllers/kanban.controller';
import laneRouter from './lane.routes';

const router = new Router();

router.use('/kanbans/:kanbanId/', laneRouter);

router.route('/kanbans').get(KanbanController.getKanbans);
router.route('/kanbans').post(KanbanController.addKanban);
router.route('/kanbans/:kanbanId').delete(KanbanController.deleteKanban);
router.route('/kanbans/:kanbanId').put(KanbanController.updateKanbanLanes);
router.route('/kanbans').put(KanbanController.updateKanbanName);

export default router;
