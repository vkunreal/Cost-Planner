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
        title: {
          text: "Your payments",
        },
        series: [
          {
            data: [
              {
                name: "Sport",
                y: 29.9,
              },
              {
                name: "Food",
                y: 29.9,
              },
              {
                name: "Education",
                y: 159.94,
              },
              {
                name: "Transport",
                y: 19.94,
              },
              {
                name: "Car",
                y: 49.94,
              },
            ],
          },
        ],
      },
      updateArgs: [true, true, { duration: 1000 }],
    };
  },
  watch: {
    title(newValue) {
      this.chartOptions.title.text = newValue;
    },
    data(newValue) {
      console.log("pie watch fired", newValue);
      for (let obj of newValue) {
        let x = this.$children[0].chart.series[0].data.findIndex(
          (s) => s.name == obj.name
        );
        if (x != -1) {
          console.log("pair found", obj, obj.y);
          this.$children[0].chart.series[0].data[x].update(obj.y);
        } else {
          //New key value pair
        }
      }
    },
  },
  mounted() {
    if (typeof this.title !== "undefined") {
      this.chartOptions.title.text = this.title;
    }
  },
};
</script>
