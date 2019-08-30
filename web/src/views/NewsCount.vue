<template>
  <div>

    <Top-Ad></Top-Ad>

    <N-av></N-av>

    <m-list-card class="pt-0" :categories="newCats">

      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info-1">[{{ news.CategoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{
            news.title
          }}</span>
          <span class="text-grey-1 fs-sm">{{ news.createdAt | date }}</span>
        </router-link>
      </template>

    </m-list-card>
  
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      // 过滤器过滤时间格式
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      newCats: [],
      
    };
  },
  methods: {

    async fetchNewsCate() {
      const res = await this.$http.get("news/count");
      this.newCats = res.data;
    },
  },
  created() {
    this.fetchNewsCate();
  }
};
</script>
