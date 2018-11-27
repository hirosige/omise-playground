import 'dotenv/config';
import { client } from './omiseClient'

const getLinks = async () => {
  return await client.links.list(function(error, links) {
    if (error) console.log(error)

    return links
  });
}

const getLink = async linkId => {
  return await client.links.retrieve(linkId, function(error, link) {
    if (error) console.log(error)

    return link
  });
}

const makeOneTimeLink = async ({
  amount,
  currency,
  title,
  description,
}) => {
  return await client.links.create({
    amount,
    currency,
    title,
    description,
  }, function(error, oneTimeLink) {
    if (error) console.log(error)

    return oneTimeLink
  });
}

export {
  getLinks,
  getLink,
  makeOneTimeLink,
}