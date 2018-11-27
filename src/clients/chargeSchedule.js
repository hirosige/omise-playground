import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getScheduledCharges
} from '../libs/chargeSchedule'

const omiseTransaction = async () => {
  console.log(await getScheduledCharges())
}

omiseTransaction()