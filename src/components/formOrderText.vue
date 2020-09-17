<template>
    <fromOrder :title="title" :error="error">
        <input class="form__input" v-model="textInput" :type="type" :name="name"
        :placeholder="placeholder">
    </fromOrder>
</template>

<script>
import fromOrder from '@/components/formOrder.vue';

export default {
  props: ['title', 'error', 'type', 'name', 'placeholder', 'value'],
  components: { fromOrder },
  computed: {
    textInput: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      },
    },
  },
};
</script>
