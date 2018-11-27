import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getSchedules,
  getSchedule,
  deleteSchedule
} from '../libs/schedule'

const omiseTransaction = async () => {
  const schedules = (await getSchedules()).data
  console.log(schedules)
  const atOne = schedules[0]

  console.log(atOne.id)

  console.log(await getSchedule(atOne.id))

  await deleteSchedule(atOne.id)
}

omiseTransaction()