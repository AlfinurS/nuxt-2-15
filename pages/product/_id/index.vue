<template>
  <div class="goods">
    <div class="goods__box">
      <nuxt-link
        class="goods__nav"
        :to="`/`"
      >
        <div class="btn btn-primary">
          Каталог
        </div>
      </nuxt-link>

      <div
        v-if="currentProduct"
        class="goods__item"
      >
        <div
          href="#"
          class="goods__image-wrapper"
        >
          <div class="goods__image-wrap">
            <img
              class="goods__image"
              :src="currentProduct.image"
              :alt="currentProduct.title"
            >
          </div>
        </div>
        
        <ul class="goods__content">
          <li class="goods__content-item">
            <div class="goods__title">
              <span class="">Product name</span>
            </div>
            <div class="goods__text">
              {{ currentProduct.title }}
            </div>
          </li>
      
          <li class="goods__content-item">
            <div class="goods__title">
              <span class="">Product rating</span>
            </div>
            <div class="goods__text goods__text-accent">
              <span class="goods__text">Rating</span>
              {{ currentProduct.rating.rate }}
              <span class="goods__text">out of 5</span>
            </div>
          </li>

          <li class="goods__content-item">
            <div class="goods__title">
              <span class="">Product description</span>
            </div>
            <div class="goods__text">
              {{ currentProduct.description }}
            </div>
          </li>

          <li class="goods__content-item">
            <div class="goods__title">
              <span class="">Product price</span>
            </div>
            <div class="goods__text goods__text-accent">
              {{ currentProduct.price }} $
            </div>
          </li>
        </ul>
      </div>

      <div v-else>
        Нет данных
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapActions, mapGetters } from 'vuex'
import axios from 'axios'

export default Vue.extend({
  name: 'ProductComponent',

  data() {
    return {
      productId: this.$route.params.id,
    };
  },

  computed: {
    ...mapGetters({
      products: 'Products/products',
    }),

    id() {
      return this.$route.params.id;
    },

    currentProduct() {
      const productFind = this.products.find(
        (product) => product.id === +this.productId
      );
      if (productFind) {
        return productFind;
      }
      return null;
    },
  },

  methods: {
    ...mapActions({
      setProducts: 'Products/setProducts',
    }),

    loadProducts() {
      const url = 'https://fakestoreapi.com/products';
      axios.get(url)
        .then(({ data }) => {
          this.setProducts(data);
        })
        .catch(error => {
          console.log(error);
        })
    },
  },

  mounted () {
    if (this.products.length === 0) {
      this.loadProducts();
    }
  }
})
</script>

<style lang="scss" scoped>
.goods {
  margin-left: 20px;
  margin-right: 20px;
  &__box {
    margin-top: 40px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 30px;
    margin-bottom: 40px;
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
      width: 160px;
    }
    &-wrap {
      position: relative;
      overflow: hidden;
      width: 100%;
      padding-bottom: 116%;
    }
  }
  &__title {
    font-size: 14px;
    font-weight: 600;
    color: $disabled-text;
    text-align: left;
    margin-top: 12px;
    margin-bottom: 8px;
  }
  &__text {
    font-size: 14px;
    font-weight: 400;
    color: $color-text;
    text-align: left;
    &-accent {
      color: $el-color-red;
      font-size: 16px;
      font-weight: 600;
    }
  }
  &__content {
    padding: 0;
    @media (min-width: 730px) {
    width: 100%;
    max-width: 666px;
    padding-left: 16px;
    padding-right: 16px;
    box-sizing: border-box;
    }
    &-item {
      margin-bottom: 16px;
    }
  }
  &__nav {
    display: flex;
    justify-content: flex-end;
  }
}
</style>