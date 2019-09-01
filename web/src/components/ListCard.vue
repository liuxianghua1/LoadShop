<template>
  <m-card :icon="icon" :plain="!menu" :imgshow="!imgshow" :go="go" :img="img" :title="title">
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: active === i }" v-for="(category, i) in categories" :key="i"
        @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>

    <div class="pt-3">
      <swiper :options="{autoHeight: true}" ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in categories" :key="i">
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
  export default {
    props: {
      img: { type: String, }, //控制图片地址
      menu: { type: Boolean }, //控制显示不显示menu键
      go: { type: String, }, //控制menu键的跳转
      icon: { type: String,},
      title: { type: String,},
      categories: { type: Array,},
      imgshow: { type: Boolean }
    },
    data() {
      return {
        active: 0
      };
    }
  };
</script>

<style>
</style>