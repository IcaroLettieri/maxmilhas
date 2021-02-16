import { Router } from 'express';

import blacklistsRouter from './blacklists.routes';
import statusRouter from './status.routes';

const routes = Router();

routes.use('/blacklists', blacklistsRouter);
routes.use('/status', statusRouter);

export default routes;
