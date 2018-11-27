import 'dotenv/config';
import { client } from './omiseClient'

const getAccountInfo = async () => {
  return client.account.retrieve(function(error, account) {
    if (error) console.log(error)

    return account
  });
}

export { getAccountInfo }