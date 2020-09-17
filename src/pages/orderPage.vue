<template>
     <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        3 товара
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST" @submit.prevent="createOrder">
        <div class="cart__field">
          <div class="cart__data">
            <formOrderText title="ФИО" :error="formError.name" type="text" name="name"
            placeholder="Введите ваше имя" v-model="formData.name"/>

            <formOrderText title="Адрес доставки" :error="formError.address" type="text"
            name="address" placeholder="Введите ваш адрес" v-model="formData.address"/>

            <formOrderText title="Телефон" :error="formError.phone" type="tel"
            name="phone" placeholder="Введите ваш телефон" v-model="formData.phone"/>

            <formOrderText title="Email" :error="formError.email" type="email"
            name="email" placeholder="Введи ваш Email" v-model="formData.email"/>

            <fromOrder title="Комментарий к заказу" :error="formError.comment">
                <textarea class="form__input form__input--area" v-model="formData.comment"
                name="comment" placeholder="Ваши пожелания"></textarea>
            </fromOrder>
          </div>

          <div class="cart__options">
            <h3 class="cart__title">Доставка</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only"
                  type="radio" name="delivery" value="0" checked="">
                  <span class="options__value">
                    Самовывоз <b>бесплатно</b>
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="delivery" value="500">
                  <span class="options__value">
                    Курьером <b>500 ₽</b>
                  </span>
                </label>
              </li>
            </ul>

            <h3 class="cart__title">Оплата</h3>
            <ul class="cart__options options">
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="card">
                  <span class="options__value">
                    Картой при получении
                  </span>
                </label>
              </li>
              <li class="options__item">
                <label class="options__label">
                  <input class="options__radio sr-only" type="radio" name="pay" value="cash">
                  <span class="options__value">
                    Наличными при получении
                  </span>
                </label>
              </li>
            </ul>
          </div>
        </div>

        <div class="cart__block">
          <ul class="cart__orders">
              <cartOrder v-for="product in products" :key="product.prodId" :product="product"/>
          </ul>

          <div class="cart__total">
            <p>Доставка: <b>500 ₽</b></p>
            <p>Итого: <b>{{ lenghtProdtucts }}</b> товара на сумму
            <b>{{ totol | numberFilter }} ₽</b></p>
          </div>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
        <div class="cart__error form__error-block">
          <h4>Заявка не отправлена!</h4>
          <p>
            Похоже произошла ошибка. Попробуйте отправить снова или перезагрузите страницу.
          </p>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
import cartOrder from '@/components/cartOrder.vue';
import numberFilter from '@/hellpers/numberFilter';
import fromOrder from '@/components/formOrder.vue';
import formOrderText from '@/components/formOrderText.vue';

export default {
  data() {
    return {
      formData: {},
      formError: {},
    };
  },
  components: { cartOrder, fromOrder, formOrderText },
  methods: {
    createOrder() {
      axios.post('http://vue-study.dev.creonit.ru/api/orders', {
        ...this.formData,
      }, {
        params: {
          userAccessKey: this.$store.state.userAccessKey,
        },
      })
        .then((response) => {
          this.$store.commit('order');
          this.formData = {};
          this.$store.commit('updateOrderInfo', response.data);
          this.$router.push({ name: 'orderInfo', params: { id: response.data.id } });
        })
        .catch((error) => {
          this.formError = error.response.data.error.request;
        });
    },
  },
  computed: {
    ...mapGetters({ products: 'productDtalParams', totol: 'allProductSum' }),
    lenghtProdtucts() {
      return this.products.length;
    },
  },
  filters: {
    numberFilter,
  },
};
</script>
