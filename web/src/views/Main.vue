<template>
  <div>
    <!-- 领军者 团队成就更多 -->
        <Top-Ad></Top-Ad>


    <van-tabs v-model="active" color="white" background="#84c225" animated lazy-render swipeable>
      <van-tab title="首页">
        <router-view></router-view>
      </van-tab>
      
      <van-tab title="战略中心"></van-tab>
      <van-tab title="赛事中心"></van-tab>
    </van-tabs>

    <!-- 版权 -->
    <div class="w-100 bg-black-1 mt-3" style="height:80px;">
      <h4 class="text-grey-2 d-flex jc-around pt-3 ">
        版权所有： 福州领军者新材料有限公司
      </h4>
      <h5 class="text-grey-2 d-flex jc-around">
        地址：福建福州仓山区百花洲路45号5层
      </h5>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      active: 0
    };
  }
};
</script>
<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999;
}

.van-tabs__nav--line {
  padding-bottom: 5px !important;
}
.van-tabs__line {
    width: 30px !important;
    height: 2.9px;
    border-radius: 0px;
}
.van-tab {
   color: white;
}
.van-tab--active {
  font-weight: normal !important;
}
</style>