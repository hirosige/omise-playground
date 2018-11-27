const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const cardAddedCustomer = await client.customers.update(
    event.data.customerId,
    { card: event.data.cardToken },
    (error, customer) => {
      if (error) {
        return { error: error }
      }

      return customer
    })

  if('error' in cardAddedCustomer) {
    return {
      error: cardAddedCustomer.error
    }
  }

  event.data = {
    ...cardAddedCustomer,
    defaultCard: cardAddedCustomer.default_card
  }

  return {
    data: event.data
  }
}