<template>
    <li class="catalog__item">
        <router-link class="catalog__pic" :to="{name: 'product', params: {id: products.id}}">
            <img :src="products.img" :alt="products.name" />
        </router-link>

        <h3 class="catalog__title">
            <a href="#">{{products.name}}</a>
        </h3>

        <span class="catalog__price">{{products.price | numberFilter}} ₽</span>

        <ul class="colors colors--black">
            <li class="colors__item" v-for="colorPunct in colors" :key="colorPunct.id">
            <label class="colors__label">
                <input class="colors__radio sr-only"
                type="radio" :value="colorPunct.id" v-model="color">
                <span class="colors__value" :style="{background: colorPunct.code}"></span>
            </label>
            </li>
        </ul>
    </li>
</template>

<script>
import numberFilter from '../hellpers/numberFilter';

export default {
  props: ['products'],
  data() {
    return {
      color: this.products.colors.id,
    };
  },
  filters: {
    numberFilter,
  },
  computed: {
    colors() {
      return this.products.colors;
    },
  },
};
</script>
