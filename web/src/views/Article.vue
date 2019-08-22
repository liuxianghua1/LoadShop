<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2">
    <div class="iconfont icon-back"></div>
  <strong class="flex-1">
    {{model.title}}
  </strong>
  <div class="text-grey fs-x">
    2019-06-19
  </div>
    </div>
    <div v-html="model.body" class="px-3 body"></div>
  </div>
</template>

<script>
export default {
  props: {
    id: {required : true}
  },
  data() {
    return {
      model: null
    }
  },
  methods: {
  async fetch() {
        const res = await this.$http.get(`articles/${this.id}`)
        this.model = res.data
    }
  },
  created() {
    this.fetch()
  }
}
</script>

<style lang="scss">
.page-article {
  .body {
    
  }
}
</style>