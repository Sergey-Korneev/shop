<template>
  <section class="catalog">
    <ProductList :products = "products"/>
    <BasePagination v-model="page" :allProducts="lengthProducts"
    :pageProducts="productsPerPage"/>
  </section>
</template>

<script>
import products from './data/products';
import ProductList from './components/PorductList.vue';
import BasePagination from './components/BasePagination.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination },
  data() {
    return {
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    products() {
      const start = (this.page - 1) * this.productsPerPage;
      return products.slice(start, start + this.productsPerPage);
    },
    lengthProducts() {
      return products.length;
    },
  },
};
</script>

<style>
.catalog__pic img {
  background-size: cover;
  object-fit: contain;
}
</style>
