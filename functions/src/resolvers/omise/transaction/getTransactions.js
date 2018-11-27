const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedTransactions = await client.transactions.list(
    {
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, transactions) => {
      if (error) {
        return { error: error }
      }

      return transactions
    })

  if('error' in fetchedTransactions) {
    return {
      error: fetchedTransactions.error
    }
  }

  let transactions = []

  fetchedTransactions.data.forEach(transaction => {
    transactions.push({
      ...transaction,
    })
  })

  event.data = transactions

  return {
    data: event.data
  }
}