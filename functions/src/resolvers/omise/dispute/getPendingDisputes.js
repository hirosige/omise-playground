const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedPendingDisputes = await client.disputes.listPending({
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, disputes) => {
      if (error) {
        return { error: error }
      }

      return disputes
    })

  if('error' in fetchedPendingDisputes) {
    return {
      error: fetchedPendingDisputes.error
    }
  }

  let disputes = []

  fetchedPendingDisputes.data.forEach(dispute => {
    disputes.push({
      ...dispute,
      closedAt: dispute.closed_at,
      reasonCode: dispute.reason_code,
      reasonMessage: dispute.reason_message,
    })
  })

  event.data = disputes

  return {
    data: event.data
  }
}