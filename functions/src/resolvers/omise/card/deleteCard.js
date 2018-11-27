const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const deletedCard = await client.customers.destroyCard(
    event.data.customerId,
    event.data.cardId,
    (error, card) => {
      if (error) {
        return { error: error }
      }

      return card
    }
  )

  if('error' in deletedCard) {
    return {
      error: deletedCard.error
    }
  }

  event.data = {
    ...deletedCard,
    postalCode: deletedCard.postal_code,
    lastDigits: deletedCard.last_digits,
    expirationMonth: deletedCard.expiration_month,
    expirationYear: deletedCard.expiration_year,
    securityCodeCheck: deletedCard.security_code_check,
  }

  return {
    data: event.data
  }
}