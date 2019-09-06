import './node_modules/materialize-css/dist/js/materialize.min.js';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductSwiper from './components/ProductSwiper';
import ProductTile from './components/ProductTile';
import CollectionHeader from './components/CollectionHeader';
import FiltersDrawer from './components/FiltersDrawer';
import FiltersColumnToggle from './components/FiltersColumnToggle';
import FiltersColumn from './components/FiltersColumn';
import LoginForm from './components/LoginForm';
import DesktopNav from './components/DesktopNav';

const classes = {
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductSwiper,
    ProductTile,
    CollectionHeader,
    FiltersDrawer,
    FiltersColumnToggle,
    FiltersColumn,
    LoginForm,
    DesktopNav
};

const system = new System(classes);
system.init();