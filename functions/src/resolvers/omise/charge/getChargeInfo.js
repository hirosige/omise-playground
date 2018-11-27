const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const retrivedCharge = await client.charges.retrieve(
    event.data.chargeId,
    (error, charge) => {
      if (error) {
        return { error: error }
      }

      return charge
    })

  if('error' in retrivedCharge) {
    return {
      error: retrivedCharge.error
    }
  }

  event.data = {
    ...retrivedCharge,
      authorizeUri: retrivedCharge.authorize_uri,
      failureCode: retrivedCharge.failure_code,
      failureMessage: retrivedCharge.failure_message,
      fundingAmount: retrivedCharge.funding_amount,
      fundingCurrency: retrivedCharge.funding_currency,
      paidAt: retrivedCharge.paid_at,
      returnUri: retrivedCharge.return_uri,
      expirationMonth: retrivedCharge.expiration_month,
  }

  return {
    data: event.data
  }
}