import 'dotenv/config';
import { client } from './omiseClient'

const getTransactions = async () => {
  return await client.transactions.list(function(error, transactions) {
    if (error) console.log(error)

    return transactions
  });
}

const getTransaction = async transactionId => {
  return await client.transactions.retrieve(transactionId, function(error, transaction) {
    if (error) console.log(error)

    return transaction
  });
}

export {
  getTransactions,
  getTransaction
}