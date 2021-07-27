<template>
  <div class="home">
    <LineChart />
  </div>
</template>

<script>
import LineChart from "../plugins/Diagram.vue";

export default {
  name: "Home",
  components: {
    LineChart,
  },
};
</script>
