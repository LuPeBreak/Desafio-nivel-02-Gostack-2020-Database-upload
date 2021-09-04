// import AppError from '../errors/AppError';

import TransactionsRepository from '../repositories/TransactionsRepository';

import { getCustomRepository } from 'typeorm';

import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionRepository = getCustomRepository(TransactionsRepository);

    const transactions = transactionRepository.find();

    return transactions
  }
}

export default CreateTransactionService;
