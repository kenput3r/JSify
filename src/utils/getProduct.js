/**
 * @function getProduct - Get a Shopify product
 * @param {String} url The url of the product to fetch
 * @param {object} promise Used for resolving or rejecting a Promise
 */
async function getProduct(url, promise) {
  const headers = new Headers({'Content-Type': 'text/html'});

  const response = await fetch(url, {headers: headers});
  if(response.status === 404) return promise.reject({error: 404});

  const product = await response.text();

  return promise.resolve(product);
}
export default getProduct;