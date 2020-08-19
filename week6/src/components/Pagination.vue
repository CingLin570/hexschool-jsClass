<template>
  <nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">
    <li class="page-item" :class="{disabled:pages.current_page === 1}">
      <a class="page-link" href="#" tabindex="-1" aria-disabled="true"
      @click.prevent="emitPages(pages.current_page - 1)">上一頁</a>
    </li>
    <li class="page-item" v-for="item in pages.total_pages" :key="item"
    :class="{ active:pages.current_page === item }">
      <a class="page-link" href="#" @click.prevent="emitPages(item)">{{ item }}</a></li>
    <li class="page-item" :class="{disabled:pages.current_page === pages.total_pages}">
      <a class="page-link" href="#"
      @click.prevent="emitPages(pages.current_page + 1)">下一頁</a>
    </li>
  </ul>
</nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    pages: {
      type: Object,
      default () {
        return {
        }
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    emitPages (item) {
      this.$emit('emitPages', item)
    }
  }
}
</script>
