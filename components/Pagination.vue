<template>
  <div class="pagination">
    <div
      class="pagination__item"
      @click="prevPage"
    >
      &#171;
    </div>
    <div
      v-for="page in pagesCounter"
      :key="page"
      class="pagination__item"
      :class="{'pagination__item--active': page === params.page}"
      @click="setPage(page)"
    >
      {{ page }}
    </div>
    <div 
      class="pagination__item"
      @click="nextPage"
    >
      &#187;
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: 'Pagination',
  props: {
    params: {
      type: Object,
      default: () => ({
        page: 1,
        page_size: 50,
        count: 0,
      }),
    },
  },

  computed: {
    // общее количество страниц
    pagesCounter() {
      if (this.params.count === 0) return 1;
      return Math.ceil(this.params.count / this.params.page_size);
     
    }
  },

  methods: {
    setPage(page) {
      this.$emit("setPage", page);
    },

    prevPage() {
      if (this.params.page - 1 < 1) return;
      this.setPage(this.params.page - 1);
    },
    
    nextPage() {
      if (this.params.page + 1 > this.pagesCounter) return;
      this.setPage(this.params.page + 1);
    },
  },
})
</script>

<style lang="scss" scoped>
.pagination {
    display: flex;
  &__item {
    cursor: pointer;
    min-width: 28px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $color-primary;
    color: white;
    border: $border-color;
    border-radius: 6px;
    margin-left: 2px;
    margin-right: 2px;
    max-height: 32px;
    &:hover {
      background-color: $color-primary-hover;
    }
    &--active {
      background-color: $color-primary-hover;
    }
  }
}
</style>