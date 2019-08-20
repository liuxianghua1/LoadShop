<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}文章</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

      <el-form-item label="详情">
        <vue-editor v-model="model.body" useCustomImageHandler @imageAdded="handleImageAdded"></vue-editor>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    id: {}
  },
  components: {
    VueEditor
  },
  data() {
    return {
      model: {},
      // 父级选项
      categories: []
    };
  },
  methods: {
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);
      const res = await this.$http.post("upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    },
    async save() {
      let res;
      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.put(`rest/articles/${this.id}`, this.model);
      } else {
        // 否则就是直接添加 更新和添加共存到1个方法
        res = await this.$http.post("rest/articles", this.model);
      }
      // 跳转页面
      this.$router.push("/articles/list");
      // 发送一个可视化提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/articles/${this.id}`);
      // 把数据保存到data中
      this.model = res.data;
    },

    async fetchCatogories() {
      const res = await this.$http.get(`rest/categories`);
      // 把数据保存到data中
      this.categories = res.data;
    }
  },

  created() {
    this.fetchCatogories();
    // id得到后 在执行后面方法
    this.id && this.fetch();
  }
};
</script>