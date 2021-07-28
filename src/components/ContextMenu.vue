<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on }" class="wrapper">
      <img
        src="../assets/threePoints.png"
        v-on="on"
        class="clickImage"
        @click="clickOptions($event)"
      />
    </template>
    <v-list>
      <v-list-item
        v-for="(item, i) in settings.buttons"
        :key="i"
        @click="clickItem(i)"
      >
        <v-list-item-title :class="'image'"
          ><img :src="item.image" /> {{ item.title }}</v-list-item-title
        >
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ContextMenu",

  props: {
    settings: Object,
  },

  watch: {
    settings: {
      handler(newVal) {
        this.settings = newVal;
      },
    },
  },

  methods: {
    clickOptions(e) {
      this.$emit("clickOptions", e);
    },
    clickItem(ind) {
      if (this.settings.buttons[ind].handler === "removePayment") {
        this.removePayment();
      } else {
        this.editPayment();
      }
    },
    removePayment() {
      const index = this.$store.getters.getPageNumber + this.settings.index;

      this.$store.commit("removePayment", index);
      this.$root.$emit("updateDiagram");
      this.$emit("closeContextMenu");
    },
    editPayment() {
      const payment = this.getPagePayments[this.settings.index];
      const type = payment.type;
      const amount = payment.amount;
      const date = payment.date;
      const ind = this.settings.index;

      this.$root.$emit("updatePayment", {
        type,
        amount,
        date,
        ind,
      });

      this.$emit("closeContextMenu");
    },
  },

  computed: {
    ...mapGetters(["getPagePayments"]),
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/contextMenu.scss";
</style>
