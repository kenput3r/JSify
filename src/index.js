import './node_modules/materialize-css/dist/js/materialize.min.js';
import Button from './components/Button';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductSwiper from './components/ProductSwiper';

const classes = {
    Button,
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductSwiper
};

const system = new System(classes);
system.init();