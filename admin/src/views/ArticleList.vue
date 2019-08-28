<template>
  <div class="about">
    <h1>文章列表</h1>

    <el-col :span="24">
      <el-button type="primary" :disabled="this.tableChecked.length === 0" @click="batchDelete(tableChecked)" >批量删除</el-button>
    </el-col>

    <el-table :data="items" @selection-change="handleSelectionChange">

      <el-table-column type="selection" width="55"></el-table-column>

      <el-table-column label="序号" type="index" :index="table_index" show-ov erflow-tooltip width="50"></el-table-column>

      <el-table-column prop="_id" label="ID" width="240"></el-table-column>

      <el-table-column prop="title" label="标题"></el-table-column>

      <el-table-column label="发布时间">
        <template slot-scope="scope">
          <span>{{ scope.row.createdAt | date }}</span>
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="300">

        <!-- 搜索框 -->
        <template slot="header">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入文章标题搜索" />
        </template>

        <!-- 按钮组 -->
        <template slot-scope="scope">
          <el-button type="primary" size="small" @click="$router.push(`/articles/edit/${scope.row._id}`)" >编辑</el-button>
          <el-button type="danger" size="small" @click="remove(scope.row)">删除</el-button>
        </template>

      </el-table-column>

    </el-table>

    <!-- 页码 -->

    <el-row :span="24">
      <div class="pagination-list">
        <el-pagination background @current-change="handleCurrentChange" :current-page.sync="paginations.page_index" :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total" ></el-pagination>
      </div>
    </el-row>

  </div>
</template>

<script>
import dayjs from "dayjs";

export default {
  filters: {
    date(val) {
      return dayjs(val).format("YYYY-MM-DD HH:mm"); // 过滤器过滤时间格式
    }
  },

  data() {

    return {
      items: [],
      tableChecked: [],
      ids: [],
      allItems: [],
      paginations: {
        page_index: 1, //当前页数
        total: 0, //数据总数
        page_size: 10, //一页显示几条
        layout: "prev, pager, next"
      },
      search: '', //搜索
    };
  },

  methods: {

    /**
     * 分页序号自增
     */
   table_index(index){
        return (this.paginations.page_index-1) * this.paginations.page_size + index + 1
    },

     /**
     * 搜索功能
     */
    searchItem() {
        const searchItemdata = this.allItems.filter(data => !this.search || data.title.toLowerCase().includes(this
          .search
          .toLowerCase()))
        this.allItems = searchItemdata
        this.setPaginations()
      },

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

    /**
     * 复选框勾选
     */
    handleSelectionChange(val) {
      this.tableChecked = val;
    },

    /**
     * 数据查询
     */
    async fetch() {
      const res = await this.$http.get("rest/articles");
      this.allItems = res.data;
      this.setPaginations();
    },

    /**
     * 批量删除 tableChecked
     */
    async batchDelete() {
      var ids = this.tableChecked.map(item => item._id).join();
      this.$confirm("确定要批量删除这些英雄吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })

        .then(async () => {
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

    /**
     * 单个删除
     */
    async remove(row) {
      this.$confirm(`确定要删除文章吗"${row.title}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        
        .then(async () => {// 点击确定的事件
          await this.$http.delete(`rest/articles/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fetch();
        })
        
        .catch(() => {// 点击取消的事件
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fetch();// 在页面加载的时候执行
  },

  watch: {
      search: function (new_v) {
        if (new_v != '') {
          this.searchItem()
        } else {
          this.fetch()
        }
      }
    }
};
</script>
