<template>
  <div>
    <div class="total">
      <p>Total: {{ getFPA }}</p>
    </div>

    <v-container class="container">
      <v-row :id="'header'">
        <v-col :cols="1">#</v-col>
        <v-col :cols="4">Date</v-col>
        <v-col :cols="4">Type</v-col>
        <v-col :cols="2">Amount</v-col>
        <v-col :cols="1"></v-col>
      </v-row>

      <div class="loading" v-if="getLoadingStatus">Загрузка</div>

      <v-row
        v-for="(payment, index) in payments"
        :key="index"
        :class="'payment'"
        :id="index"
      >
        <v-col :cols="1">{{ pageNumber * 10 + index + 1 }}</v-col>
        <v-col :cols="4">{{ payment.date }}</v-col>
        <v-col :cols="4">{{ payment.type }}</v-col>
        <v-col :cols="2">{{ payment.amount }}</v-col>
        <v-col :cols="1" :id="'details'"
          ><context-menu
            :settings="contextMenuSettings"
            @clickOptions="clickOptions"
            @closeContextMenu="closeContextMenu"
        /></v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ContextMenu from "./ContextMenu.vue";
import pencil from "../assets/pencil.png";
import trash from "../assets/trash.png";

export default {
  name: "PaymentsDisplay",

  data: () => ({
    payments: [],
    pageNumber: 0,
    contextMenuSettings: {},
    clickedElem: "",
    clickedOption: "",
  }),

  components: {
    ContextMenu,
  },

  methods: {
    onShown(settings) {
      this.contextMenuSettings = settings;
    },
    onHide() {
      this.contextMenuSettings = {};
    },
    clickOptions(e) {
      this.clickedElem = e.target.parentNode.parentNode;
      this.clickedOption = e.target.parentNode;

      this.clickedElem.style.backgroundColor = "#efefef";

      this.clickedOption.setAttribute("class", "close-active");
      const index = this.clickedElem.getAttribute("id");

      const settings = {
        index,
        buttons: [
          {
            title: "Edit",
            image: pencil,
            handler: "editPayment",
          },
          {
            title: "Delete",
            image: trash,
            handler: "removePayment",
          },
        ],
      };
      this.contextMenuSettings = settings;
    },

    updateData() {
      this.payments = this.getPagePayments;
    },

    closeContextMenu() {
      this.clickedElem.style.backgroundColor = "";
      this.clickedOption.removeAttribute("class");
      this.clickedOption.setAttribute("id", "details");
    },

    ...mapMutations(["removePayment", "changeLoadingStatus"]),
  },

  computed: {
    getFPA() {
      return this.getFullPaymentsAmount;
    },

    getLoadingStatus() {
      return this.getLoadingStatus;
    },

    ...mapGetters([
      "getFullPaymentsAmount",
      "getLoadingStatus",
      "getPagePayments",
      "getPageNumber",
    ]),
  },

  created() {
    this.$store.dispatch("fetchData").then(() => {
      this.payments = this.getPagePayments;
      this.$root.$emit("updateDiagram");
      this.changeLoadingStatus();
    });
  },

  updated() {
    if (!this.getPagePayments.length) {
      this.$root.$emit("updatePayments");
    }

    this.payments = this.getPagePayments;
    this.pageNumber = this.getPageNumber;
  },

  mounted() {
    this.$root.$on("updateData", () => {
      this.updateData();
      this.pageNumber = this.getNumber;
    });

    this.$root.$on("removePayment", (number) => {
      this.removePayment(number);
    });

    this.$contextMenu.EventBus.$on("shown", this.onShown);
    this.$contextMenu.EventBus.$on("hide", this.onHide);
  },

  beforeDestroy() {
    this.$contextMenu.EventBus.$off("shown", this.onShown);
    this.$contextMenu.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/paymentDisplay.scss";
</style>
