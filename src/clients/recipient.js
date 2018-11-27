import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getRecipients,
  makeRecipient,
  deleteRecipient
} from '../libs/recipient'

const omiseTransaction = async () => {
  // await makeRecipient({
  //   name: 'HIROSHIGE NEGISHI',
  //   email: 'hirosige1@gmail.com',
  //   type: 'individual',
  //   bank_account: {
  //     brand: 'kbank',
  //     number: '7342325151',
  //     name: 'HIROSHIGE NEGISHI'
  //   }
  // })

  // const recipients = (await getRecipients()).data
  // console.log(recipients)

  // const atFirst = events[0]
  // console.log(await getEvent(atFirst.id))

  console.log(await deleteRecipient('recp_test_5e1e0lrrkv87csm2ry7'))
}

omiseTransaction()