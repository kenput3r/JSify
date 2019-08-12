function initializeSelect(selector, options) {
  var elems = document.querySelectorAll(selector);
  var instances = M.FormSelect.init(elems, options);
  console.log(selector + 'initialized');
}
export default initializeSelect;