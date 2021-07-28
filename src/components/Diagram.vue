<template>
  <chart :data="points"></chart>
</template>

<script>
import Chart from "./Chart.vue";

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
  beforeDestroy() {
    clearInterval(this.intervalId);
  },
  mounted() {
    // this.intervalId = setInterval(() => {
    //   this.points2 = [
    //     {
    //       name: "test2",
    //       y: parseFloat((Math.random() * 100.0).toFixed(2)),
    //     },
    //   ];
    // }, 2000);
    const payments = this.$store.getters.getPaymentsList;
    for (let i = 0; i < payments.length; i++) {
      this.points.push({
        name: payments.type,
        y: parseFloat(Math.random() * 100).toFixed(2),
      });
    }
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
