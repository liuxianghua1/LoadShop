<template>

  <el-container style="height: 100vh;">
   
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">

      <el-menu router unique-opened :default-active="$route.path">

        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>

          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">产品</template>
            <el-menu-item index="/goodses/create">新建产品</el-menu-item>
            <el-menu-item index="/goodses/list">产品列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-s-cooperation"></i>运营管理
          </template>

          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">网站留言</template>
            <el-menu-item index="/message/list">留言列表</el-menu-item>
          </el-menu-item-group>

        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>系统设置
          </template>

          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">产品分类</template>
            <el-menu-item index="/goods_categories/create">产品分类</el-menu-item>
            <el-menu-item index="/goods_categories/list">产品列表</el-menu-item>
          </el-menu-item-group>

          <el-menu-item-group>
            <template slot="title">文章分类</template>
            <el-menu-item index="/article_categories/create">新建分类</el-menu-item>
            <el-menu-item index="/article_categories/list">分类列表</el-menu-item>
          </el-menu-item-group>

          

          <el-menu-item-group>
            <template slot="title">{{ this.status != 1 ? '用户' : '管理员'}}</template>
            <el-menu-item index="/admin_users/create">{{ this.status != 1 ? '新建用户' : '新建管理员'}}</el-menu-item>
            <el-menu-item index="/admin_users/list">{{ this.status != 1 ? '用户列表' : '管理员列表'}}</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-avatar :src="this.avatar"></el-avatar>
          <span>
            {{this.username}}</span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="Add">{{ this.status != 1 ? '新增用户' : '新增管理员'}}</el-dropdown-item>
            <el-dropdown-item @click.native="updated">修改密码</el-dropdown-item>
            <el-dropdown-item @click.native="logout">注销账户</el-dropdown-item>
            <el-dropdown-item @click.native="Adminexit">{{ this.status != 1 ? '用户退出' : '管理员退出'}}</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>

      </el-main>
    </el-container>
  </el-container>
</template>
<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item),
      username:[],
      avatar:[],
      status:[],
      id: []
    };
  },
  methods: {
    Adminexit() {
      localStorage.clear();
      this.$message("退出成功");
      this.$router.push("login");
    },
    Add() {
      this.$router.push({ path: "/admin_users/create" });
    },
    updated () {
      this.$router.push(`/admin_users/update/${this.id}`)
    },
    logout() {
     this.remove()
    },
    loadComments() {
      this.username = localStorage.getItem("username");
      this.avatar = localStorage.getItem("avatar");
      this.status = localStorage.getItem("status");
      this.id = localStorage.getItem("id");
    },
    async remove() {
      this.$confirm(`确定要删除"${this.username}"吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
         await this.$http.delete(`rest/admin_users/${this.id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.Adminexit();
        })
    }
  },

  created() {
    this.loadComments()
  },
};
</script>