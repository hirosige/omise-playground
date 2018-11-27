const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const createdRecipient = await client.recipients.create({
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

  if('error' in createdRecipient) {
    return {
      error: createdRecipient.error
    }
  }

  event.data = {
    ...createdRecipient,
    bankAccount: createdRecipient.bank_account,
    failureCode: createdRecipient.failure_code,
    taxId: createdRecipient.tax_id,
  }

  return {
    data: event.data
  }
}