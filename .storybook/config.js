import { configure } from '@storybook/react';

function loadStories() {
  require("babel-polyfill");
  require('../www/sass/global.scss');
  require("../www/react/components/HiThere/storybook");
} // DONT'T DELETE THIS

configure(loadStories, module);