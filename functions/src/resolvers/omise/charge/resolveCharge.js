const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const resolvedCharge = await client.charges.capture(
    event.data.chargeId,
    (error, charge) => {
      if (error) {
        return { error: error }
      }

      return charge
    })

  if('error' in resolvedCharge) {
    return {
      error: resolvedCharge.error
    }
  }

  event.data = {
    ...resolvedCharge,
      authorizeUri: resolvedCharge.authorize_uri,
      failureCode: resolvedCharge.failure_code,
      failureMessage: resolvedCharge.failure_message,
      fundingAmount: resolvedCharge.funding_amount,
      fundingCurrency: resolvedCharge.funding_currency,
      paidAt: resolvedCharge.paid_at,
      returnUri: resolvedCharge.return_uri,
      expirationMonth: resolvedCharge.expiration_month,
  }

  return {
    data: event.data
  }
}