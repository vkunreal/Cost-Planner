<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template v-slot:activator="{ on }">
        <v-btn color="teal" dark v-on="on">
          Add new cost <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card class="py-2 px-2">
        <div class="d-flex justify-end">
          <v-btn @click="dialog = !dialog" plain :ripple="false"
            >&#10006;</v-btn
          >
        </div>

        <v-menu
          v-model="menu"
          offset-y
          :close-on-content-click="false"
          min-width="auto"
          transition="scale-transition"
          :nudge-right="40"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu>
        <v-spacer></v-spacer>

        <v-select v-model="type" label="Category" :items="categories" />

        <v-text-field v-model.number="amount" label="Amount" type="number" />

        <div class="d-flex justify-end">
          <v-btn v-show="!isAddData" color="teal" dark @click="onSaveClick"
            >Add payment</v-btn
          >
          <v-btn v-show="isAddData" color="teal" dark @click="onUpdateClick"
            >Update payment</v-btn
          >
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AddPaymentList",

  data: () => ({
    amount: "",
    type: "",
    date: "",
    categories: [],
    isAddData: false,
    ind: 0,
    dialog: false,
    menu: false,
  }),

  methods: {
    changeDate(date) {
      return date.split("-").reverse().join(".");
    },
    updatePayment(data) {
      this.isAddData = true;
      this.dialog = true;
      this.amount = data.amount;
      this.type = data.type;
      this.date = data.date;
      this.ind = data.ind;
    },
    onSaveClick() {
      let { date, type, amount } = this;

      if (!date || !type || !amount) {
        return;
      }

      const data = {
        amount: amount,
        type,
        date: this.changeDate(date) || this.getCurrentDate,
      };

      this.addDataToPaymentList(data);
      this.$root.$emit("updateDiagram");
      this.dialog = false;

      this.date = "";
      this.type = "";
      this.amount = "";
      this.rules = "";
    },

    onUpdateClick() {
      const { date, type, amount, ind } = this;

      if (!date || !type || !amount) {
        return;
      }

      this.$store.commit("changePayment", {
        amount: amount,
        type,
        date: this.changeDate(date),
        ind,
      });

      this.dialog = false;
      this.$root.$emit("updateDiagram");
    },

    showModal() {
      this.type = "";
      this.amount = "";
      this.date = "";
      this.show = !this.show;
    },

    ...mapMutations(["addDataToPaymentList", "changePayment"]),
  },

  computed: {
    ...mapGetters(["getCategoryList"]),
    getCurrentDate() {
      const today = new Date();
      let d = today.getDate();
      let m = today.getMonth() + 1;
      const y = today.getFullYear();

      if (d < 10) {
        d = "0" + d;
      }
      if (m < 10) {
        m = "0" + m;
      }

      return `${d}.${m}.${y}`;
    },
  },

  created() {
    this.$store.dispatch("fetchCategories").then(() => {
      this.categories = this.getCategoryList;
    });

    if (this.$route.params.type && this.$route.query.value) {
      this.show = true;
      this.type = this.$route.params.type;
      this.amount = this.$route.query.value;
    }

    this.$root.$on("updatePayment", this.updatePayment);
  },
};
</script>
