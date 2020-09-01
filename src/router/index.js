import Vue from 'vue';
import VueRouter from 'vue-router';
import mainPage from '@/pages/mainPage.vue';
import notFound from '@/pages/errorPage.vue';
import cartPage from '@/pages/cartPage.vue';
import productPage from '@/pages/productPage.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: mainPage, path: '/' },
  { name: 'product', component: productPage, path: '/product/:id' },
  { name: 'cart', component: cartPage, path: '/cart' },
  { name: 'not-found', component: notFound, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
