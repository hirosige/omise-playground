import 'dotenv/config';
import { client } from './omiseClient'

const getCards = async (customerId) => {
  return await client.customers.listCards(customerId, function(error, list) {
    if (error) console.log(error)

    return list
  });
}

const getCard = async ({ customerId, cardId }) => {
  return await client.customers.retrieveCard(
    customerId,
    cardId,
    (error, card) => {
      if (error) console.log(error)

      return card
    }
  )
}

const updateCard = async ({
  customerId,
  cardId,
  expiration_month,
  expiration_year,
  name,
  postal_code,
}) => {
  await client.customers.updateCard(
    customerId,
    cardId,
    {
      expiration_month,
      expiration_year,
      name,
      postal_code
    },
    function(error, card) {
      if (error) console.log(error)

      console.log('card is successfully updated')
    }
  );
}

const deleteCard = async ({
  customerId,
  cardId,
}) => {
  await client.customers.destroyCard(
    customerId,
    cardId,
    function(error, card) {
      if (error) console.log(error)

      console.log('card is successfully deleted')
    }
  );
}

export {
  getCards,
  getCard,
  updateCard,
  deleteCard
}
