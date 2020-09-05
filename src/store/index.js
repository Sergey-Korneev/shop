import Vue from 'vue';
import Vuex from 'vuex';
import products from '@/data/products';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [
      { prodId: 2, amount: 3 },
    ],
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
});
