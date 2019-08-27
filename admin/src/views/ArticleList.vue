<template>
  <div class="about">
    <h1>文章列表</h1>
    <el-col :span="24">
      <el-button
        type="primary"
        :disabled="this.tableChecked.length === 0"
        @click="batchDelete(tableChecked)"
      >批量删除</el-button>
    </el-col>
    <el-table :data="items" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" show-overflow-tooltip width="50"></el-table-column>
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
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

    <!-- 页码 -->

    <el-row :span="24">
      <div class="pagination-list">
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total"
        ></el-pagination>
      </div>
    </el-row>
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
      allItems: [],
      paginations: {
        page_index: 1,
        total: 0,
        page_size: 10, //一页显示几条
        layout: "prev, pager, next"
      }
    };
  },

  methods: {
    setPaginations() {
      this.paginations.total = this.allItems.length;
      this.paginations.page_index = 1;
      this.paginations.page_size = 10;
      this.items = this.allItems.filter((tableitems, index) => {
        return index < this.paginations.page_size;
      });
    },
    /**
     * 点击页码跳转
     */
    handleCurrentChange(page) {
      let index = this.paginations.page_size * (page - 1);
      let items_num = this.paginations.page_size * page;
      let tables = [];
      for (let i = index; i < items_num; i++) {
        if (this.allItems[i]) {
          tables.push(this.allItems[i]);
        }
        this.items = tables;
      }
    },
    // 复选框勾选
    handleSelectionChange(val) {
      this.tableChecked = val;
    },
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.allItems = res.data;
      this.setPaginations();
    },
    // tableChecked
    async batchDelete() {
      var ids = this.tableChecked.map(item => item._id).join();
      this.$confirm("确定要批量删除这些英雄吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // const res = await this.$http.delete('del/'+ids);
          await this.$http.delete("rest/articles/del/" + ids);
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
