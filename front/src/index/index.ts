import Vue from 'vue';

import indexPage from "./components/index.vue";
import store from './index_vuex';

let indexPageDiv = document.getElementById('indexPageDiv');
if (indexPageDiv) {

  new Vue({
    el: '#indexPageDiv',
    store: store,
    render: h => h(indexPage)
  });

}