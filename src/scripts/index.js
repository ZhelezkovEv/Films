import { Gallery } from './services/Gallery.js';

const gallery = new Gallery('#container');

gallery.render().catch(console.error);