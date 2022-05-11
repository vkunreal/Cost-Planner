<template>
  <highcharts :options="chartOptions" :updateArgs="updateArgs"></highcharts>
</template>

<script>
export default {
  props: ["data", "title"],
  data() {
    return {
      chartOptions: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },

        exporting: {
          enabled: false,
        },

        credits: {
          enabled: false,
        },
        title: {
          text: "Your payments",
        },

        series: [
          {
            data: [
              {
                name: "Sport",
                y: 0,
              },
              {
                name: "Food",
                y: 0,
              },
              {
                name: "Education",
                y: 0,
              },
              {
                name: "Transport",
                y: 0,
              },
              {
                name: "Car",
                y: 0,
              },
            ],
          },
        ],
      },
      updateArgs: [true, true, { duration: 1000 }],
      types: [],
    };
  },
  watch: {
    data() {
      this.chartOptions.series[0].data = this.data;
    },
  },
  mounted() {
    this.$root.$on("Diagram", () => {
      this.$store.getters.getPaymentsList.forEach((elem) => {
        if (this.types.includes(elem.type)) return;
        else this.types.push(elem.type);
      });
    });
  },
};
</script>
