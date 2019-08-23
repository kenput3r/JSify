export default function renderFbtScript() {
  const src_url = 'https://cdn.codeblackbelt.com/js/modules/frequently-bought-together/main.min.js?shop=suavecito.myshopify.com';
  const fbt_script = document.createElement('SCRIPT');
  fbt_script.type = 'text/javascript';
  fbt_script.defer = true;
  fbt_script.src = src_url;
  return fbt_script;
}