const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const createdCharge = await client.charges.create({
      amount: event.data.amount,
      currency: event.data.currency,
      card: event.data.cardToken,
      description: event.data.description,
      metadata: event.data.metadata,
      capture: event.data.capture,
    },
    (error, charge) => {
      if (error) {
        return { error: error }
      }

      return charge
    })

  if('error' in createdCharge) {
    return {
      error: createdCharge.error
    }
  }

  event.data = {
    ...createdCharge,
      authorizeUri: createdCharge.authorize_uri,
      failureCode: createdCharge.failure_code,
      failureMessage: createdCharge.failure_message,
      fundingAmount: createdCharge.funding_amount,
      fundingCurrency: createdCharge.funding_currency,
      paidAt: createdCharge.paid_at,
      returnUri: createdCharge.return_uri,
      expirationMonth: createdCharge.expiration_month,
  }

  return {
    data: event.data
  }
}