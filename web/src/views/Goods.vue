<template>
  <div class="page-hero" v-if="model">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 flex-1">
        <span class="text-white">王者荣耀</span>
        <span class="ml-2">攻略站</span>
      </div>
      <router-link :to="{ path: '/GoodsCount' }" class="d-flex"  tag="div">更多产品<i class="iconfont icon-dayuhao"></i></router-link>
    </div>
    <!-- 顶端开始 -->
    <div class="top" :style="{ 'background-image': `url(${model.avatar})` }">
      <div class="info text-white p-3 d-flex flex-column h-100 jc-end">
        <div class="fs-sm">{{ model.title }}</div>
        <h2 class="my-2">{{ model.name }}</h2>
        <div class="fs-sm">
          {{ model.categories.map(v => v.name).join("/") }}
        </div>
        <div class="d-flex jc-between pt-2">
          <div class="scores d-flex ai-center" v-if="model.scores">
            <span>难度</span>
            <span class="badge bg-primary">{{ model.scores.difficult }}</span>
            <span>技能</span>
            <span class="badge bg-blue-1">{{ model.scores.skills }}</span>
            <span>功效</span>
            <span class="badge bg-danger">{{ model.scores.effect }}</span>
            <span>实用</span>
            <span class="badge bg-dark">{{ model.scores.utility }}</span>
          </div>
          
        </div>
      </div>
    </div>
    <!-- 顶端结束 -->
    <div>
      <div class="px-3 bg-white">
        <div class="nav d-flex jc-around pt-3 pb-2 border-bottom">
          <div class="nav-item active">
            <div class="nav-link">产品初始</div>
          </div>
        </div>
      </div>
     
      <div>

        <div class="p-3 bg-white border-bottom">
          <div class="d-flex">
          
            <div class="btn btn-lg flex-1 mr-3">
              <a href="https://github.com/elemefe" class="bottonjump card-header d-flex ai-center" target="_blank" rel="noopener noreferrer">
              <i class="iconfont icon-shipin"></i>
              产品介绍视频
            </a>
            </div>

            <div class="btn btn-lg flex-1">
              <a href="https://github.com/elemefe" class="bottonjump card-header d-flex ai-center" target="_blank" rel="noopener noreferrer">
            <i class="iconfont icon-shipin"></i>
              产品施工视频
            </a></div>
          </div>
    
        </div>

        <!-- 出装专区 -->
        <m-card plain icon="Menu" title="出装推荐" class="hero-items">
          <div class="fs-xl">搭配工具</div>
          <div class="d-flex jc-around text-center mt-3">
            <div v-for="item in model.items1" :key="item.name">
              <img :src="item.icon" class="icon" />
              <div class="fs-xs mt-1">{{ item.name }}</div>
            </div>
          </div>
          <div class="border-bottom mt-3"></div>
        </m-card>
        <!-- 出装专区结束 -->

        <m-card plain icon="color" title="产品颜色">
          <p class="m-0">{{ model.color }}</p>
        </m-card>

        <m-card plain icon="tese" title="产品特色">
          <p class="m-0">{{ model.feature }}</p>
        </m-card>

        <m-card plain icon="shiyongloupan" title="适用范围">
          <p class="m-0">{{ model.scope }}</p>
        </m-card>

        <!-- 产品关系开始 -->
        <m-card plain icon="shougaoguanxi" title="产品关系">
          <div class="fs-xl">最佳搭档</div>
          <div v-for="item in model.partners" :key="item.name" >
            <router-link class="py-1 d-flex pt-3" tag="div" :to="`/goodses/${item._id._id}`">
            <img :src="item._id.avatar" height="50" />
            <p class="flex-1 ml-3 mt-1 m-0">{{ item.description }}</p>
            </router-link>
            

          </div>
        </m-card>
        <!-- 产品关系结束 -->

      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  watch: {
    // 简写 id变化执行fetch方法
    // 监听如果id变化了重新执行一次fetch数据方法
    id: 'fetch',
  },

  props: {
    id: { required: true }
  },

  data() {
    return {
      model: null,
    };
  },

  methods: {
    async fetch() {
      const res = await this.$http.get(`goodses/${this.id}`);
      this.model = res.data;
    }
  },

  created() {
    this.fetch();
  },
};
</script>

<style lang="scss">
@import "../assets/scss/_variables.scss";

.page-hero {
  .top {
    height: 50vw;
    background: #fff no-repeat top center;
    background-size: auto 100%;
  }
  .info {
    background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1));
    .scores {
      .badge {
        margin: 0 0.25rem;
        display: inline-block;
        width: 1rem;
        height: 1rem;
        line-height: 0.9rem;
        text-align: center;
        border-radius: 50%;
        font-size: 0.6rem;
        border: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
  .skills {
    img.icon {
      width: 70px;
      height: 70px;
      border: 3px solid map-get($colors, "white");

      &.active {
        border-color: map-get($colors, "primary");
      }
      border-radius: 50%;
    }
  }
  .hero-items {
    img.icon {
      width: 46.5px;
      height: 46.5px;
      border-radius: 50%;
    }
  }
}
</style>