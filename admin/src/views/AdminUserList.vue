<template>
  <div class="about">
    <h1>管理员列表</h1>
    <el-table :data="items">
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50"></el-table-column>
      <el-table-column prop="username" label="用户名"></el-table-column>
      <el-table-column prop="phone" label="手机号"></el-table-column>
      <el-table-column label="权限">
        <template slot-scope="scope">
          <span>{{ scope.row.status === 0 ? '普通用户' : '管理员' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="头像">
        <template slot-scope="scope">
          <div style="width: 100px;border-radius:50%; ">
            <img :src="scope.row.avatar" style="width: 100%;border-radius:50%; " />
          </div>
        </template>
      </el-table-column>
      
      <el-table-column label="添加时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | date }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          
        
          <el-button
            type="primary"
            size="small"
            v-if="status != 1 ? !show : show"
            @click="$router.push(`/admin_users/update/${scope.row._id}`)"
          >编辑</el-button>

          <el-button
          v-if="status != 1 ? !show : show"
           type="danger" size="small" @click="remove(scope.row)">删除</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      // 过滤器过滤时间格式
      return dayjs(val).format("YYYY-MM-DD HH:mm");
    }
  },
  data() {
    return {
      username: [],
      items: [],
      status: '',
      show: true,
      model: {
      }
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/admin_users");
      this.items = res.data;
      this.username = localStorage.getItem("username");
      this.status = localStorage.getItem("status");
    },

    async remove(row) {
      this.$confirm(`确定要删除"${row.username}"吗`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确定的事件
        .then(async () => {
          // 调用接口根据id删除一条数据
         await this.$http.delete(`rest/admin_users/${row._id}`);
          // 返回一条信息
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        // 点击取消的事件
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    // 在页面加载的时候执行
    this.fetch();
  }
};
</script>
<style>
.el-switch {
  margin-right: 10px;
}
</style>