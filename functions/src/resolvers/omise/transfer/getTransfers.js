const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedTransfers = await client.transfers.list(
    {
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, transfers) => {
      if (error) {
        return { error: error }
      }

      return transfers
    })

  if('error' in fetchedTransfers) {
    return {
      error: fetchedTransfers.error
    }
  }

  let transfers = []

  fetchedTransfers.data.forEach(transfer => {
    transfers.push({
      ...transfer,
      bankAccount: transfer.bank_account,
      failFast: transfer.fail_fast,
      failureCode: transfer.failure_code,
      failureMessage: transfer.failure_message,
      paidAt: transfer.paid_at,
      sentAt: transfer.sent_at,
    })
  })

  event.data = transfers

  return {
    data: event.data
  }
}