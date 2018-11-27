import 'dotenv/config';
import { getRealToken } from './libs/token'
import { makeCharge } from './libs/charge'
import { getAccountInfo } from './libs/account'
import { getBalance } from './libs/balance'
import {
  getCustomers,
  makeCustomer
} from './libs/customer'

const omiseTransaction = async () => {
  console.log(await getAccountInfo())
  console.log(await getBalance())

  await makeCustomer({
    description: "Hiroshige Negishi",
    email: "hirosige1@gmail.com"
  })

  console.log(await getCustomers())

  const cardToken = await getRealToken()

  await makeCharge({
    amount: '2000000',
    token: cardToken.id
  })
}

omiseTransaction()