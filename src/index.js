import './node_modules/materialize-css/dist/js/materialize.min.js';
import Button from './components/Button';
import System from './system/system';
import LoadCollectionPageXbutton from './components/LoadCollectionPageXbutton';

const classes = {
    Button,
    LoadCollectionPageXbutton
};

const system = new System(classes);
system.init();