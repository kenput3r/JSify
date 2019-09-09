/**
 * @function initializeSelect - Initializes elements with a specified selector
 * as instances of Materialize FormSelect.
 * @param {string} selector
 * @param {object} options 
 * @see {@link https://materializecss.com/select.html}
 */
function initializeSelect(selector, options) {
  const elems = document.querySelectorAll(selector);
  const instances = M.FormSelect.init(elems, options);
}
export default initializeSelect;