<template>
  <div>
    <div class="topbar bg-black py-2 px-3 d-flex ai-center">
      <img src="../assets/logo.png" height="30" />
      <div class="px-2 pt-1 flex-1">
        <div class="text-white">领军者</div>
        <div class="text-grey-1 fs-xxs">团队成就更多</div>
      </div>
    </div>
    
    <div class="bg-primary pt-3 pb-2">
      <div class="nav nav-inverse pb-1 jc-around">
        <div class="nav-item active">
          <router-link class="nav-link" tag="div" to="/">首页</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">攻略中心</router-link>
        </div>

        <div class="nav-item">
          <router-link class="nav-link" tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
    <!-- 版权 -->
    <div class="w-100 bg-black-1 mt-3" style="height:80px;" >
      <h4 class="text-grey-2 d-flex jc-around pt-3 ">版权所有： 福州领军者新材料有限公司</h4>
      <h5 class="text-grey-2 d-flex jc-around">地址：福建福州仓山区百花洲路45号5层</h5>
    </div>

  </div>
</template>
<script>
export default {};
</script>
<style lang="scss">
.topbar {
  position: sticky;
  top: 0;
  z-index: 999 ;
}
</style>