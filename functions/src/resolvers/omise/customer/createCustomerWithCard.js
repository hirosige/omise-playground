const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const createdCustomer = await client.customers.create({
      email: event.data.email,
      description: event.data.description,
      metadata: event.data.metadata,
      card: event.data.cardToken,
    },
    (error, customer) => {
      if (error) {
        return { error: error }
      }

      return customer
    })

  if('error' in createdCustomer) {
    return {
      error: createdCustomer.error
    }
  }

  event.data = {
    ...createdCustomer,
    defaultCard: createdCustomer.default_card
  }

  return {
    data: event.data
  }
}