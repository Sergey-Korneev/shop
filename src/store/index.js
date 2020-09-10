import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { prodId: 2, amount: 3 },
    ],
    userAccessKey: null,
    cartProductData: [],
  },
  mutations: {
    addProductToCart(state, { prodId, amount }) {
      const product = state.cartProducts.find((prod) => prod.prodId === prodId);
      if (product) {
        product.amount += amount;
      } else {
        state.cartProducts.push({
          prodId,
          amount,
        });
      }
    },
    cartProductAmount(state, { prodId, amount }) {
      const product = state.cartProducts.find((prod) => prod.prodId === prodId);

      if (product) {
        product.amount = amount;
      }
    },
    cartProductAmountAdd(state, prodId) {
      const product = state.cartProducts.find((prod) => prod.prodId === prodId);

      if (product) {
        product.amount += 1;
      }
    },
    cartProductAmountSubtract(state, prodId) {
      const product = state.cartProducts.find((prod) => prod.prodId === prodId);

      if (product.amount > 1) {
        product.amount -= 1;
      }
    },
    cartProductRemove(state, prodId) {
      state.cartProducts = state.cartProducts.filter((item) => item.prodId !== prodId);
    },
    uppdateUserAccessKey(state, accessKey) {
      state.userAccessKey = accessKey;
    },
    uppdateCartProduct(state, item) {
      state.cartProducts = item;
    },
  },
  getters: {
    productDtalParams(state) {
      return state.cartProducts.map((index) => ({
        ...index,
        prod: products.find((p) => p.id === index.prodId),
      }));
    },
    allProductSum(state, getters) {
      return getters.productDtalParams.reduce(
        (sum, item) => (item.prod.price * item.amount) + sum, 0,
      );
    },
  },
  actions: {
    loadCart(context) {
      axios.get('http://vue-study.dev.creonit.ru/api/baskets', {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
      })
        .then((dataLoad) => {
          if (!this.state.userAccessKey) {
            localStorage.setItem('userAccessKey', dataLoad.data.user.accessKey);
            context.commit('uppdateUserAccessKey', dataLoad.data.user.accessKey);
          }
          context.commit('uppdateCartProduct', dataLoad.data.items);
        });
    },
  },
});
