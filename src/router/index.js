import Vue from 'vue';
import VueRouter from 'vue-router';
import mainPage from '@/pages/mainPage.vue';
import notFound from '@/pages/errorPage.vue';
import cartPage from '@/pages/cartPage.vue';
import productPage from '@/pages/productPage.vue';
import orderPage from '@/pages/orderPage.vue';
import orderInfo from '@/pages/orderInfo.vue';

Vue.use(VueRouter);

const routes = [
  { name: 'main', component: mainPage, path: '/main' },
  { name: 'product', component: productPage, path: '/product/:id' },
  { name: 'cart', component: cartPage, path: '/cart' },
  { name: 'order', component: orderPage, path: '/order' },
  { name: 'orderInfo', component: orderInfo, path: '/order/:id' },
  { name: 'not-found', component: notFound, path: '*' },
];

const router = new VueRouter({
  routes,
});

export default router;
