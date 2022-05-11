import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

import modal from "./plugins/ModalWindow";
import contextMenu from "./plugins/ContextMenu";
import vuetify from "./plugins/vuetify";

import HighchartsVue from "highcharts-vue";
import Highcharts from "highcharts";
import exportingInit from "highcharts/modules/exporting";
import highchartsMoreInit from "highcharts/highcharts-more";
import solidGaugeInit from "highcharts/modules/solid-gauge";

exportingInit(Highcharts);
highchartsMoreInit(Highcharts);
solidGaugeInit(Highcharts);

Vue.config.productionTip = false;

Vue.use(HighchartsVue);

Vue.use(modal);
Vue.use(contextMenu);

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
