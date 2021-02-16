import { Router } from 'express';
import GetStatusService from '../services/GetStatusService';

const statusRoutes = Router();

statusRoutes.get('/', async (request, response) => {

  const getStatusService = new GetStatusService();

  const blacklist = await getStatusService.execute();

  const uptime = Math.floor(process.uptime());

  return response.json({
    uptime,
    count_blacklist: blacklist
  });
});

export default statusRoutes;
