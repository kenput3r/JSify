import './node_modules/materialize-css/dist/js/materialize.min.js';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductSwiper from './components/ProductSwiper';
import ProductForm from './components/ProductForm';
import ProductCarousel from './components/ProductCarousel';
import ProductTile from './components/ProductTile';
import ProductReviews from './components/ProductReviews';
import ProductReviewForm from './components/ProductReviewForm';
import Cart from './components/Cart';
import CollectionHeader from './components/CollectionHeader';
import CollectionTemplateCarousel from './components/CollectionTemplateCarousel';
import FiltersDrawer from './components/FiltersDrawer';
import FiltersColumn from './components/FiltersColumn';
import LineItem from './components/LineItem';
import LoginForm from './components/LoginForm';
import DesktopNav from './components/DesktopNav';
import MobileBrandCarousel from './components/MobileBrandCarousel';
import MobileNav from './components/MobileNav';
import MobileMenu from './components/MobileMenu';
import MobileSearch from './components/MobileSearch';
import OrdersHelp from './components/OrdersHelp';
import Order from './components/Order';
import Parallax from './components/Parallax';
import SideScroll from './components/SideScroll';
import Account from './components/Account';
import AddressForm from './components/AddressForm';
import DataRequest from './components/DataRequest';
import PosterCollection from './components/PosterCollection';
import LazyImage from './components/LazyImage';

const classes = {
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductSwiper,
    ProductForm,
    ProductCarousel,
    ProductTile,
    ProductReviews,
    ProductReviewForm,
    Cart,
    CollectionHeader,
    CollectionTemplateCarousel,
    FiltersDrawer,
    FiltersColumn,
    LoginForm,
    LineItem,
    DesktopNav,
    MobileBrandCarousel,
    MobileMenu,
    MobileNav,
    MobileSearch,
    OrdersHelp,
    Order,
    Parallax,
    SideScroll,
    Account,
    AddressForm,
    DataRequest,
    PosterCollection,
    LazyImage
};

const system = new System(classes);
system.init();