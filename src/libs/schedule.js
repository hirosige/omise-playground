import 'dotenv/config';
import { client } from './omiseClient'

const getSchedules = async () => {
  return await client.schedules.retrieve(function(error, schedules) {
    if (error) console.log(error)

    return schedules
  });
}

const getSchedule = async () => {
  return await client.schedules.retrieve(
    scheduleId,
    (error, schedule) => {
      if (error) console.log(error)

      return schedule
    });
}

const deleteSchedule = async scheduleId => {
  await client.schedules.destroy(
    scheduleId,
    function(error, schedule) {
      if (error) console.log(error)

      console.log('schedule is successfully deleted')
    });
}

export {
  getSchedules,
  getSchedule,
  deleteSchedule
}