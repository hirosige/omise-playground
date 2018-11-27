import 'dotenv/config';
import { getRealToken } from '../libs/token'
import {
  getLinks,
  getLink,
  makeOneTimeLink,
} from '../libs/links'

const omiseTransaction = async () => {
  console.log(await getLinks())

  const link = await makeOneTimeLink({
    amount: 10000,
    currency: 'thb',
    title: 'shoes',
    description: 'the world biggest shoes',
  })

  console.log(link)

  console.log(await getLink('link_test_5e0m2d3l4yt4qlj0pjs'))
}

omiseTransaction()