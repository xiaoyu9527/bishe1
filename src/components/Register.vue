<template>
  <div class="form_container">
    <div class="zc_box">
      <div class="text">用户注册</div>
      <el-form ref="zcFormRef" :model="zcForm" :rules="zcFormRules" class="zc_form">
        <el-form-item prop="username">
          <el-input
            v-model="zcForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入学号(9位)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="zcForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-select v-model="zcForm.usertype" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.usertype"
            :label="item.label"
            :value="item.usertype"
          >
          </el-option>
        </el-select>
        <el-form-item class="btns">
          <el-button type="primary" class="register_btn" @click="zc">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //登录表单的数据对象
      zcForm: {
        username: '',
        password: '',
        usertype: '',
      },
      options: [
        {
          usertype: '0',
          label: '0',
        },
        {
          usertype: '1',
          label: '1',
        },
      ],
      usertype: '',
      zcFormRules: {
        username: [
          {
            required: true,
            message: '请输入学号',
            trigger: 'blur',
          },
          {
            min: 9,
            max: 9,
            message: '长度为9个字符',
            trigger: 'blur',
          },
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    };
  },
  methods: {
    async zc() {
      this.$refs.zcFormRef.validate(async (valid) => {
        if (!valid) return; //表单验证不通过
        //表单验证通过后发起数据请求将数据写入数据库并跳转页面
        const { data: res } = await this.$http.post('/register', this.zcForm);
        console.log(res);
        if (res.status !== '200') return this.$message.error('注册失败！');
        this.$message.success('注册成功！');
        this.$router.push('/login');
      });
    },
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.form_container {
  background-color: #6eb7ff;
  height: 657px;
}

.zc_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}
.zc_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.text {
  width: 200px;
  height: 30px;
  background-color: lightblue;
  text-align: center;
  border-radius: 3px;
  margin-left: 124px;
}
.register_btn {
  width: 410px;
  height: 40px;
  margin-top: 30px;
}
</style>
