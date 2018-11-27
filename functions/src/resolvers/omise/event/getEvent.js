const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedEvent = await client.events.retrieve(
    event.data.eventId,
    (error, aEvent) => {
      if (error) {
        return { error: error }
      }

      return aEvent
    })

  if('error' in fetchedEvent) {
    return {
      error: fetchedEvent.error
    }
  }

  event.data = {
    ...fetchedEvent,
    closedAt: fetchedEvent.closed_at,
    reasonCode: fetchedEvent.reason_code,
    reasonMessage: fetchedEvent.reason_message,
  }

  return {
    data: event.data
  }
}