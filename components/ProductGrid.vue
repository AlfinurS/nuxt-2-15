<template>
  <div class="catalog__grid">
    <div
      v-for="product in products"
      :key="product.id"
      class="catalog__item"
    >
      <nuxt-link
        class="catalog__image-wrapper"
        :to="`/product/${product.id}`"
      >
        <div class="catalog__image-wrap">
          <img
            class="catalog__image"
            :src="product.image"
            :alt="product.title"
          >
        </div>
      </nuxt-link>
      <p class="catalog__title">
        {{ product.title }}
      </p>
      <p class="catalog__price">
        {{ product.price }} $
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ProductGrid',

  computed: {
    ...mapGetters({
      products: 'Products/filteredPoducts',
    }),
  },
};
</script>

<style lang="scss" scoped>

.catalog {
  &__grid {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    align-items: center;
    margin-top: 20px;
      @media (min-width: 748px) {
      grid-template-columns: 1fr 1fr;
      gap: 18px; 
    }
      @media (min-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
  }
  &__item {
    display: grid;
    grid-template-rows: 100px;
    justify-items: center;
    justify-content: center;
    max-width: 300px;
    margin-bottom: 20px;
    width: 100%;
    box-shadow: 1px 5px 7px -2px $border-color;
    border-radius: 18px;
    background-color: $background-item;
    padding: 32px 18px;
      @media (min-width: 838px) {
        max-width: 340px;
    }
      @media (min-width: 1320px) {
        max-width: 380px;
    }
  }
  &__image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-position: center;
    object-fit: cover;
    &-wrapper {
      width: 60px;
    }
    &-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-bottom: 116%;
    }
  }
  &__title {
    text-align: center;
  }
}
</style>
