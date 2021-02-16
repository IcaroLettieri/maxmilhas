import { getRepository } from 'typeorm';
import { cpf as cpfValidator } from 'cpf-cnpj-validator';

import AppError from '../errors/AppError';

import Blacklist from '../models/Blacklist';

interface Request {
  cpf: string;
}

class RemoveBlacklistService {
  public async execute({ cpf }: Request) {
    const blacklistsRepository = getRepository(Blacklist);

    if(!cpfValidator.isValid(cpf)){
      throw new AppError('CPF invalid.');
    }

    const checkCPFExists = await blacklistsRepository.findOne({
      where: { cpf },
    });

    if (!checkCPFExists) {
      throw new AppError('CPF not exists.', 404);
    }

    blacklistsRepository.delete({
      cpf
    });
  }
}

export default RemoveBlacklistService;
