<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}产品</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-tabs type="border-card" value="basic">
        <!-- 基本信息开始 -->
        <el-tab-pane label="基本信息" name="basic">
          <el-form-item label="产品名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>

          <el-form-item label="产品规格">
            <el-input v-model="model.spec"></el-input>
          </el-form-item>

          <el-form-item label="产品头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'avatar', res.url)"
            >
              <!-- 有图片就显示图片 否则只显示上传按钮 -->
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <!-- 背景图 -->
          <el-form-item label="Banner">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'banner', res.url)"
            >
              <!-- 有图片就显示图片 否则只显示上传按钮 -->
              <img v-if="model.banner" :src="model.banner" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

          <el-form-item label="类型">
            <el-select v-model="model.categories" multiple>
              <el-option
                v-for="item of goods_categories"
                :key="item._id"
                :value="item._id"
                :label="item.name"
              ></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="出装">
            <el-select v-model="model.items1" multiple>
              <el-option v-for="item of items" :key="item._id" :value="item._id" :label="item.name"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="难度">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.difficult"></el-rate>
          </el-form-item>

          <el-form-item label="技能">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.skills"></el-rate>
          </el-form-item>

          <el-form-item label="功效">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.effect"></el-rate>
          </el-form-item>

          <el-form-item label="实用">
            <el-rate style="margin-top:0.6rem;" :max="9" show-score v-model="model.scores.utility"></el-rate>
          </el-form-item>

          <el-form-item label="产品颜色">
            <el-input type="textarea" v-model="model.color"></el-input>
          </el-form-item>

          <el-form-item label="产品特色">
            <el-input type="textarea" v-model="model.feature"></el-input>
          </el-form-item>

          <el-form-item label="适用范围">
            <el-input type="textarea" v-model="model.scope"></el-input>
          </el-form-item>
        </el-tab-pane>
        <!-- 基本信息结束 -->

        <!-- 搭配使用 -->
        <el-tab-pane label="最佳搭档" name="partners">
          <el-button size="small" @click="model.partners.push({})">
            <i class="el-icon-plus"></i>添加产品
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col v-for="(item, i) in model.partners" :key="i" :md="12">
              <el-form-item label="产品">
                <el-select filterable v-model="item._id">
                  <el-option
                    v-for="item in goodses"
                    :key="item._id"
                    :value="item._id"
                    :label="item.name"
                  ></el-option>
                </el-select>
              </el-form-item>


              <el-form-item label="描述">
                <el-input v-model="item.description" type="textarea"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button size="small" type="danger" @click="model.partners.splice(i, 1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>
      <el-form-item style="margin-top:1rem;">
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
      categories: [],
      goods_categories: [],
      items: [],
      goodses: [],
      model: {
        name: "",
        avatar: "",
        skills: [],
        partners: [],
        scores: {
          difficult: 0
        }
      }
    };
  },
  methods: {
    async save() {
      let res;
      if (this.id) {
        // 如果有id 那就是更新
        res = await this.$http.put(`rest/goodses/${this.id}`, this.model);
      } else {
        // 否则就是直接添加 更新和添加共存到1个方法
        res = await this.$http.post("rest/goodses", this.model);
      }
      // 跳转页面
      this.$router.push("/goodses/list");
      // 发送一个可视化提示信息
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/goodses/${this.id}`);
      // 把数据保存到data中
      // 不会全部替换数据 有同名就覆盖 无则不影响默认数据
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchItems() {
      const res = await this.$http.get(`rest/items`);
      // 把数据保存到data中
      this.items = res.data;
    },

    async fetchGoodses() {
      const res = await this.$http.get(`rest/goodses`);
      // 把数据保存到data中
      this.goodses = res.data;
    },

    async fetchCatogories() {
      const res = await this.$http.get(`rest/goods_categories`);
      // 把数据保存到data中
      this.goods_categories = res.data;
    }
  },

  created() {
    this.fetchCatogories();
    this.fetchGoodses(); //英雄
    this.fetchItems(); 
    // id得到后 在执行后面方法
    this.id && this.fetch();
  }
};
</script>
