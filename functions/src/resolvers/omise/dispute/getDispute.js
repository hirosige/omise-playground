const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedDispute = await client.disputes.retrieve(
    event.data.disputeId,
    (error, dispute) => {
      if (error) {
        return { error: error }
      }

      return dispute
    })

  if('error' in fetchedDispute) {
    return {
      error: fetchedDispute.error
    }
  }

  event.data = {
    ...fetchedDispute,
    closedAt: fetchedDispute.closed_at,
    reasonCode: fetchedDispute.reason_code,
    reasonMessage: fetchedDispute.reason_message,
  }

  return {
    data: event.data
  }
}