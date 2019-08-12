async function initializeDrawer(drawer_id, options, promise) {
  const Drawer = await new Promise((resolve, reject)=> {
    document.addEventListener('DOMContentLoaded', function() {
      const element = document.getElementById(drawer_id);
      const instance = M.Sidenav.init(element, options);
      return resolve(instance);
    });
  });
  return promise.resolve(Drawer);
}
export default initializeDrawer;