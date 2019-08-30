<template>
  <div>
    <!-- 领军者 团队成就更多 -->
        <Top-Ad></Top-Ad>
        <N-av></N-av>
        <router-view></router-view>
    
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


</style>