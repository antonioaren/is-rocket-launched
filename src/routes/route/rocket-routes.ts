import { Router } from 'express';
import rocketController from '../../features/rocket/controller/rocket.controller';

const rocketRoutes = Router();

rocketRoutes.get('/', (req, res) => rocketController.getRocketImage(req, res));
rocketRoutes.post('/', (req, res) => rocketController.getNextImage(req, res));

export default rocketRoutes;
