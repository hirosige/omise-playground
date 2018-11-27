import 'dotenv/config';
import {
  getTransfers,
  getTransfer
} from '../libs/transfer'

const omiseTransaction = async () => {
  const transfers = (await getTransfers()).data
  const transferId = transfers[0].id

  console.log(await getTransfer(transferId))
}

omiseTransaction()