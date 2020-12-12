import { Router } from 'express';
import rocketRoutes from './route/rocket-routes';

const apiRoutes = Router();

apiRoutes.use('/rocket', rocketRoutes);

export default apiRoutes;
