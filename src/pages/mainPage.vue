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
    <div v-if="productsLoadingError">
      <p>
        Ошибка загрузки <button @click="loadProducts()">попробовать снова</button>
      </p>
    </div>
    <div v-if="productsLoading">
      <p>
        Загрузка товаров...
      </p>
    </div>
    <div class="content__catalog">
      <ProductFilter :priceMin.sync="filterPriseMin"
      :priceMax.sync="filterPriseMax" :categori.sync="filterCategoriId" :color.sync="filterColor"/>

    <section class="catalog">
      <ProductList :products = "products"/>
      <BasePagination v-model="page" :allProducts="lengthProducts"
      :pageProducts="productsPerPage"/>
    </section>
    </div>
  </main>
</template>

<script>
import ProductList from '@/components/PorductList.vue';
import BasePagination from '@/components/BasePagination.vue';
import ProductFilter from '@/components/ProductFilter.vue';
import axios from 'axios';

export default {
  components: { ProductList, BasePagination, ProductFilter },
  data() {
    return {
      filterPriseMax: 0,
      filterPriseMin: 0,
      filterCategoriId: 0,
      filterColor: 0,
      page: 1,
      productsPerPage: 3,
      productsData: null,
      productsLoading: false,
      productsLoadingError: false,
    };
  },
  computed: {
    products() {
      return this.productsData ? this.productsData.items.map((prod) => ({
        ...prod,
        img: prod.image.file.url,
      })) : [];
    },
    lengthProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        axios.get('https://vue-study.dev.creonit.ru/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            minPrice: this.filterPriseMin,
            maxPrice: this.filterPriseMax,
            colorId: this.filterColor,
            categoryId: this.filterCategoriId,
          },
        })
          .then((response) => {
            this.productsData = response.data;
          })
          .catch(() => {
            this.productsLoadingError = true;
          })
          .then(() => {
            this.productsLoading = false;
          });
      }, 500);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    productsPerPage() {
      this.loadProducts();
    },
    filterPriseMin() {
      this.loadProducts();
    },
    filterPriseMax() {
      this.loadProducts();
    },
    filterColor() {
      this.loadProducts();
    },
    filterCategoriId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>

<style>
.catalog__pic img {
  background-size: cover;
  object-fit: contain;
}
</style>
