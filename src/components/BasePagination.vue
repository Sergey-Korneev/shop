<template>
    <ul class="catalog__pagination pagination">
      <li class="pagination__item" @click="pagenate(backPage())">
        <a
          class="pagination__link pagination__link--arrow"
          aria-label="Предыдущая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-left" />
          </svg>
        </a>
      </li>
      <li class="pagination__item" v-for="pageNaw in allPage" :key="pageNaw">
       <a href="#" class="pagination__link" @click="pagenate(pageNaw)">
           {{pageNaw}}
        </a>
      </li>
      <li class="pagination__item" @click="pagenate(nextPage())">
        <a
          class="pagination__link pagination__link--arrow"
          aria-label="Следующая страница"
        >
          <svg width="8" height="14" fill="currentColor">
            <use xlink:href="#icon-arrow-right" />
          </svg>
        </a>
      </li>
    </ul>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'pagenate',
  },
  props: ['page', 'allProducts', 'pageProducts'],
  computed: {
    allPage() {
      return Math.ceil(this.allProducts / this.pageProducts);
    },
  },
  methods: {
    pagenate(page) {
      this.$emit('pagenate', page);
    },
    nextPage() {
      return this.page + 1;
    },
    backPage() {
      return this.page - 1;
    },
  },
};
</script>

// :class="{'pagination__link--current')"
