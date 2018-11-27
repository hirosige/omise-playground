const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedCards = await client.customers.listCards(
    event.data.customerId,
    {
      limit: event.data.limit,
      offset: event.data.offset,
    },
    (error, cards) => {
      if (error) {
        return { error: error }
      }

      return cards
    })

  if('error' in fetchedCards) {
    return {
      error: fetchedCards.error
    }
  }

  let cards = []

  fetchedCards.data.forEach(card => {
    cards.push({
      ...card,
      expirationMonth: card.expiration_month,
      expirationYear: card.expiration_year,
      lastDigits: card.last_digits,
      postalCode: card.postal_code,
      securityCodeCheck: card.security_code_check,
    })
  })

  event.data = cards

  return {
    data: event.data
  }
}