import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getEvents,
  getEvent
} from '../libs/event'

const omiseTransaction = async () => {
  const events = (await getEvents()).data
  console.log(`${events.length}個のイベントが発行されました`)

  const atFirst = events[0]
  console.log(await getEvent(atFirst.id))
}

omiseTransaction()