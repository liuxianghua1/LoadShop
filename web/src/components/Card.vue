<template>
  <div class="card bg-white p-3">
    <div
      class="card-header d-flex ai-center"
      :class="{ 'border-bottom': !plain, 'pb-3': !plain }">
      <i class="iconfont" :class="`icon-${icon}`"></i>

      <div class="fs-xl flex-1 px-2">
        <strong>{{ title }}</strong>
      </div>
      <router-link tag="div" :to="`${go}`">
        <i class="iconfont icon-menu" v-if="!plain"></i>
        
      </router-link>

    </div>

        <img :src="`${img}`" v-if="!imgshow" style="width:100%">

    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    img: { type: String },
    go: { type: String },
    title: { type: String,  },
    icon: { type: String,  },
    plain: { type: Boolean },
    imgshow: { type: Boolean }
  }
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";
.card {
  // .card-header {
  //     border-bottom: 1px solid $border-color;
  // }
  border-bottom: 1px solid $border-color;
}
</style>