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
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="model.username"
          :disabled="id ? true : false"
          placeholder="保存后无法修改,请谨慎填写。"
        ></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="model.password" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="model.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="phone">
        <el-input
          v-model.number="model.phone"
          :disabled="id ? true : false"
          placeholder="保存后无法修改,请谨慎填写。"
        />
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
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };

    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.model.checkPass !== "") {
          this.$refs.model.validateField("checkPass");
        }
        callback();
      }
    };

    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.model.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      avatar: "",
      model: {
        password: "",
        checkPass: "",
        phone: "",
        username: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ],
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }]
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
    afterUpload(res) {
      this.$set(this.model, "avatar", res.url);
    },
    async save() {
      let res;
      res = await this.$http.post("admin_add", this.model);
      var err_code = res.data.err_code;
      if (err_code === 1) {
        this.$message({
          type: "error",
          message: "用户名或手机号已存在"
        });
      }
      if (err_code === 0) {
        this.$message({
          type: "success",
          message: "保存成功"
        });
        this.$router.push("/admin_users/list");
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