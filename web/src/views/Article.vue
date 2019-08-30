<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 ai-center px-2 border-bottom">
      <div class="iconfont icon-back text-blue" @click="back"></div>
      <strong class="flex-1 text-blue pl-2 mr-2">{{model.title}}</strong>
      <div class="text-grey fs-x">{{model.createdAt | date}}</div>
    </div>
    <div v-html="model.body" class="px-3 body fs-lg"></div>

    <!-- 相关资讯 -->
    <div class="px-3 border-top py-3">
      <div class="d-flex ai-center">
        <i class="iconfont icon-tubiao-"></i>
        <strong class="text-blue fs-lg ml-1">相关资讯</strong>
      </div>
      <div class="pt-2 fs-lg">
        <router-link class="py-1" tag="div" :to="`/articles/${item._id}`" v-for="item in model.related" :key="item._id" >{{item.title}} [{{item.categories[0].name}}]</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs';
export default {
  filters: {
    date(val) {
      // 过滤器过滤时间格式
      return dayjs(val).format("YYYY-MM-DD");
    }
  },
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  watch: {
    // 简写 id变化执行fetch方法
    id: 'fetch',
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },

    back() {
      this.$router.push("/");
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss">
.page-article {
  .icon-back {
    font-size: 1.6923rem;
  }
  .body {
    img {
      max-width: 100%;
      height: auto;
    }
    ifram {
      width: 100%;
      height: auto;
    }
  }
}
</style>