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
    addProductToCart(state, component) {
      const product = state.cartProducts.find((prod) => prod.prodId === component.prodId);
      if (product) {
        product.amount += component.amount;
      } else {
        state.cartProducts.push({
          prodId: component.prodId,
          amount: component.amount,
        });
      }
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
            (sum, item) => sum + (item.product.price * item.amount), 0);
    }
  },
});
