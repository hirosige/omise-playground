const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedCustomers = await client.customers.list({
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, customers) => {
      if (error) {
        return { error: error }
      }

      return customers
    })

  if('error' in fetchedCustomers) {
    return {
      error: fetchedCustomers.error
    }
  }

  let customers = []

  fetchedCustomers.data.forEach(customer => {
    customers.push({
      ...customer,
      defaultCard: customer.default_card
    })
  })

  event.data = customers

  return {
    data: event.data
  }
}