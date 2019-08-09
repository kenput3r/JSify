function initializeDrawer(drawer_id, options) {
  document.addEventListener('DOMContentLoaded', function() {
    const element = document.getElementById(drawer_id);
    const instance = M.Sidenav.init(element, options);
  });
}

export default initializeDrawer;