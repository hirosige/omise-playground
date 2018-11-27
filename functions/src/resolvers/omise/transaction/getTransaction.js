const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const retrievedTransaction = await client.transactions.retrieve(
    event.data.transactionId,
    (error, transaction) => {
      if (error) {
        return { error: error }
      }

      return transaction
    })

  if('error' in retrievedTransaction) {
    return {
      error: retrievedTransaction.error
    }
  }

  event.data = {
    ...retrievedTransaction,
  }

  return {
    data: event.data
  }
}
