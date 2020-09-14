import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cartProducts: [],
    userAccessKey: null,
    cartProductData: [],
  },
  mutations: {
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
      state.cartProductData = item;
    },
    syncCartParams(state) {
      state.cartProducts = state.cartProductData.map((item) => ({
        prodId: item.product.id,
        amount: item.quantity,
      }));
    },
  },
  getters: {
    productDtalParams(state) {
      return state.cartProducts.map((index) => {
        const product = state.cartProductData.find((p) => p.product.id === index.prodId);
        return {
          ...index,
          prod: product.product,
          img: product.product.image.file.url,
        };
      });
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
          context.commit('syncCartParams');
        });
    },
    addProductToCart(context, { productId, amount }) {
      return axios.post('http://vue-study.dev.creonit.ru/api/baskets/products', {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
      })
        .then((dataLoad) => {
          context.commit('uppdateCartProduct', dataLoad.data.items);
          context.commit('syncCartParams');
        });
    },
    uppdateCartAmount(context, { productId, amount }) {
      context.commit('cartProductAmount', { prodId: productId, amount });

      return axios.put('http://vue-study.dev.creonit.ru/api/baskets/products', {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
      })
        .then((dataLoad) => {
          context.commit('uppdateCartProduct', dataLoad.data.items);
        })
        .catch(() => {
          context.commit('syncCartParams');
        });
    },

    uppdateCartAmountAdd(context, { productId, amount }) {
      context.commit('cartProductAmountAdd', productId);

      return axios.put('http://vue-study.dev.creonit.ru/api/baskets/products', {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
      })
        .then((dataLoad) => {
          context.commit('uppdateCartProduct', dataLoad.data.items);
        })
        .catch(() => {
          context.commit('syncCartParams');
        });
    },

    uppdateCartAmountSubtract(context, { productId, amount }) {
      context.commit('cartProductAmountSubtract', productId);

      return axios.put('http://vue-study.dev.creonit.ru/api/baskets/products', {
        productId,
        quantity: amount,
      }, {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
      })
        .then((dataLoad) => {
          context.commit('uppdateCartProduct', dataLoad.data.items);
        })
        .catch(() => {
          context.commit('syncCartParams');
        });
    },

    deleteCartProduct(context, prodId) {
      context.commit('cartProductRemove', prodId);
      console.log(prodId);

      return axios.delete('http://vue-study.dev.creonit.ru/api/baskets/products', {
        params: {
          userAccessKey: this.state.userAccessKey,
        },
        productId: prodId,
      })
        .then((dataLoad) => {
          context.commit('uppdateCartProduct', dataLoad.data.items);
        });
    },
  },
});
