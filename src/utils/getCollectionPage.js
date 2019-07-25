async function getCollectionPage(url, page) {
  const headers = new Headers({'Content-Type': 'text/html'});
  const collection_url = 'https://'+url;
  console.log(url);
  const new_markup = await fetch(collection_url, {headers: headers}).then((res)=> {
    return res.text();
  }).then((data)=> {
    console.log(data);
  });
}
export default getCollectionPage;