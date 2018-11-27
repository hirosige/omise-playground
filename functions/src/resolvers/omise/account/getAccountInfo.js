const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const accountInfo = await client.account.retrieve(
    (error, account) => {
      if (error) {
        return { error: error }
      }

      return account
    })

  if('error' in accountInfo) {
    return {
      error: accountInfo.error
    }
  }

  event.data = {
    ...accountInfo,
    supportedCurrencies: accountInfo.supported_currencies
  }

  return {
    data: event.data
  }
}