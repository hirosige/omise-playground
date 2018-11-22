import 'dotenv/config';
import { client } from './libs/omiseClient'
import { getRealToken } from './libs/token'

const omiseTransaction = async () => {
  const cardToken = await getRealToken()

  client.charges.create({
    'amount': '2000000',
    'currency': 'thb',
    'card': `${cardToken.id}`
  }, function(error, charge) {
    if (error) console.log(error)

    console.log(charge)
  });
}

omiseTransaction()