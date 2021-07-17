import './node_modules/materialize-css/dist/js/materialize.min.js';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import ProductDrawer from './components/ProductDrawer';
import ProductForm from './components/ProductForm';
import ProductFormSubscription from './components/ProductFormSubscription';
import ProductFormCompactSubscription from './components/ProductFormCompactSubscription';
import ProductFormSubscriptionV2 from './components/ProductFormSubscriptionV2';
import ProductFormBuildRegimen from './components/ProductFormBuildRegimen';
import ProductMinoxidil from './components/ProductMinoxidil';
import ProductCarousel from './components/ProductCarousel';
import ProductTile from './components/ProductTile';
import ProductReviews from './components/ProductReviews';
import ProductReviewForm from './components/ProductReviewForm';
import Cart from './components/Cart';
import CollectionHeader from './components/CollectionHeader';
import CollectionTemplateCarousel from './components/CollectionTemplateCarousel';
import FiltersDrawer from './components/FiltersDrawer';
import HpForm from './components/HpForm';
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
import Subscribe from './components/Subscribe';
import Account from './components/Account';
import AddressForm from './components/AddressForm';
import DataRequest from './components/DataRequest';
import PosterCollection from './components/PosterCollection';
import Poster from './components/Poster';
import LazyImage from './components/LazyImage';
import BisModal from './components/BisModal';
import ManageSubscriptionsButton from './components/ManageSubscriptionsButton';

const classes = {
    LoadCollectionPageXbutton,
    ProductDrawer,
    ProductForm,
    ProductFormSubscription,
    ProductFormCompactSubscription,
    ProductFormSubscriptionV2,
    ProductFormBuildRegimen,
    ProductMinoxidil,
    ProductCarousel,
    ProductTile,
    ProductReviews,
    ProductReviewForm,
    Cart,
    CollectionHeader,
    CollectionTemplateCarousel,
    FiltersDrawer,
    HpForm,
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
    Subscribe,
    Account,
    AddressForm,
    DataRequest,
    PosterCollection,
    Poster,
    LazyImage,
    BisModal,
    ManageSubscriptionsButton
};

const system = new System(classes);
system.init();