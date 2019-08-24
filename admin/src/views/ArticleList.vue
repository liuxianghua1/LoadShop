<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="文章内容">
        <template slot-scope="scope">
          <!-- <span>{{scope.row.body}}</span> -->
          <div class="textDiv" style="width:100%;height:61.8px" >
            <span v-html="scope.row.body" ></span>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | date }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            @click="$router.push(`/articles/edit/${scope.row._id}`)"
          >编辑</el-button>

          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
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
      items: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },

    async remove(row) {
      this.$confirm(`确定要删除文章吗"${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        // 点击确定的事件
        .then(async () => {
          // 调用接口根据id删除一条数据
          const res = await this.$http.delete(`rest/articles/${row._id}`);
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
<style lang="scss">
.textDiv {
  p {
     display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>