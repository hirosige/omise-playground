const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedRefunds = await client.charges.listRefunds(
    event.data.chargeId,
    {
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, refunds) => {
      if (error) {
        return { error: error }
      }

      return refunds
    })

  if('error' in fetchedRefunds) {
    return {
      error: fetchedRefunds.error
    }
  }

  let refunds = []

  fetchedRefunds.data.forEach(refund => {
    refunds.push({
      ...refund,
    })
  })

  event.data = refunds

  return {
    data: event.data
  }
}