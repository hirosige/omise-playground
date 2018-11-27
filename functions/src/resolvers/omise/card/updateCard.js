const client = require('omise')({
  publicKey: process.env.OMISE_PUBLIC_KEY,
  secretKey: process.env.OMISE_SECRET_KEY,
});

export default async event => {
  const updatedCard = await client.customers.updateCard(
    event.data.customerId,
    event.data.cardId,
    {
      expiration_month: event.data.expirationMonth,
      expiration_year: event.data.expirationYear,
      name: event.data.name,
      postal_code: event.data.postalCode
    },
    function(error, card) {
      if (error) {
        return { error: error }
      }

      return card
    }
  )

  if('error' in updatedCard) {
    return {
      error: updatedCard.error
    }
  }

  event.data = {
    ...updatedCard,
    postalCode: updatedCard.postal_code,
    lastDigits: updatedCard.last_digits,
    expirationMonth: updatedCard.expiration_month,
    expirationYear: updatedCard.expiration_year,
    securityCodeCheck: updatedCard.security_code_check,
  }

  return {
    data: event.data
  }
}