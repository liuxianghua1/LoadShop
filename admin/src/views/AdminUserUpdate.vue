<template>
  <div class="about">
    <h1>新建管理员</h1>
    <el-form
      :model="model"
      status-icon
      :rules="rules"
      ref="model"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名">
        <el-input v-model="model.username" :disabled="true"></el-input>
      </el-form-item>

      <el-form-item label="原密码" prop="password">
        <el-input type="password" v-model="model.password" show-password autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="新密码" prop="checkPass">
        <el-input type="password" v-model="model.checkPass" show-password autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机号">
        <el-input v-model.number="model.phone" :disabled="true" />
      </el-form-item>

      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :headers="getAuthHeaders()"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <!-- 有图片就显示图片 否则只显示上传按钮 -->
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('model')">提交</el-button>
        <el-button @click="resetForm('model')">重置</el-button>
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
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入原密码"));
      }
      callback();
    };
    var validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入新密码"));
      }
      callback();
    };

    return {
      avatar: "",
      model: {
        password: "",
        checkPass: "",
        username: "",
        phone: ""
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.save();
        } else {
          return false;
        }
      });
    },
    
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    // 头像上传
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
    },
    async save() {
      let res;

      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.post(`admin_update/${this.id}`, this.model);
        var err_code = res.data.err_code;
        if (err_code === 2) {
          this.$message({
            type: "error",
            message: "原密码与新密码重复"
          });
        } else if (err_code === 0) {
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