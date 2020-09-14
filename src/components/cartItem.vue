<template>
    <li class="cart__item product">
              <div class="product__pic">
                <img :src="index.img" width="120" height="120" :alt="index.name">
              </div>
              <h3 class="product__title">
                {{index.prod.name}}
              </h3>
              <p class="product__info">
                Объем: <span>128GB</span>
              </p>
              <span class="product__code">
                Артикул: {{index.prod.id}}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар" @click="subtract">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="amount" name="count">

                <button type="button" aria-label="Добавить один товар" @click="add">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ (index.prod.price * index.amount) | fomatNum}} ₽
              </b>

              <button @click="remove" class="product__del button-del"
              type="button" aria-label="Удалить товар из корзины">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template>

<script>
import fomatNum from '@/hellpers/numberFilter';

export default {
  props: ['index'],
  filters: { fomatNum },
  computed: {
    amount: {
      get() {
        return this.index.amount;
      },
      set(value) {
        this.$store.dispatch('uppdateCartAmount', { productId: this.index.prod.id, amount: value });
      },
    },
  },
  methods: {
    add() {
      let amountAdd = this.index.amount;
      amountAdd += 1;
      this.$store.dispatch('uppdateCartAmountAdd', { productId: this.index.prod.id, amount: amountAdd });
    },
    subtract() {
      let amountSubtract = this.index.amount;
      if (amountSubtract > 1) {
        amountSubtract -= 1;
        this.$store.dispatch('uppdateCartAmountSubtract', { productId: this.index.prod.id, amount: amountSubtract });
      }
    },
    remove() {
      this.$store.dispatch('deleteCartProduct', this.index.prod.id);
    },
  },
};
</script>
