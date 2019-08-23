export default function renderSnptScript(vendor) {
  let src_url;
  if(vendor === 'suavecita') {
    src_url = 'https://snapppt.com/widgets/ppg/0fdbe9ce-1f38-4c32-a7a4-78e6a984fd8c';
  }else if(vendor === 'suavecito') {
    src_url = 'https://snapppt.com/widgets/ppg/b8a4a3ac-f1db-4f1d-b6bf-d101c36d5f28';
  }
  const snpt_script = document.createElement('SCRIPT');
  snpt_script.src = src_url;
  snpt_script.defer = true;
  snpt_script.classList.add('snapppt-widget');
  return snpt_script;
}