<template>
   <component :is="currentPageComponents"/>
</template>

<script>
import mainPage from './pages/mainPage.vue';
import productPage from './pages/productPage.vue';
import errorPage from './pages/errorPage.vue';

const rout = {
  main: 'mainPage',
  product: 'productPage',
};

export default {
  name: 'App',
  components: { mainPage, productPage, errorPage },
  data() {
    return {
      pageNaw: 'main',
      pageNawParams: {},
    };
  },
  methods: {
    goToPage(pageName, pageParams) {
      this.pageNaw = pageName;
      this.pageNawParams = pageParams || {};
    },
  },
  computed: {
    currentPageComponents() {
      return rout[this.pageNaw] || 'errorPage';
    },
  },
};
</script>
