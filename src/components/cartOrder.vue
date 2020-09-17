<template>
    <li class="cart__order">
        <h3>{{ product.prod.title }}</h3>
        <b> {{ product.prod.price | numberFilter }} ₽</b>
        <span>Артикул: {{ product.prod.id }}</span>
    </li>
</template>

<script>
import numberFilter from '@/hellpers/numberFilter';

export default {
  props: ['product'],
  filters: {
    numberFilter,
  },
};
</script>
