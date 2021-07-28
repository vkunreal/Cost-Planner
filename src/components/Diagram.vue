<template>
  <div>
    <chart :data="points"></chart>
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
    updateDiagram() {
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
    this.$root.$on("updateDiagram", () => {
      this.updateDiagram();
    });
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
