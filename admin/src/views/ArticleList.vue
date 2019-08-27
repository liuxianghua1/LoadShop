<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-col :span="24">
      <el-button type="primary" :disabled="this.tableChecked.length === 0"  @click="batchDelete(tableChecked)">批量删除</el-button>
    </el-col>
    <el-table :data="items" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50">
      </el-table-column>
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | date }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)" >编辑</el-button>

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
      items: [],
      tableChecked: [],
      ids: [],
      
    };
  },

  methods: {
    handleSelectionChange(val) {
      this.tableChecked = val
    },
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.items = res.data;
    },
    // tableChecked
    async batchDelete() {
      var ids = this.tableChecked.map(item => item._id).join()
      this.$confirm('确定要批量删除这些文章吗', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // const res = await this.$http.delete('del/'+ids);
          await this.$http.delete('rest/articles/del/'+ids);
          this.$message({ 
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      
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

          // const res = await this.$http.delete(`rest/articles/${row._id}`);
        await this.$http.delete(`rest/articles/${row._id}`);
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
