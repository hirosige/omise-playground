const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedCharge = await client.charges.update(
    event.data.chargeId,
    {
      description: event.data.description,
      metadata: event.data.metadata,
    },
    (error, charge) => {
      if (error) {
        return { error: error }
      }

      return charge
    })

  if('error' in updatedCharge) {
    return {
      error: updatedCharge.error
    }
  }

  event.data = {
    ...updatedCharge,
      authorizeUri: updatedCharge.authorize_uri,
      failureCode: updatedCharge.failure_code,
      failureMessage: updatedCharge.failure_message,
      fundingAmount: updatedCharge.funding_amount,
      fundingCurrency: updatedCharge.funding_currency,
      paidAt: updatedCharge.paid_at,
      returnUri: updatedCharge.return_uri,
      expirationMonth: updatedCharge.expiration_month,
  }

  return {
    data: event.data
  }
}