import 'dotenv/config';
import { client } from './omiseClient'

const getToken = async (cardInfo) => {
  return await client.tokens.create(cardInfo, function(error, token) {
    if (error) console.log(error)

    return token
  });
}

const getRealToken = async () => {
  return await getToken({
    card:{
      name: process.env.CREDIT_CARD_NAME,
      city: process.env.CREDIT_CARD_CITY,
      postal_code: process.env.CREDIT_CARD_POSTAL_CODE,
      number: process.env.CREDIT_CARD_NUMBER,
      expiration_month: process.env.CREDIT_CARD_EXPIRATION_MONTH,
      expiration_year: process.env.CREDIT_CARD_EXPIRATION_YEAR,
      security_code: process.env.CREDIT_CARD_SECURITY_CODE
    }
  })
}

const getTokenInfo = async tokenId => {
  return await client.tokens.retrieve(tokenId, function(error, token) {
    if (error) console.log(error)

    return token
  });
}

export {
  getToken,
  getRealToken,
  getTokenInfo
}