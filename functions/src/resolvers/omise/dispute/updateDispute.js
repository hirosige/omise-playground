const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedDispute = await client.disputes.update(
    event.data.disputeId,
    { message: event.data.message },
    (error, dispute) => {
      if (error) {
        return { error: error }
      }

      return dispute
    })

  if('error' in updatedDispute) {
    return {
      error: updatedDispute.error
    }
  }

  event.data = {
    ...updatedDispute,
    closedAt: updatedDispute.closed_at,
    reasonCode: updatedDispute.reason_code,
    reasonMessage: updatedDispute.reason_message,
  }

  return {
    data: event.data
  }
}