<template>
  <div class="catalog">
    <div class="catalog__head">
      <input
        v-model="search"
        type="text"
        class="catalog__search-input input"
        placeholder="Поиск товара"
        @input="searchProducts"
      >
      <div class="catalog__head-btns">
        <Pagination
          :params="paginationData"
          class="catalog__pagination"
          @setPage="handleCurrentChange"
        />
        <div class="">
          <button
            v-if="isGrid"
            class="btn btn-primary"
            @click="setGrid"
          >
            <iconBtnList />
          </button>
          
          <button
            v-else
            class="btn btn-primary"
            @click="setGrid"
          >
            <iconBtnGrid />
          </button>
        </div>
      </div>
    </div>
    <div class="catalog__body">
      <ProductGrid v-if="isGrid" />
      <ProductList v-else />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
import Pagination from '~/components/Pagination.vue'
import iconBtnGrid from '~/components/icons/iconBtnGrid.vue'
import iconBtnList from '~/components/icons/iconBtnList.vue'

const initPaginationData = () => ({
  page: 1,
  page_size: 10,
  count: 0,
});

export default Vue.extend({
  components: { Pagination, iconBtnGrid, iconBtnList },
  name: 'IndexPage',
  data () {
    return {
      isGrid: false,
      search: '',
      paginationData: initPaginationData(),
    }
  },

  computed: {
    ...mapGetters({
      products: 'Products/products',
      filteredPoducts: 'Products/filteredPoducts'
    })
  },

  methods: {
    ...mapActions({
      setProducts: 'Products/setProducts',
      setFilteredProducts: 'Products/setFilteredProducts',
    }),

    loadProducts() {
      const url = 'https://fakestoreapi.com/products';
      axios.get(url)
        .then(({ data } ) => {
          this.setProducts(data);
          this.paginationData.count = data.length;
          this.filterProducts();
        })
        .catch(error => {
          console.log(error);
        })
    },

    searchProducts() {
      this.filterProducts();
    },

    filterProducts() {
      this.setFilteredProducts({search: this.search, params: this.paginationData});
    },

    setGrid() {
      this.isGrid = !this.isGrid;
    },

    // пагинация смена страницы
    handleCurrentChange(val) {
      this.paginationData.page = val;
      this.filterProducts();
    },
  },

  mounted () {
    this.loadProducts();
  }
})
</script>

<style lang="scss" scoped>
.catalog {
  margin-left: 8px;
  margin-right: 8px;
  @media (min-width: 576px) {
    margin-left: 20px;
    margin-right: 20px;
  }
  &__head {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    &-btns {
      display: flex;
    }
  }
  &__search {
    &-input {
      max-width: 280px;
      width: 100%;
      margin-right: 20px;
    }
  }
  &__pagination {
    margin-right: 20px;
  }
}
</style>
