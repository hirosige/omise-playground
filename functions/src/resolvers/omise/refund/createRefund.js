const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const createdRefund = await client.charges.createRefund(
    event.data.chargeId,
    { amount: event.data.amount },
    (error, refund) => {
      if (error) {
        return { error: error }
      }

      return refund
    })

  if('error' in createdRefund) {
    return {
      error: createdRefund.error
    }
  }

  event.data = {
    ...createdRefund,
  }

  return {
    data: event.data
  }
}