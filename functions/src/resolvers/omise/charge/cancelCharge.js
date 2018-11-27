const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const canceledCharge = await client.charges.reverse(
    event.data.chargeId,
    (error, charge) => {
      if (error) {
        return { error: error }
      }

      return charge
    })

  if('error' in canceledCharge) {
    return {
      error: canceledCharge.error
    }
  }

  event.data = {
    ...canceledCharge,
      authorizeUri: canceledCharge.authorize_uri,
      failureCode: canceledCharge.failure_code,
      failureMessage: canceledCharge.failure_message,
      fundingAmount: canceledCharge.funding_amount,
      fundingCurrency: canceledCharge.funding_currency,
      paidAt: canceledCharge.paid_at,
      returnUri: canceledCharge.return_uri,
      expirationMonth: canceledCharge.expiration_month,
  }

  return {
    data: event.data
  }
}