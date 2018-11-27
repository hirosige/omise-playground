const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedSchedules = await client.schedules.retrieve(
    (error, schedules) => {
      if (error) {
        return { error: error }
      }

      return schedules
    })

  if('error' in fetchedSchedules) {
    return {
      error: fetchedSchedules.error
    }
  }

  let schedules = []

  fetchedSchedules.data.forEach(schedule => {
    schedules.push({
      ...schedule,
      inWords: schedule.in_words,
      startDate: schedule.start_date,
      endDate: schedule.end_date,
      nextOccurrenceDates: schedule.next_occurrence_dates,
    })
  })

  event.data = schedules

  return {
    data: event.data
  }
}