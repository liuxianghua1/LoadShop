<template>
  <div class="page-hero" v-if="model">
      <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
    <router-link to="/" tag="div">更多英雄 &gt;</router-link>
    </div>
    <h1>{{model.name}}</h1>
  </div>
</template>

<script>
export default {
    props: {
        id: {required: true}
    },
    data() {
        return {
            model: null
        }
    },
    methods: {
       async fetch() {
           const res = await this.$http.get(`heroes/${this.id}`)
           this.model = res.data
        }
    },
    created() {
        this.fetch()
    },
}
</script>