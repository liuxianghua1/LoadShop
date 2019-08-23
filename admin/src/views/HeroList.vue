<template>

  <div class="about">
    <h1>英雄列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>

      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" :alt="scope.row.name" style="height:3rem;">
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/heroes/edit/${scope.row._id}`)"
          >编辑</el-button>

          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {

  data() {
    return {
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.items = res.data;
    },

    async remove(row) {
      this.$confirm(`确定要删除英雄吗"${row.name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
      // 点击确定的事件
        .then(async () => {
          // 调用接口根据id删除一条数据
          const res = await this.$http.delete(`rest/heroes/${row._id}`)
          // 返回一条信息
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch()
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
<style lang="stylus"></style>