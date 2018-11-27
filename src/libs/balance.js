import 'dotenv/config';
import { client } from './omiseClient'

const getBalance = async () => {
  return client.balance.retrieve(function(error, balance) {
    if (error) console.log(error)

    return balance
  });
}

export { getBalance }