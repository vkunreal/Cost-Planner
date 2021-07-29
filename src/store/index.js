import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    paymentList: [],
    categoryList: [],
    pagePayments: [],
    page: 0,
    size: 10,
    loading: true,
  },
  mutations: {
    setPaymentListData(state, payload) {
      state.paymentList = payload;
    },

    setCategoriesListData(state, payload) {
      state.categoryList = payload;
    },

    setPagePayments(state, payload) {
      state.pagePayments = payload;
    },

    setPageNumber(state, payload) {
      state.page = payload;
    },

    changeLoadingStatus(state) {
      state.loading = false;
    },

    addDataToPaymentList(state, payload) {
      state.paymentList.push(payload);
      state.pagePayments.push(payload);
    },

    removePayment(state, payload) {
      state.paymentList.splice(payload, 1);
      state.pagePayments.splice(payload, 1);
    },

    changePayment(state, payload) {
      state.pagePayments[payload.ind].amount = payload.amount;
      state.pagePayments[payload.ind].type = payload.type;
      state.pagePayments[payload.ind].date = payload.date;
    },
  },
  actions: {
    fetchData({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([
            {
              date: "28.03.2020",
              type: "Food",
              amount: 169,
            },
            {
              date: "24.03.2020",
              type: "Transport",
              amount: 360,
            },
            {
              date: "24.03.2020",
              type: "Food",
              amount: 170,
            },
            {
              date: "17.05.2021",
              type: "Education",
              amount: 320,
            },
            {
              date: "03.06.2021",
              type: "Sport",
              amount: 250,
            },
            {
              date: "05.06.2021",
              type: "Food",
              amount: 120,
            },
            {
              date: "08.06.2021",
              type: "Education",
              amount: 410,
            },
            {
              date: "14.06.2021",
              type: "Car",
              amount: 2500,
            },
            {
              date: "17.06.2021",
              type: "Transport",
              amount: 15,
            },
            {
              date: "25.06.2021",
              type: "Food",
              amount: 114,
            },
            {
              date: "26.06.2021",
              type: "Car",
              amount: 35,
            },
            {
              date: "28.06.2021",
              type: "Education",
              amount: 220,
            },
            {
              date: "02.07.2021",
              type: "Car",
              amount: 350,
            },
            {
              date: "03.07.2021",
              type: "Food",
              amount: 75,
            },
            {
              date: "06.07.2021",
              type: "Transport",
              amount: 7,
            },
          ]);
        }, 500);
      }).then((res) => {
        commit("setPaymentListData", res);
      });
    },
    fetchCategories({ commit }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(["Sport", "Food", "Education", "Transport", "Car"]);
        }, 500);
      }).then((res) => {
        commit("setCategoriesListData", res);
      });
    },
  },
  getters: {
    getPaymentsList: (state) => state.paymentList,

    getCategoryList: (state) => state.categoryList,

    getFullPaymentsAmount: (state) =>
      state.paymentList.reduce((res, cur) => res + cur.amount, 0),

    getLoadingStatus: (state) => state.loading,

    getPagePayments: (state) => state.pagePayments,

    getPageNumber: (state) => state.page,

    getSize: (state) => state.size,
  },
});
