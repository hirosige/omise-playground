import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getCards,
  getCard,
  updateCard,
  deleteCard,
} from '../libs/card'
import {
  getCustomers,
  addCreditToCustomer
} from '../libs/customer'

const omiseTransaction = async () => {


  const customers = (await getCustomers()).data

  const atOne = customers[1]
  await addCreditToCustomer({
    id: atOne.id,
    token: (await getRealToken()).id
  })

  const cards = (await getCards(atOne.id)).data
  console.log(cards)

  const firstCard = cards[0]

  const cardInfo = await getCard({
    customerId: atOne.id,
    cardId: firstCard.id,
  })
  console.log(cardInfo)

  await updateCard({
    customerId: atOne.id,
    cardId: firstCard.id,
    expiration_month: 8,
    expiration_year: 25,
    name: 'Nobunaga',
    postal_code: 199989
  })

  // await deleteCard({
  //   customerId: atOne.id,
  //   cardId: firstCard.id,
  // })
}

omiseTransaction()