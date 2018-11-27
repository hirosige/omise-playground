const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const deletedRecipient = await client.recipients.destroy(
    event.data.recipientId,
    (error, recipient) => {
      if (error) {
        return { error: error }
      }

      return recipient
    })

  if('error' in deletedRecipient) {
    return {
      error: deletedRecipient.error
    }
  }

  event.data = {
    ...deletedRecipient,
    bankAccount: deletedRecipient.bank_account,
    failureCode: deletedRecipient.failure_code,
    taxId: deletedRecipient.tax_id,
  }

  return {
    data: event.data
  }
}