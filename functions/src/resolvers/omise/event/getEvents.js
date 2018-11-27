const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedEvents = await client.events.list({
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, events) => {
      if (error) {
        return { error: error }
      }

      return events
    })

  if('error' in fetchedEvents) {
    return {
      error: fetchedEvents.error
    }
  }

  let events = []

  fetchedEvents.data.forEach(aEvent => {
    events.push({
      ...aEvent,
    })
  })

  event.data = events

  return {
    data: event.data
  }
}