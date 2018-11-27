const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedCustomer = await client.customers.update({
      email: event.data.email,
      description: event.data.description,
      metadata: event.data.metadata,
      default_card: event.data.defaultCard
    },
    (error, customer) => {
      if (error) {
        return { error: error }
      }

      return customer
    })

  if('error' in updatedCustomer) {
    return {
      error: updatedCustomer.error
    }
  }

  event.data = {
    ...updatedCustomer,
    defaultCard: updatedCustomer.default_card
  }

  return {
    data: event.data
  }
}