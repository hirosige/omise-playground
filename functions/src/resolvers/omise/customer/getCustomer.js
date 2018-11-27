const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedCustomer = await client.customers.retrieve(
    event.data.customerId,
    (error, customer) => {
      if (error) {
        return { error: error }
      }

      return customer
    })

  if('error' in fetchedCustomer) {
    return {
      error: fetchedCustomer.error
    }
  }

  event.data = {
    ...fetchedCustomer,
    defaultCard: fetchedCustomer.default_card
  }

  return {
    data: event.data
  }
}