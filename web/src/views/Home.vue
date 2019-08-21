<template>
  <div>
    <swiper :options="swiperOption">
      <swiper-slide>
        <img class="w-100" src="../assets/images/54be0dc89324bc002fb52ce668338ab2.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/63363be7b59c38154c0f48671d9169fd.jpeg" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/images/d0d82f2c7b4e0d6e4006187a87af2601.jpeg" />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3" v-for="n in 10" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-2">爆料站</div>
        </div>

        <div class="nav-item mb-3">
          <i class="sprite sprite-story"></i>
          <div class="py-2">故事站</div>
        </div>
      </div>
      <div class="bg-light py-2 fs-sm ai-center">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end nav icons -->

    <!-- end news card -->

    <m-list-card icon="Menu" title="新闻" :categories="newsCats">
      <template #items="{category}">
        <div class="py-2" v-for="(news, i) in category.newsList" :key="i">
          <span>[{{news.categoryName}}]</span>
          <span>|</span>
          <span>{{news.title}}</span>
          <span>{{news.date}}</span>
        </div>
      </template>
    </m-list-card>

    <m-card icon="Menu" title="英雄列表"></m-card>
    <!-- end hero card -->

    <m-card icon="Menu" title="精彩视频"></m-card>

    <m-card icon="Menu" title="图文攻略"></m-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "今日韩信加强 反杀所以刺客",
            date: "06/01"
          }))
        },
        {
          name: "新闻",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "新闻",
            title: "今日韩信加强 反杀所以刺客",
            date: "06/01"
          }))
        },
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "今日1111111韩信加强 反杀所以刺客",
            date: "06/01"
          }))
        },
        {
          name: "热门",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "今日韩信加强 反杀所以刺客",
            date: "06/01"
          }))
        },
        {
          name: "活动",
          newsList: new Array(5).fill(1).map(v => ({
            categoryName: "公告",
            title: "今日韩信加强 反杀所以刺客",
            date: "06/01"
          }))
        }
      ]
    };
  }
};
</script>
<style lang="scss">
@import "../assets/scss/variables";

.pagination-home {
  .swiper-pagination-bullet {
    opacity: 1;
    border-radius: 0.1538rem;
    background: map-get($colors, "white");
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}
</style>