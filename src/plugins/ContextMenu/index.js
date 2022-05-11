export default {
  install(Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Vue.prototype.$contextMenu = {
      EventBus: new Vue(),

      show(items) {
        this.EventBus.$emit("shown", { ...items });
      },

      hide() {
        this.EventBus.$emit("hide");
      },

      message() {
        console.log("test message");
      },
    };
  },
};
