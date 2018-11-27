import 'dotenv/config';
import { client } from './omiseClient'

const getCharges = async () => {
  return await client.charges.list(function(error, charges) {
    if (error) console.log(error)

    return charges
  });
}

const makeCharge = async ({
  token,
  amount,
}) => {
  return await client.charges.create({
    'amount': amount,
    'currency': 'thb',
    'card': token
  }, function(error, charge) {
    if (error) console.log(error)

    // console.log(charge)
    console.log("A charge is successfully made")
  })
}

export {
  makeCharge,
  getCharges
}