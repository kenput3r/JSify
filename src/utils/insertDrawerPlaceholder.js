/**
 * @function insertDrawerPlaceholder - Inserts the Drawer's placeholder markup
 * @param {node} Drawer 
 */
function insertDrawerPlaceholder(Drawer) {
  const content = `<div class="ph-item">
  <div><i class="medium material-icons close-drawer">chevron_left</i></div>
  <div class="ph-col-12">
    <div class="ph-row">
      <div class="ph-col-8 big"></div>
      <div class="ph-col-2 empty big"></div>
      <div class="ph-col-2 big"></div>
    </div>
    <div class="ph-picture margin-bottom-none"></div>
    <div class="ph-picture margin-bottom-none"></div>
    <div class="ph-picture"></div>
    <div class="ph-row">
      <div class="ph-col-6 big"></div>
      <div class="ph-col-4 empty big"></div>
      <div class="ph-col-2 big"></div>
      <div class="ph-col-4"></div>
      <div class="ph-col-8 empty"></div>
      <div class="ph-col-6"></div>
      <div class="ph-col-6 empty"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-2"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-8"></div>
      <div class="ph-col-2"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-8"></div>
      <div class="ph-col-2"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-8"></div>
      <div class="ph-col-2"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-8"></div>
      <div class="ph-col-2"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-8"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
      <div class="ph-col-12"></div>
      <div class="ph-col-10"></div>
      <div class="ph-col-2 empty"></div>
    </div>
  </div>
</div>`;

Drawer.querySelector('.content').innerHTML = content;
Drawer.getElementsByClassName('close-drawer')[0].onclick = ()=>M.Sidenav.getInstance(Drawer).close();
}

export default insertDrawerPlaceholder;