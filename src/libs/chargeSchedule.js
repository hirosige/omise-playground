import 'dotenv/config';
import { client } from './omiseClient'

const getScheduledCharges = async () => {
  console.log('heloo')
  return await client.charges.schedules(function(error, schedules){
    if (error) console.log(error)

    return schedules
  });
}

const getScheduledChargesByUser = async customerId => {
  return await client.customers.schedules(customerId, function(error, schedules){
    if (error) console.log(error)

    return schedules
  });
}

export {
  getScheduledCharges,
  getScheduledChargesByUser,
}