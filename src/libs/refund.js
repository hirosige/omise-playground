import 'dotenv/config';
import { client } from './omiseClient'
import axios from 'axios'

const REFUND_URL = 'https://api.omise.co/refunds'

const getRefunds = async () => {
  return await axios.get(REFUND_URL, {
    params: {
      limit: 100
    },
    auth: {
      username: process.env.OMISE_SECRET_KEY
    }
  })
    .then(response => {
        return response.data
    }).catch(err => {
        console.log('err:', err);
    })
}

const getRefund = async ({
  chargeId,
  refundId
}) => {
  omise.charges.retrieveRefund(
    chargeId,
    refundId,
    function(error, refund) {
      if (error) console.log(error)

      return refund
    });
}

const getRefundsByCharge = async chargeId => {
  return await client.charges.listRefunds(chargeId, function(error, refunds) {
    if (error) console.log(error)

    return refunds
  });
}

const makeRefund = async ({ chargeId, refundAmount }) => {
  await client.charges.createRefund(
    chargeId,
    {
      amount: refundAmount
    },
    function(error, refund) {
      if (error) console.log(error)

      console.log(refund)
    }
  );
}

export {
  getRefunds,
  getRefundsByCharge,
  makeRefund,
  getRefund
}