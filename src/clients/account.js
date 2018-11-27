import 'dotenv/config';
import { getAccountInfo } from '../libs/account'

const omiseTransaction = async () => {
  console.log(await getAccountInfo())
}

omiseTransaction()