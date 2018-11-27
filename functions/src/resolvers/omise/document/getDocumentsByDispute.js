import axios from 'axios'

const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const DOCUMENT_URL =
    `https://api.omise.co/disputes/${event.data.disputeId}/documents`

  const fetchedDocuments = await axios.get(DOCUMENT_URL, {
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

  if('error' in fetchedDocuments) {
    return {
      error: fetchedDocuments.error
    }
  }

  let documents = []

  fetchedDocuments.data.forEach(document => {
    documents.push({
      ...document,
      closedAt: document.closed_at,
      reasonCode: document.reason_code,
      reasonMessage: document.reason_message,
    })
  })

  event.data = documents

  return {
    data: event.data
  }
}