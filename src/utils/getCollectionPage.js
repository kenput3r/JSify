/**
 * @method getCollectionPage
 * @param {String} url The url of the collection to fetch
 * @param {object} promise Used for resolving or rejecting a Promise
 */
async function getCollectionPage(url, promise) {
  const headers = new Headers({'Content-Type': 'text/html'});

  const collection_products = await fetch(url, {headers: headers});
  if(collection_products.status === 404) return promise.reject({error: 404});

  const elements = await collection_products.text();
  return promise.resolve(elements);
}
export default getCollectionPage;