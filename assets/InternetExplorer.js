function isIE() {
  ua = navigator.userAgent;
  var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
  return is_ie; 
}

if (isIE()){
  window.location = 'https://suavecito.com/pages/internet-explorer?view=InternetExplorer';
}