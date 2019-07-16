import './node_modules/materialize-css/dist/js/materialize.min.js';
import Button from './components/Button';
import System from './system/system';

const classes = {
    Button
};

const system = new System(classes);
system.init();