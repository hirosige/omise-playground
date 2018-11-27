import 'dotenv/config';
import { getRealToken } from '../libs/token'
import { makeCharge } from '../libs/charge'

const omiseTransaction = async () => {
  const cardToken = await getRealToken()

  await makeCharge({
    amount: '2000000',
    token: cardToken.id
  })
}

omiseTransaction()