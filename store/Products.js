import { filterByPagination } from "@/utils/filter"
import { deepCompareObject } from "@/utils/deepCompareObject"

export const actions = {
  setProducts({ commit }, products) {
    commit('SET_PRODUCTS', products);
  },

  setFilteredProducts({ commit }, filterParams) {
    commit('SET_FILTERED_PRODUCTS', filterParams);
  },
};

export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = JSON.parse(JSON.stringify(products));
  },

  SET_FILTERED_PRODUCTS(state, {search, params}) {
    if (search !== '') {
      const filtered = state.products.filter(
        (product) => {
          return deepCompareObject(product, search);
        },
      );
      params.count = filtered.length;
      state.filteredPoducts = JSON.parse(JSON.stringify(filterByPagination(filtered, params)));
    } else {
      state.filteredPoducts = JSON.parse(JSON.stringify(filterByPagination(state.products, params)));
    }
  },
};

export const getters = {
  products: (state) => state.products,
  filteredPoducts: (state) => state.filteredPoducts,
};

export const state = () => ({
  products: [],
  filteredPoducts: [],
});
