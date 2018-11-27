const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedCharges = await client.charges.list({
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, charges) => {
      if (error) {
        return { error: error }
      }

      return charges
    })

  if('error' in fetchedCharges) {
    return {
      error: fetchedCharges.error
    }
  }

  let charges = []

  fetchedCharges.data.forEach(charge => {
    charges.push({
      ...charge,
      authorizeUri: charge.authorize_uri,
      failureCode: charge.failure_code,
      failureMessage: charge.failure_message,
      fundingAmount: charge.funding_amount,
      fundingCurrency: charge.funding_currency,
      paidAt: charge.paid_at,
      returnUri: charge.return_uri,
      expirationMonth: charge.expiration_month,
    })
  })

  event.data = charges

  return {
    data: event.data
  }
}