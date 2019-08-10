import './node_modules/materialize-css/dist/js/materialize.min.js';
import Button from './components/Button';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import initializeDrawer from './utils/intializeDrawer';
import insertDrawerContent from './utils/insertDrawerContent';
import insertDrawerPlaceholder from './utils/insertDrawerPlaceholder';
import ProductDrawer from './components/ProductDrawer';

const classes = {
    Button,
    LoadCollectionPageXbutton,
    ProductDrawer
};

const system = new System(classes);
system.init();

// initializeDrawer('ProductDrawer', 
//   {
//     edge: 'right', 
//     onOpenStart: ()=>insertDrawerContent(event.target.dataset.url),
//     onCloseEnd: ()=>insertDrawerPlaceholder('ProductDrawer')
//   }
// );