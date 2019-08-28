<template>
  <div class="about">
    <h1>英雄列表</h1>
    <el-col :span="24">
      <el-button
        type="primary"
        :disabled="this.tableChecked.length === 0"
        @click="batchDelete(tableChecked)"
      >批量删除</el-button>
    </el-col>
    <el-table :data="items" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="序号" type="index" :index="table_index" show-overflow-tooltip width="50"></el-table-column>
      <el-table-column prop="_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="name" label="英雄名称"></el-table-column>
      <el-table-column prop="title" label="英雄称号"></el-table-column>

      <el-table-column prop="avatar" label="头像">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" :alt="scope.row.name" style="height:3rem;" />
        </template>
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="300">
        <template slot="header">
          <el-input class="search" v-model="search" prefix-icon="el-icon-search" clearable placeholder="输入英雄名称搜索" />
        </template>
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
export default {
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
      },
      search: '',

    };
  },
  methods: {

    /**
     * 分页序号自增
     */
   table_index(index){
        return (this.paginations.page_index-1) * this.paginations.page_size + index + 1
    },
    
    // 搜索功能
    searchItem() {
        const searchItemdata = this.allItems.filter(data => !this.search || data.name.toLowerCase().includes(this
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
    // 复选框勾选
    handleSelectionChange(val) {
      this.tableChecked = val;
    },
    async batchDelete() {
      var ids = this.tableChecked.map(item => item._id).join();
      this.$confirm("确定要批量删除这些英雄吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // const res = await this.$http.delete('del/'+ids);
          await this.$http.delete("rest/heroes/del/" + ids);
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
    async fetch() {
      const res = await this.$http.get("rest/heroes");
      this.allItems = res.data;
      this.setPaginations();
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
          await this.$http.delete(`rest/heroes/${row._id}`);
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
<style lang="scss">
.el-icon-search {
    margin-left: 6px;
}
.el-icon-circle-close:before {
  margin-right: 20px;
}
</style>