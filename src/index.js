import './node_modules/materialize-css/dist/js/materialize.min.js';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductSwiper from './components/ProductSwiper';
import ProductTile from './components/ProductTile';
import CollectionHeader from './components/CollectionHeader';
import FiltersDrawer from './components/FiltersDrawer';
import FiltersColumn from './components/FiltersColumn';
import LoginForm from './components/LoginForm';
import DesktopNav from './components/DesktopNav';
import MobileNav from './components/MobileNav';
import MobileMenu from './components/MobileMenu';
import MobileSearch from './components/MobileSearch'

const classes = {
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductSwiper,
    ProductTile,
    CollectionHeader,
    FiltersDrawer,
    FiltersColumn,
    LoginForm,
    DesktopNav,
    MobileMenu,
    MobileNav,
    MobileSearch
};

const system = new System(classes);
system.init();