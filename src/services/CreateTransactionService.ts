import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
    // TODO
    if (
      type === 'outcome' &&
      value > this.transactionsRepository.getBalance().total
    ) {
      throw Error('Saldo insuficiente');
    }
    const transaction = this.transactionsRepository.create(title, value, type);
    return transaction;
  }
}

export default CreateTransactionService;
