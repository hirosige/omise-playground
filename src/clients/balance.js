import 'dotenv/config';
import { getBalance } from '../libs/balance'

const omiseTransaction = async () => {
  console.log(await getBalance())
}

omiseTransaction()