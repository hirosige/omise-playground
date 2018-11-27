import 'dotenv/config';
import { client } from './omiseClient'

const getCustomers = async () => {
  return await client.customers.list({
    limit: 100,
    offset: 0
  }, function(error, list) {
    if (error) console.log(error)

    return list
  });
}

const getCustomer = async (customerId) => {
  return client.customers.retrieve(customerId, function(error, customer) {
    if (error) console.log(error)

    return customer
  });
}

const makeCustomer = async ({ description, email }) => {
  return await client.customers.create({
    description: description,
    email: email
  }, function(error, customer) {
    if (error) console.log(error)

    return customer
  });
}

const updateCustomer = async ({ id, description, email }) => {
  return await client.customers.update(
    id,
    {
      description: description,
      email: email
    }, function(error, customer) {
      if (error) console.log(error)

      return customer
  });
}

const deleteCustomer = async (id) => {
  await client.customers.destroy(id, function(error, customer) {
    if (error) console.log(error)

    console.log('customer is successfully deleted')
  });
}

const addCreditToCustomer = async ({ id, token }) => {
  await client.customers.update(
    id,
    { 'card': token },
    function(error, customer) {
      if (error) console.log(error)

      console.log(customer)
      console.log(`card is successfully added to cusotmer ${id}`)
    }
  );
}

export {
  getCustomers,
  makeCustomer,
  getCustomer,
  updateCustomer,
  deleteCustomer,
  addCreditToCustomer
}
