import getProduct from './getProduct';
async function insertDrawerContent(Drawer, url) {
  const content = await new Promise((resolve, reject)=> {
    getProduct(url, {resolve: resolve, reject: reject});
  });

  Drawer.innerHTML = content;
  Drawer.getElementsByClassName('close-drawer')[0].onclick = ()=>M.Sidenav.getInstance(Drawer).close();
}

export default insertDrawerContent;