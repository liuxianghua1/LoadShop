<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}广告位</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-form-item label="广告">
      <el-button size="small" @click="model.items.push({})">
        <i class="el-icon-plus"></i>添加广告
      </el-button>
      <el-row type="flex" style="flex-wrap: wrap">
        <el-col v-for="(item, i) in model.items" :key="i" :md="24">
          <el-form-item label="跳转链接(URl)">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图片" style="margin-top:0.5rem;">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL + '/upload'"
              :show-file-list="false"
              :on-success="res => $set(item, 'image', res.url)"
            >
              <!-- 有图片就显示图片 否则只显示上传按钮 -->
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          
          <el-form-item>
            <el-button size="small" type="danger" @click="model.items.splice(i, 1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
      model: {
        items: []
      }
      // 父级选项
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.put(`rest/ads/${this.id}`, this.model);
      } else {
        // 否则就是直接添加 更新和添加共存到1个方法
        res = await this.$http.post("rest/ads", this.model);
      }
      // 跳转页面
      this.$router.push("/ads/list");
      // 发送一个可视化提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/ads/${this.id}`);
      // 把数据保存到data中
      this.model = Object.assign({}, this.model, res.data);
    }
  },

  created() {
    // id得到后 在执行后面方法
    this.id && this.fetch();
  }
};
</script>