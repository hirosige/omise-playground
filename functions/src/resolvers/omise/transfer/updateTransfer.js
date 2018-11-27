const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedTransfer = await client.transfers.update(
    event.data.transferId,
    { amount: event.data.amount },
    (error, transfer) => {
      if (error) {
        return { error: error }
      }

      return transfer
    })

  if('error' in updatedTransfer) {
    return {
      error: updatedTransfer.error
    }
  }

  event.data = {
    ...updatedTransfer,
    bankAccount: updatedTransfer.bank_account,
    failFast: updatedTransfer.fail_fast,
    failureCode: updatedTransfer.failure_code,
    failureMessage: updatedTransfer.failure_message,
    paidAt: updatedTransfer.paid_at,
    sentAt: updatedTransfer.sent_at,
  }

  return {
    data: event.data
  }
}
