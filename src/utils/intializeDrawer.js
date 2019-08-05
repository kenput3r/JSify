function initializeDrawer(drawer_id, options) {
  document.addEventListener('DOMContentLoaded', function() {
    console.log('dom content loaded');
    const element = document.getElementById(drawer_id);
    const instance = M.Sidenav.init(element, options);
  });
}

export default initializeDrawer;