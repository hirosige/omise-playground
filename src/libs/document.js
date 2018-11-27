import 'dotenv/config';
import { client } from './omiseClient'

const getDocuments = async () => {
  return await client.disputes.documents(function(error, documents) {
    if (error) console.log(error)

    return documents
  });
}

export {
  getDocuments,
}