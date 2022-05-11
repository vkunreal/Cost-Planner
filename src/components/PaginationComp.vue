<template>
  <div class="pagination">
    <div class="btns-container">
      <p @click="prevPage" class="text-h4">&#8249;</p>
      <p
        v-for="(number, index) in pageCount"
        :key="number"
        :class="{ active: index === 0 }"
        :index="index"
        @click="clickNumber($event)"
      >
        {{ number }}
      </p>
      <p @click="nextPage" class="text-h4">&#8250;</p>
    </div>

    <div v-show="false">{{ paginatedData }}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "Pagination",

  data: () => ({
    pageNumber: 0,
    size: 10,
  }),

  methods: {
    calcPaymentsList() {
      const start = (this.pageNumber - 1) * this.size;
      const end = start + this.size;
      const payments = this.getPaymentsList.slice(start, end);

      return payments;
    },

    changePage(oper) {
      let index = this.$el.querySelector(".active").getAttribute("index");
      this.$el.querySelector(".active").removeAttribute("class");

      if (oper === "next") {
        this.pageNumber++;
        this.setPageNumber(this.pageNumber);
        index++;
      } else {
        this.pageNumber--;
        this.setPageNumber(this.pageNumber);
        index--;
      }

      this.$el
        .querySelector(`p[index='${index}']`)
        .setAttribute("class", "active");

      const payments = this.calcPaymentsList();
      this.setPagePayments(payments);
      this.$root.$emit("updateData");
    },

    nextPage() {
      if (this.pageNumber + 1 === this.pageCount) return;
      else this.changePage("next");
    },

    prevPage() {
      if (this.pageNumber === 0) return;
      else this.changePage("prev");
    },

    clickNumber(e) {
      this.$el.querySelector(".active").removeAttribute("class");
      e.target.setAttribute("class", "active");

      this.pageNumber = Number(e.target.innerText - 1);

      this.setPageNumber(this.pageNumber);

      const payments = this.calcPaymentsList();

      this.setPagePayments(payments);
      this.$root.$emit("updateData");
    },

    ...mapMutations(["setPagePayments", "setPageNumber"]),
  },

  computed: {
    pageCount() {
      const length = this.getPaymentsList.length;

      return Math.ceil(length / this.size);
    },

    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      const payments = this.getPaymentsList.slice(start, end);

      this.setPagePayments(payments);

      return payments.length;
    },

    ...mapGetters(["getPaymentsList", "getPageNumber"]),
  },

  created() {
    this.pageNumber = this.getPageNumber;
  },

  mounted() {
    this.$root.$on("updatePayments", () => {
      this.$el
        .querySelector(`p[index='${this.pageNumber - 1}'`)
        .setAttribute("class", "active");
      this.pageNumber--;
      this.$store.commit("setPageNumber", this.pageNumber);
    });
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/pagination.scss";
</style>
