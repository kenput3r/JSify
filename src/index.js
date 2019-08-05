import './node_modules/materialize-css/dist/js/materialize.min.js';
import Button from './components/Button';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';
import initializeDrawer from './utils/intializeDrawer';

const classes = {
    Button,
    LoadCollectionPageXbutton
};

const system = new System(classes);
system.init();

initializeDrawer('ProductDrawer', {edge: 'right'});