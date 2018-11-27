import 'dotenv/config';
import {
  getTransactions,
  getTransaction
} from '../libs/transaction'

const omiseTransaction = async () => {
  const transactions = (await getTransactions()).data
  const transactionId = transactions[0].id

  console.log(await getTransaction(transactionId))
}

omiseTransaction()