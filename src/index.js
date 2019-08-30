import './node_modules/materialize-css/dist/js/materialize.min.js';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductSwiper from './components/ProductSwiper';
import ProductTile from './components/ProductTile';
import CollectionHeader from './components/CollectionHeader';
import FiltersDrawer from './components/FiltersDrawer';

const classes = {
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductSwiper,
    ProductTile,
    CollectionHeader,
    FiltersDrawer
};

const system = new System(classes);
system.init();