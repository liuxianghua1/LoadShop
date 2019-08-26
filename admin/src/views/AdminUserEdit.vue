<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="用户名">
        <el-input
          :disabled="id ? true : false"
          placeholder="保存后无法修改,请谨慎填写!"
          v-model="model.username"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码">
        <el-input type="password" v-model="model.password"></el-input>
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
      model: {}
    };
  },
  methods: {
    async save() {
      let res;

      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.post(`admin_update/${this.id}`, this.model);
        var err_code = res.data.err_code;
        if (err_code === 0) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/admin_users/list");
        }
      } else {
        // 否则就是直接添加
        res = await this.$http.post("admin_add", this.model);
        var err_code = res.data.err_code;
        if (err_code === 1) {
          this.$message({
            type: "error",
            message: "用户名已存在"
          });
        }
        if (err_code === 0) {
          this.$message({
            type: "success",
            message: "保存成功"
          });
          this.$router.push("/admin_users/list");
        }
      }
      // 跳转页面
    },

    async fetch() {
      const res = await this.$http.get(`rest/admin_users/${this.id}`);
      // 把数据保存到data中
      this.model = res.data;
    }
  },

  created() {
    // id得到后 在执行后面方法
    this.id && this.fetch();
  }
};
</script>