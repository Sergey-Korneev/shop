<template>
    <li class="catalog__item">
        <a class="catalog__pic" href="#">
            <img :src="products.img" :alt="products.name" />
        </a>

        <h3 class="catalog__title">
            <a href="#">{{products.name}}</a>
        </h3>

        <span class="catalog__price">{{products.price}} ₽</span>

        <ul class="colors colors--black">
            <li class="colors__item">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" value="#73B6EA" v-model="color">
                <span class="colors__value" style="background-color: #73B6EA;"></span>
            </label>
            </li>
            <li class="colors__item">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" value="#8BE000" v-model="color">
                <span class="colors__value" style="background-color: #8BE000;"></span>
            </label>
            </li>
            <li class="colors__item">
            <label class="colors__label">
                <input class="colors__radio sr-only" type="radio" value="#222" v-model="color">
                <span class="colors__value" style="background-color: #222;"></span>
            </label>
            </li>
        </ul>
    </li>
</template>

<script>
export default {
  props: ['products'],
  data() {
    return {
      color: '#73B6EA',
    };
  },
};
</script>
