import axios from 'axios'

const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const REFUND_URL =
    `https://api.omise.co/refunds`

  const fetchedRefunds = await axios.get(REFUND_URL, {
    params: {
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    auth: {
      username: process.env.OMISE_SECRET_KEY
    }
  })
    .then(response => {
        return response.data
    }).catch(error => {
      return { error: error }
    })

  if('error' in fetchedRefunds) {
    return {
      error: fetchedRefunds.error
    }
  }

  let refunds = []

  fetchedRefunds.data.forEach(refund => {
    refunds.push({
      ...refund,
    })
  })

  event.data = refunds

  return {
    data: event.data
  }
}