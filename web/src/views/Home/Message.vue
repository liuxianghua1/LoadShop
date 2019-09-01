<template>
  <div>
    <van-tabs>
      <van-tab title="网站留言">
        <h3 class="jc-around d-flex" style="font-weight: normal;">
          在线留言<span style="color: #999;">ONLINE MESSAGE</span>
        </h3>

        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="姓名" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input
              type="number"
              v-model.number="ruleForm.phone"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="留言内容" prop="content">
            <el-input type="text" v-model="ruleForm.content"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </van-tab>

      <van-tab title="联系我们">
        联系我们
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("留言内容不能为空"));
      }
      callback();
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入姓名"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
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
    return {
      ruleForm: {
        name: "",
        phone: "",
        content: ""
      },
      rules: {
        name: [{ validator: validatePass, trigger: "blur" }],
        phone: [{ validator: validatePass2, trigger: "blur" }],
        content: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  methods: {
    async message() {
      let res = await this.$http.post("message_add", this.ruleForm);
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.message();
          Toast("提交成功");
          this.$router.push('/')
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
.el-form-item__label {
  width: 70px !important;
}

.el-form-item__content {
  margin-left: 70px !important;
}
</style>