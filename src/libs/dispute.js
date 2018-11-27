import 'dotenv/config';
import { client } from './omiseClient'

const getDisputes = async () => {
  return await client.disputes.list(function(error, disputes) {
    if (error) console.log(error)

    return disputes
  });
}

const getOpenDisputes = async () => {
  return await client.disputes.listOpen(function(error, openedDisputes) {
    if (error) console.log(error)

    return openedDisputes
  });
}

const getPendingDisputes = async () => {
  return await client.disputes.listPending(function(error, pendingDisputes) {
    if (error) console.log(error)

    return pendingDisputes
  });
}

const getClosedDisputes = async () => {
  return await client.disputes.listClosed(function(error, closedDisputes) {
    if (error) console.log(error)

    return closedDisputes
  });
}

const getDispute = async disputeId => {
  return await client.disputes.retrieve(disputeId, function(error, dispute) {
    if (error) console.log(error)

    return dispute
  });
}

const updateDispute = async ({ disputeId, msg }) => {
  return await client.disputes.update(disputeId, {
    message: msg
  }, function(error, dispute) {
    if (error) console.log(error)

    return dispute
  });
}

export {
  getDisputes,
  getOpenDisputes,
  getPendingDisputes,
  getClosedDisputes,
  getDispute,
  updateDispute,
}