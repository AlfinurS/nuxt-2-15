<template>
  <div class="catalog">
    <div class="catalog__head">
      <input
        v-model="search"
        type="text"
        class="catalog__search-input input"
        placeholder="Поиск комментариев"
        @input="searchProducts"
      >
      <div class="catalog__head-btns">
        <Pagination
          :params="paginationData"
          class="catalog__pagination"
          @setPage="handleCurrentChange"
        />
      </div>
    </div>
    <div class="catalog__body">
      <table
        v-for="comment in filteredComments"
        :key="comment.id"
        class="table"
      >
        <tr>
          <td>{{ comment.id }}</td>
        </tr>
        <tr>
          <td>{{ comment.name }}</td>
        </tr>
        <tr>
          <td>{{ comment.email }}</td> 
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import Pagination from '~/components/Pagination.vue'

const initPaginationData = () => ({
  page: 1,
  page_size: 50,
  count: 0,
});


export default Vue.extend({
  components: { Pagination },
  name: 'IndexPage',
  data () {
    return {
      search: '',
      paginationData: initPaginationData(),
      comments: [],
      apiUrl:'https://jsonplaceholder.typicode.com/comments',
      filteredComments:[],
    }
  },

  computed: {
  },

  methods: {
    loadComments() {
      const url = this.apiUrl;
      axios.get(url)
        .then(({ data }) => {
          this.comments = [...data];
          this.paginationData.count = data.length;
          this.filterProducts();
        })
        .catch(error => {
          console.log(error);
        })
    },

   deepFilteredComments() {
        const regexp = new RegExp(this.search, "i");
        const filteredArray = this.comments.filter((comment) =>
          regexp.test(comment.name)
        );
        return filteredArray;
    },

    setSearch({search, params}) {
      if (search !== '') {
         const filtered = this.comments.filter(
          (comment) => {
          return this.deepFilteredComments(comment, search);
          },
        );
      params.count = filtered.length;
      this.filteredComments = JSON.parse(JSON.stringify(this.filterByPagination(filtered, params)));
      } else {
        this.filteredComments = JSON.parse(JSON.stringify(this.filterByPagination(this.comments, params)));
      }
    },

    filterByPagination(data, params) {
      const firstIndex = params.page * params.page_size - params.page_size;
      let lastIndex = params.page * params.page_size;
      if (lastIndex > params.count) {
        lastIndex = params.count;
      }
      return data.slice(firstIndex, lastIndex);
    },

    searchProducts() {
      this.filterProducts();
    },

    filterProducts() {
      this.setSearch({search: this.search, params: this.paginationData});
    },

    handleCurrentChange(val) {
      this.paginationData.page = val;
      this.filterProducts();
    },
  },

  mounted (){
    if (this.comments.length === 0) {
      this.loadComments();
    }
  }
})
</script>

<style lang="scss" scoped>
.table {
    display: grid;
    grid-template-columns: 1fr;
    border: 1px solid #dee2e6;
    @media (min-width: 930px) {
        grid-template-columns: 14px 1fr 1fr;
        column-gap: 30px;
    }
}
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
