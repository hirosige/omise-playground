const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const createdTransfer = await client.transfers.create(
    { amount: event.data.amount },
    (error, transfer) => {
      if (error) {
        return { error: error }
      }

      return transfer
    })

  if('error' in createdTransfer) {
    return {
      error: createdTransfer.error
    }
  }

  event.data = {
    ...createdTransfer,
    bankAccount: createdTransfer.bank_account,
    failFast: createdTransfer.fail_fast,
    failureCode: createdTransfer.failure_code,
    failureMessage: createdTransfer.failure_message,
    paidAt: createdTransfer.paid_at,
    sentAt: createdTransfer.sent_at,
  }

  return {
    data: event.data
  }
}
