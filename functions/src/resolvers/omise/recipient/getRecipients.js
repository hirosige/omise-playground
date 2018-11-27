const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedRecipients = await client.recipients.list({
      limit: event.data.limit,
      offset: event.data.offset,
      from: event.data.from,
      to: event.data.to,
      order: event.data.order,
    },
    (error, recipients) => {
      if (error) {
        return { error: error }
      }

      return recipients
    })

  if('error' in fetchedRecipients) {
    return {
      error: fetchedRecipients.error
    }
  }

  let recipients = []

  fetchedRecipients.data.forEach(recipient => {
    recipients.push({
      ...recipient,
      bankAccount: recipient.bank_account,
      failureCode: recipient.failure_code,
      taxId: recipient.tax_id,
    })
  })

  event.data = recipients

  return {
    data: event.data
  }
}