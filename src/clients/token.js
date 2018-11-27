import 'dotenv/config';
import {
  getRealToken,
  getTokenInfo
} from '../libs/transaction'

const omiseTransaction = async () => {
  const tokenId = (await getRealToken()).id

  console.log(await getTokenInfo(tokenId))
}

omiseTransaction()