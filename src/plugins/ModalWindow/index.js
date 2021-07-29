export default {
  install(Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Vue.prototype.$modal = {
      EventBus: new Vue(),

      show(name, settings) {
        this.EventBus.$emit("shown", { name, ...settings });
      },

      hide() {
        this.EventBus.$emit("hide");
      },
    };
  },
};
