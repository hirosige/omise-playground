import 'dotenv/config';
import { client } from './omiseClient'

const getTransfers = async () => {
  return await client.transfers.list(function(error, transfers) {
    if (error) console.log(error)

    return transfers
  });
}

const getTransfer = async transferId => {
  return await client.transfers.retrieve(transferId, function(error, transfer) {
    if (error) console.log(error)

    return transfer
  });
}

const transferToDefaultRecipient = async amount => {
  await client.transfers.create({ amount }, function(error, transfer) {
    if (error) console.log(error)

    console.log('tranfer is successfully made')
  });
}

const transferTo = async ({ amount, recipientId }) => {
  await client.transfers.create({ amount, recipient: recipientId }, function(error, transfer) {
    if (error) console.log(error)
  });
}

const updateTransfer = async ({
  transferId,
  amount
}) => {
  await client.transfers.update(
    transferId,
    { amount },
    function(error, transfer) {
      if (error) console.log(error)

      console.log('transfer is successfully updated')
    }
  );
}

const deleteTransfer = async tansferId => {
  await client.transfers.destroy(tansferId, function(error, transfer) {
    if (error) console,log(error)

  console.log('transfer is successfully deleted')
  });
}

export {
  getTransfers,
  getTransfer,
  transferToDefaultRecipient,
  transferTo,
  updateTransfer,
  deleteTransfer
}