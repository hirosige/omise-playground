const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const deletedSchedule = await client.schedules.destroy(
    event.data.scheduleId,
    (error, schedule) => {
      if (error) {
        return { error: error }
      }

      return schedule
    })

  if('error' in deletedSchedule) {
    return {
      error: deletedSchedule.error
    }
  }

  event.data = {
    ...deletedSchedule,
    inWords: deletedSchedule.in_words,
    startDate: deletedSchedule.start_date,
    endDate: deletedSchedule.end_date,
    nextOccurrenceDates: deletedSchedule.next_occurrence_dates,
  }

  return {
    data: event.data
  }
}