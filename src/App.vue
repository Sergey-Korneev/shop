<template>
    <main class="content container">
    <div class="content__top content__top--catalog">
      <h1 class="content__title">
        Каталог
      </h1>
      <span class="content__info">
        {{lengthProducts}} товара
      </span>
    </div>

    <div class="content__catalog">
      <ProductFilter :priceMin.sync="filterPriseMin"
      :priceMax.sync="filterPriseMax" :categori.sync="filterCategoriId" :color.sync="filterColor"/>
    <section class="catalog">
      <ProductList :products = "products"/>
      <BasePagination v-model="page" @pages="page" :allProducts="lengthProducts"
      :pageProducts="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
import products from './data/products';
import ProductList from './components/PorductList.vue';
import BasePagination from './components/BasePagination.vue';
import ProductFilter from './components/ProductFilter.vue';

export default {
  name: 'App',
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriseMax: 0,
      filterPriseMin: 0,
      filterCategoriId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
    };
  },
  computed: {
    filterProducts() {
      let filterProducts = products;
      if (this.filterPriseMin > 0) {
        filterProducts = filterProducts.filter((product) => product.price > this.filterPriseMin);
      }
      if (this.filterPriseMax > 0) {
        filterProducts = filterProducts.filter((product) => product.price < this.filterPriseMax);
      }
      if (this.filterCategoriId !== 0) {
        filterProducts = (
          filterProducts.filter((product) => product.сategoriId === this.filterCategoriId));
      }
      if (this.filterColor !== 0) {
        filterProducts = filterProducts.filter((colors) => colors.color.includes(this.filterColor));
      }
      return filterProducts;
    },
    products() {
      const start = (this.page - 1) * this.productsPerPage;
      return this.filterProducts.slice(start, start + this.productsPerPage);
    },
    lengthProducts() {
      return this.filterProducts.length;
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
