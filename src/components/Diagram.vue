<template>
  <div>
    <chart :data="points"></chart>
    <button @click="clickFunc">Click</button>
  </div>
</template>

<script>
import Chart from "./Chart";

export default {
  name: "Diagram",
  components: {
    chart: Chart,
  },
  data() {
    return {
      intervalId: null,
      points: [],
    };
  },

  methods: {
    clickFunc() {
      const payments = this.$store.getters.getPaymentsList;

      let result = {};

      for (let i = 0; i < payments.length; i++) {
        if (Object.prototype.hasOwnProperty.call(result, payments[i].type)) {
          result[payments[i].type] += payments[i].amount;
        } else {
          result[payments[i].type] = payments[i].amount;
        }
      }

      result = Object.entries(result).map((entry) => ({
        name: entry[0],
        y: entry[1],
      }));

      this.points = result;
    },
  },

  mounted() {
    const payments = this.$store.getters.getPaymentsList;

    let result = {};

    for (let i = 0; i < payments.length; i++) {
      if (Object.prototype.hasOwnProperty.call(result, payments[i].type)) {
        result[payments[i].type] += payments[i].amount;
      } else {
        result[payments[i].type] = payments[i].amount;
      }
    }

    result = Object.entries(result).map((entry) => ({
      name: entry[0],
      y: entry[1],
    }));

    this.points = result;
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  margin-top: 60px;
  width: 70%;
}
</style>
