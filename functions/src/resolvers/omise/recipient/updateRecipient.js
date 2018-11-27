const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedRecipient = await client.recipients.update(
    event.data.recipientId,
    {
      name: event.data.name,
      email: event.data.email,
      type: event.data.type,
      description: event.data.description,
      tax_id: event.data.taxId,
      bank_account: {
        brand: event.data.bankBrand,
        number: event.data.bankNumber,
        name: event.data.bankName,
      }
    },
    (error, recipient) => {
      if (error) {
        return { error: error }
      }

      return recipient
    })

  if('error' in updatedRecipient) {
    return {
      error: updatedRecipient.error
    }
  }

  event.data = {
    ...updatedRecipient,
    bankAccount: updatedRecipient.bank_account,
    failureCode: updatedRecipient.failure_code,
    taxId: updatedRecipient.tax_id,
  }

  return {
    data: event.data
  }
}