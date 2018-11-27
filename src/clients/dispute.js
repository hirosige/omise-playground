import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getDisputes,
  getOpenDisputes,
  getPendingDisputes,
  getClosedDisputes
} from '../libs/dispute'

const omiseTransaction = async () => {
  console.log(await getDisputes())
  console.log(await getOpenDisputes())
  console.log(await getPendingDisputes())
  console.log(await getClosedDisputes())
}

omiseTransaction()