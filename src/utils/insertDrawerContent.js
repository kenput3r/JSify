import getProduct from './getProduct';
/**
 * @function insertDrawerContent - Insert the fetched product into the drawer
 * @param {node} Drawer 
 * @param {string} url 
 * @param {promise} promise 
 */
async function insertDrawerContent(Drawer, url, promise) {
  const content = await new Promise((resolve, reject)=> {
    getProduct(url, {resolve: resolve, reject: reject});
  });

  Drawer.querySelector('.content').innerHTML = content;
  Drawer.getElementsByClassName('close-drawer')[0].onclick = ()=>M.Sidenav.getInstance(Drawer).close();

  return promise.resolve();
}

export default insertDrawerContent;