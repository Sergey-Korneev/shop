<template>
    <aside class="filter">
        <h2 class="filter__title">Фильтры</h2>

        <form class="filter__form form" action="#" method="get" @submit.prevent="update">
          <fieldset class="form__block">
            <legend class="form__legend">Цена</legend>
            <label class="form__label form__label--price">
              <input class="form__input" type="text"
              name="min-price" v-model.number="curentPriceMin">
              <span class="form__value">От</span>
            </label>
            <label class="form__label form__label--price">
              <input class="form__input" type="text"
              name="max-price" v-model.number="curentPriceMax">
              <span class="form__value">До</span>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Категория</legend>
            <label class="form__label form__label--select">
              <select class="form__select" type="text"
              name="category" v-model.number="curentCategoriId">
                <option value="0">Все категории</option>
                <option :value="ctegor.id"
                v-for="ctegor in  category" :key="ctegor.id">{{ctegor.title}}</option>
              </select>
            </label>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Цвет</legend>
            <ul class="colors">
              <li class="colors__item" v-for="colorPunct in colorFilt" :key="colorPunct">
                <label class="colors__label">
                  <input class="colors__radio sr-only"
                  type="radio" name="color" :value="colorPunct" checked="" v-model="curentColor">
                  <span class="colors__value" v-bind:style="{background: colorPunct}">
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <fieldset class="form__block">
            <legend class="form__legend">Объемб в ГБ</legend>
            <ul class="check-list">
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                  type="checkbox" name="volume" value="8" checked="">
                  <span class="check-list__desc">
                    8
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="16">
                  <span class="check-list__desc">
                    16
                    <span>(461)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="32">
                  <span class="check-list__desc">
                    32
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only" type="checkbox" name="volume" value="64">
                  <span class="check-list__desc">
                    64
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                  type="checkbox" name="volume" value="128">
                  <span class="check-list__desc">
                    128
                    <span>(313)</span>
                  </span>
                </label>
              </li>
              <li class="check-list__item">
                <label class="check-list__label">
                  <input class="check-list__check sr-only"
                  type="checkbox" name="volume" value="264">
                  <span class="check-list__desc">
                    264
                    <span>(313)</span>
                  </span>
                </label>
              </li>
            </ul>
          </fieldset>

          <button class="filter__submit button button--primery" type="submit">
            Применить
          </button>
          <button class="filter__reset button button--second" type="button" @click.prevent="resets">
            Сбросить
          </button>
        </form>
      </aside>
</template>

<script>
import category from '../data/сategori';

export default {
  props: ['priceMin', 'priceMax', 'categori', 'color'],
  data() {
    return {
      colorFilt: ['#FFBE15', '#73B6EA', '#939393', '#8BE000', '#FF6B00', '#FFF', '#000'],
      curentPriceMin: 0,
      curentPriceMax: 0,
      curentCategoriId: 0,
      curentColor: 0,
    };
  },
  watch: {
    priceMin(val) {
      this.curentPriceMin = val;
    },
    priceMax(val) {
      this.curentPriceMax = val;
    },
    categori(val) {
      this.curentCategoriId = val;
    },
    color(val) {
      this.curentColor = val;
    },
  },
  methods: {
    update() {
      this.$emit('update:priceMin', this.curentPriceMin);
      this.$emit('update:priceMax', this.curentPriceMax);
      this.$emit('update:categori', this.curentCategoriId);
      this.$emit('update:color', this.curentColor);
    },
    resets() {
      this.$emit('update:priceMin', 0);
      this.$emit('update:priceMax', 0);
      this.$emit('update:categori', 0);
      this.$emit('update:color', 0);
    },
  },
  computed: {
    category() {
      return category;
    },
  },
};
</script>
