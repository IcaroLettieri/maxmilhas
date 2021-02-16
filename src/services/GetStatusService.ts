import { getRepository } from 'typeorm';

import Blacklist from '../models/Blacklist';

class GetStatusService {
  public async execute() {
    const blacklistsRepository = getRepository(Blacklist);

    const [_, blacklistCount] = await blacklistsRepository.findAndCount();

    return blacklistCount;
  }
}

export default GetStatusService;
