import { configure } from '@storybook/react';

function loadStories() {
  require("babel-polyfill");
  require('../www/sass/global.scss');
} // DONT'T DELETE THIS

configure(loadStories, module);