import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getRefunds,
  getRefundsByCharge,
  makeRefund,
  getRefund
} from '../libs/refund'
import {
  getCharges
} from '../libs/charge'

const omiseTransaction = async () => {
  const refunds = (await getRefunds()).data
  const firstRefund = refunds[0]

  const charges = (await getCharges()).data
  const atOne = charges[0]
  console.log(atOne.id)

  await makeRefund({
    chargeId: atOne.id,
    refundAmount: 100
  })

  console.log(await getRefundsByCharge(atOne.id))

  const refund = await getRefund({
    chargeId: atOne.id,
    refundId: firstRefund.id
  })

  console.log(refund)
}

omiseTransaction()