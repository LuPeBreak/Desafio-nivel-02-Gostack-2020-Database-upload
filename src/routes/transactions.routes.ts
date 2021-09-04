// dependencies
import { Router } from 'express';
import multer from 'multer';

// repositories
import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import DeleteTransactionService from '../services/DeleteTransactionService';
import ImportTransactionsService from '../services/ImportTransactionsService';

// configs
import uploadsConfig from '../configs/uploads';
import { getCustomRepository } from 'typeorm';

const transactionsRouter = Router();

// multer initialization with configs
const upload = multer(uploadsConfig);

transactionsRouter.get('/', async (request, response) => {
  const transactionRepository = getCustomRepository(TransactionsRepository);

  const transactions = await transactionRepository.find();

  const balance = await transactionRepository.getBalance();

  return response.json({ transactions, balance });
});

transactionsRouter.post('/', async (request, response) => {
  const { title, value, type, category } = request.body;

  const createTrasaction = new CreateTransactionService();

  const trasaction = createTrasaction.execute({ title, value, type, category });

  return response.json(trasaction);
});

transactionsRouter.delete('/:id', async (request, response) => {
  const { id } = request.params;

  const deleteTransaction = new DeleteTransactionService();

  await deleteTransaction.execute(id);

  return response.json({ message: 'Transaction Deleted' });
});

transactionsRouter.post(
  '/import',
  upload.single('csv'),
  async (request, response) => {
    const importCSV = new ImportTransactionsService();

    const newTransactionsImported = await importCSV.execute(
      request.file.filename,
    );

    return response.json(newTransactionsImported);
  },
);

export default transactionsRouter;
