<template>
  <div>
    <m-list-card icon="chanpinliebiao" class="mt-3" title="产品列表" menu :categories="goodsCats">

      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link tag="div" :to="`/goodses/${item._id}`" class="p-2 text-center" style="width:20%" v-for="(item, i) in category.goodsList" :key="i">
            <img :src="item.avatar" class="w-100" />
            <div>{{item.name}}</div>
          </router-link>
        </div>
      </template>

    </m-list-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      goodsCats: []
    };
  },
  methods: {
    async fetchGoodsCate() {
        const res = await this.$http.get("goodses/list");
        this.goodsCats = res.data;
      },
  },
  created() {
    this.fetchGoodsCate();
  }
};
</script>
