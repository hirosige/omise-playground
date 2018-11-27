const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedRecipient = await client.recipients.retrieve(
    event.data.recipientId,
    (error, recipient) => {
      if (error) {
        return { error: error }
      }

      return recipient
    })

  if('error' in fetchedRecipient) {
    return {
      error: fetchedRecipient.error
    }
  }

  event.data = {
    ...fetchedRecipient,
    bankAccount: fetchedRecipient.bank_account,
    failureCode: fetchedRecipient.failure_code,
    taxId: fetchedRecipient.tax_id,
  }

  return {
    data: event.data
  }
}