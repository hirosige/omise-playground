import 'dotenv/config';
import { client } from './omiseClient'

const getEvents = async () => {
  return await client.events.list(function(error, events) {
    if (error) console.log(error)

    return events
  });
}

const getEvent = async eventId => {
  return await client.events.retrieve(eventId, function(error, event) {
    if (error) console.log(error)

    return event
  });
}

export {
  getEvents,
  getEvent,
}