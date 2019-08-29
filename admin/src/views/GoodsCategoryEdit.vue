<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}产品分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">

      <el-form-item label="产品分类名称">
        <el-input v-model="model.name" placeholder="请输入产品分类名称"></el-input>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.put(`rest/goods_categories/${this.id}`, this.model);
      } else {
        // 否则就是直接添加 更新和添加共存到1个方法
        res = await this.$http.post("rest/goods_categories", this.model);
      }
      // 跳转页面
      this.$router.push("/goods_categories/list");
      // 发送一个可视化提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/goods_categories/${this.id}`);
      // 把数据保存到data中
      this.model = res.data;
    },

  },

  created() {
    // id得到后 在执行后面方法
    this.id && this.fetch();
  }
};
</script>