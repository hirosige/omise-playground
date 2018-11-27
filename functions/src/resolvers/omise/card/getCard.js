const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const fetchedCard = await client.customers.retrieveCard(
    event.data.customerId,
    event.data.cardId,
    (error, card) => {
      if (error) {
        return { error: error }
      }

      return card
    })

  if('error' in fetchedCard) {
    return {
      error: fetchedCard.error
    }
  }

  event.data = {
    ...fetchedCard,
    postalCode: fetchedCard.postal_code,
    lastDigits: fetchedCard.last_digits,
    expirationMonth: fetchedCard.expiration_month,
    expirationYear: fetchedCard.expiration_year,
    securityCodeCheck: fetchedCard.security_code_check,
  }

  return {
    data: event.data
  }
}