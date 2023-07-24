<template>
  <div class="catalog__list">
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
  name: 'ProductList',

  computed: {
    ...mapGetters({
      products: 'Products/filteredPoducts',
    }),
  },
};
</script>

<style lang="scss" scoped>
.catalog {
  &__list {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
    box-shadow: 0px 5px 7px -2px $border-color;
    border-radius: 18px;
    background-color: $background-item;
    padding: 32px 18px;
      @media (min-width: 748px) {
        flex-direction: row;
      }
      @media (min-width: 1200px) {
        flex-direction: row;
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
    margin-right: 18px;
    margin-left: 18px;
    text-align: center;
    @media (min-width: 748px) {
      text-align: left;
    }
  }
}
</style>