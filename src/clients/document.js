import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getDocuments,
} from '../libs/document'

const omiseTransaction = async () => {
  console.log(await getDocuments())
}

omiseTransaction()