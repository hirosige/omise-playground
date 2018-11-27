const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const retrievedTransfer = await client.transfers.retrieve(
    event.data.transferId,
    (error, transfer) => {
      if (error) {
        return { error: error }
      }

      return transfer
    })

  if('error' in retrievedTransfer) {
    return {
      error: retrievedTransfer.error
    }
  }

  event.data = {
    ...retrievedTransfer,
    bankAccount: retrievedTransfer.bank_account,
    failFast: retrievedTransfer.fail_fast,
    failureCode: retrievedTransfer.failure_code,
    failureMessage: retrievedTransfer.failure_message,
    paidAt: retrievedTransfer.paid_at,
    sentAt: retrievedTransfer.sent_at,
  }

  return {
    data: event.data
  }
}
