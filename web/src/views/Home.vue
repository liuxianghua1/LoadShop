<template>
  <div>
    <swiper :options="swiperOption" v-for="(item, i) in swiper" :key="i" autoplay>
      <swiper-slide>
        <router-link :to="item.items[0].url">
          <img class="w-100" :src="item.items[0].image" />
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link :to="item.items[0].url">
          <img class="w-100" :src="item.items[1].image" />
        </router-link>
      </swiper-slide>
      <swiper-slide>
        <router-link :to="item.items[0].url">
          <img class="w-100" :src="item.items[2].image" />
        </router-link>
      </swiper-slide>
      <!-- <swiper-slide >
        <img class="w-100" :src="item.items[3].image" />
      </swiper-slide>-->
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
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

        <div class="nav-item mb-3">
          <router-link tag="div" to="/">
            <i class="sprite sprite-weixin"></i>
            <div class="py-2">公众号</div>
          </router-link>
        </div>
      </div>

      <!-- <div class="bg-light py-2 fs-sm ai-center">
        <i class="sprite sprite-arrow mr-2"></i>
        <span>收起</span>
      </div>-->

    </div>

    <!-- end nav icons -->

    <m-list-card icon="Menu" title="新闻资讯" :categories="newsCats">
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="py-2 fs-lg d-flex"
          v-for="(news, i) in category.newsList"
          :key="i"
        >
          <span class="text-info-1">[{{news.CategoryName}}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-2">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </m-list-card>
    <!-- end news card -->


<!-- <m-card plain icon="iconfont icon-Menu" title="新闻资讯">
    
    <div class="nav jc-between">
      <div class="nav-item" :class="{ active: active === i }" v-for="(category, i) in newsCats" :key="i" @click="$refs.list.swiper.slideTo(i)">
        <div class="nav-link" >{{category.name}}</div>
      </div>
    </div>

    <div class="pt-3">
      <swiper :options="{autoHeight: true}" ref="list" @slide-change="() => active = $refs.list.swiper.realIndex">
        <swiper-slide v-for="(category, i) in newsCats" :key="i">
          <slot name="items" category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
    
  </m-card> -->






 <img
          src="//ossweb-img.qq.com/upload/webplat/info/yxzj/20190815/9936541435635.jpg"
          class="w-100 mb-2 mt-3"
        />
    <m-list-card icon="card-hero" title="英雄列表" :categories="heroCats">
      
      <template #items="{category}">
        

        <div class="d-flex flex-wrap" style="margin:0 -0.5rem;">
          
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="p-2 text-center"
            style="width:20%"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </m-list-card>


    

   
    <!-- end hero card -->
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
      heroCats: [],
      swiper: [],
      flag: true
    };
  },

  methods: {
    async fetchNewsCate() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroCate() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
    async fetchSwiper() {
      const res = await this.$http.get("swiper/list");
      this.swiper = res.data;
    }
  },
  created() {
    this.fetchSwiper();
    this.fetchNewsCate();
    this.fetchHeroCate();
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