const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const deletedTransfer = await client.transfers.destroy(
    event.data.transferId,
    (error, transfer) => {
      if (error) {
        return { error: error }
      }

      return transfer
    })

  if('error' in deletedTransfer) {
    return {
      error: deletedTransfer.error
    }
  }

  event.data = {
    ...deletedTransfer,
    bankAccount: deletedTransfer.bank_account,
    failFast: deletedTransfer.fail_fast,
    failureCode: deletedTransfer.failure_code,
    failureMessage: deletedTransfer.failure_message,
    paidAt: deletedTransfer.paid_at,
    sentAt: deletedTransfer.sent_at,
  }

  return {
    data: event.data
  }
}
