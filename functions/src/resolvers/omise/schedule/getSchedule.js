const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const retrievedSchedule = await client.schedules.retrieve(
    event.data.scheduleId,
    (error, schedule) => {
      if (error) {
        return { error: error }
      }

      return schedule
    })

  if('error' in retrievedSchedule) {
    return {
      error: retrievedSchedule.error
    }
  }

  event.data = {
    ...retrievedSchedule,
    inWords: retrievedSchedule.in_words,
    startDate: retrievedSchedule.start_date,
    endDate: retrievedSchedule.end_date,
    nextOccurrenceDates: retrievedSchedule.next_occurrence_dates,
  }

  return {
    data: event.data
  }
}