import { Router } from 'express';

import CreateBlacklistService from '../services/CreateBlacklistService';
import RemoveBlacklistService from '../services/RemoveBlacklistService';
import FindBlacklistService from '../services/FindBlacklistService';

const blacklistsRoutes = Router();

blacklistsRoutes.post('/', async (request, response) => {
  const { cpf } = request.body;

  const createBlacklist = new CreateBlacklistService();

  const blacklist = await createBlacklist.execute({
    cpf
  });

  return response.json(blacklist);
});

blacklistsRoutes.delete('/:cpf', async (request, response) => {
  const { cpf } = request.params;

  const removeBlacklist = new RemoveBlacklistService();

  await removeBlacklist.execute({
    cpf
  });

  return response.status(200).send();
});

blacklistsRoutes.get('/:cpf', async (request, response) => {
  const { cpf } = request.params;

  const findBlacklist = new FindBlacklistService();

  const blacklist = await findBlacklist.execute({
    cpf
  });

  return response.json({ status: blacklist });
});

export default blacklistsRoutes;
