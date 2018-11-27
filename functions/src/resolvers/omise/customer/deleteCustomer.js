const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const deletedCustomer = await client.customers.destroy(
    event.data.customerId,
    (error, customer) => {
      if (error) {
        return { error: error }
      }

      return customer
    })

  if('error' in deletedCustomer) {
    return {
      error: deletedCustomer.error
    }
  }

  event.data = {
    ...deletedCustomer,
    defaultCard: deletedCustomer.default_card
  }

  return {
    data: event.data
  }
}