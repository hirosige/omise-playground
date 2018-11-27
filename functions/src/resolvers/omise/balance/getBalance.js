const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const currentBalance = await client.balance.retrieve(
    (error, account) => {
      if (error) {
        return { error: error }
      }

      return account
    })

  if('error' in currentBalance) {
    return {
      error: currentBalance.error
    }
  }

  event.data = {
    ...currentBalance,
    reserveAmount: currentBalance.reserve_amount
  }

  return {
    data: event.data
  }
}