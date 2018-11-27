import 'dotenv/config';
import { client } from './omiseClient'

const getRecipients = async () => {
  return await client.recipients.list(function(error, recipients) {
    if (error) console.log(error)

    return recipients
  });
}

const makeRecipient = async ({
  name,
  email,
  type,
  bank_account
}) => {
  await client.recipients.create({
    name,
    email,
    type,
    bank_account
  }, function(error, recipient) {
    if (error) console.log(error)

    console.log(recipient)
  });
}

const deleteRecipient = async recipientId => {
  return await client.recipients.destroy(
    recipientId,
    (error, recipient) => {
      if (error) return error

      return recipient
    });
}

export {
  getRecipients,
  makeRecipient,
  deleteRecipient
}