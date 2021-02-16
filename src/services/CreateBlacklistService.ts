import { getRepository } from 'typeorm';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

import AppError from '../errors/AppError';

import Blacklist from '../models/Blacklist';

interface Request {
  cpf: string;
}

class CreateBlacklistService {
  public async execute({ cpf }: Request): Promise<Blacklist> {
    const blacklistsRepository = getRepository(Blacklist);

    if(!cpfValidator.isValid(cpf)){
      throw new AppError('CPF invalid.');
    }

    const checkCPFExists = await blacklistsRepository.findOne({
      where: { cpf },
    });

    if (checkCPFExists) {
      throw new AppError('CPF alred used.');
    }

    const blacklist = blacklistsRepository.create({
      cpf
    });

    await blacklistsRepository.save(blacklist);

    return blacklist;
  }
}

export default CreateBlacklistService;
