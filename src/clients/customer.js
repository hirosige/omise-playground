import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getCustomers,
  getCustomer,
  makeCustomer,
  updateCustomer,
  addCreditToCustomer,
  deleteCustomer
} from '../libs/customer'

const omiseTransaction = async () => {
  await makeCustomer({
    description: "Hiroshige Negishi",
    email: "hirosige1@gmail.com"
  })

  const customers = (await getCustomers()).data
  console.log(`${customers.length}名の顧客が登録されています`)

  const atOne = customers[0]
  console.log(await getCustomer(atOne.id))

  await updateCustomer({
    id: atOne.id,
    description: "test",
    email: "updated@gmail.com"
  })

  const atSecond = customers[1]
  const atSecondCard = (await getRealToken()).id
  console.log(atSecondCard)

  await addCreditToCustomer({
    id: atSecond.id,
    token: atSecondCard,
  })

  const atThird = customers[2]
  await deleteCustomer(atThird.id)
}

omiseTransaction()