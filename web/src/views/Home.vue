<template>
  <div>
    <swiper :options="swiperOption" autoplay>
      <swiper-slide v-for="(item, i) in swiper" :key="i">
        <a :href="item.url">
          <img class="w-100" :src="item.image" />
        </a>
      </swiper-slide>
      <div
        class="swiper-pagination pagination-home text-right px-3 pb-2"
        slot="pagination"
      ></div>
    </swiper>
    <!-- end of swiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-3 text-dark-1">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-news"></i>
            <div class="py-2">爆料站</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-story"></i>
            <div class="py-2">故事站</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-shop"></i>
            <div class="py-2">周边商城</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-serve"></i>
            <div class="py-2">体验服</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-guideSign"></i>
            <div class="py-2">新人专区</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-inherited"></i>
            <div class="py-2">荣耀·传承</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-avatar"></i>
            <div class="py-2">同人社区</div>
          </router-link>
        </div>

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-camp"></i>
            <div class="py-2">王者营地</div>
          </router-link>
        </div>

        <div @click="showPopup" class="nav-item mb-3">
            <i class="sprite sprite-weixin"></i>
            <div class="py-2">公众号</div>
        </div>
      </div>
    </div>
    <van-popup v-model="show">
      <img src="../assets/images/wx.jpg" style="width:100%;" />
    </van-popup>
    <!-- end nav icons -->

    <m-list-card
      icon="news"
      class="mt-3"
      title="新闻资讯"
      menu
      go="NewsCount"
      :categories="newsCats"
    >
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
    <!-- end news card -->

    <m-list-card
      img="http://www.lingjunzhe888.com/uploadfile/2019/0522/20190522114817172.jpg"
      imgshow
      icon="chanpinliebiao"
      class="mt-3"
      go="GoodsCount"
      title="产品列表"
      menu
      :categories="goodsCats"
    >
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          <router-link
            tag="div"
            :to="`/goodses/${item._id}`"
            class="p-2 text-center"
            style="width:20%"
            v-for="(item, i) in category.goodsList"
            :key="i"
          >
            <img :src="item.avatar" class="w-100" />
            <div>{{ item.name }}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>
    <!-- end goods card -->
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
      show: false,
      swiperOption: {
        autoplay: {
          delay: 2000,
          disableOnInteraction: false
        },
        pagination: {
          el: ".pagination-home"
        }
      },
      newsCats: [],
      goodsCats: [],
      swiper: []
    };
  },

  methods: {
    async fetchNewsCate() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },

    async fetchGoodsCate() {
      const res = await this.$http.get("goodses/list");
      this.goodsCats = res.data;
    },

    async fetchSwiper() {
      const res = await this.$http.get("swiper/list");
      this.swiper = res.data[0].items;
    },

    showPopup() {
      this.show = true;
    }
  },
  created() {
    this.fetchGoodsCate();
    this.fetchSwiper();
    this.fetchNewsCate();
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
      background: map-get($colors, "primary");
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