const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const retrievedRefund = await client.charges.retrieveRefund(
    event.data.chargeId,
    event.data.refundId,
    (error, refund) => {
      if (error) {
        return { error: error }
      }

      return refund
    })

  if('error' in retrievedRefund) {
    return {
      error: retrievedRefund.error
    }
  }

  event.data = {
    ...retrievedRefund,
  }

  return {
    data: event.data
  }
}