<template>
  <div>
    <v-container>
      <div class="text-h5 text-sm-h2 mb-6">My personal costs</div>
      <v-row>
        <v-col :cols="6">
          <AddPaymentForm class="mb-8" />

          <PaymentsDisplay />

          <PaginationComp />
        </v-col>

        <v-col :cols="6">
          <Diagram />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import AddPaymentForm from "../components/AddPaymentForm.vue";
import PaymentsDisplay from "../components/PaymentsDisplay.vue";
import PaginationComp from "../components/PaginationComp.vue";
import Diagram from "../components/Diagram.vue";

export default {
  name: "Dashboard",

  components: {
    AddPaymentForm,
    PaymentsDisplay,
    PaginationComp,
    Diagram,
  },

  data() {
    return {
      modalShown: false,
      modalSettings: {},
    };
  },

  methods: {
    onShown(settings) {
      this.modalSettings = settings;
    },
    onHide() {
      this.modalSettings = {};
    },
    onClickShow() {
      this.$modal.show("AddPayment", { header: "Add Payment" });
    },
  },
  mounted() {
    this.$modal.EventBus.$on("shown", this.onShown);
    this.$modal.EventBus.$on("hide", this.onHide);
  },

  beforeDestroy() {
    this.$modal.EventBus.$off("shown", this.onShown);
    this.$modal.EventBus.$off("hide", this.onHide);
  },
};
</script>

<style scoped></style>
