<template>
  <div class="form_container">
    <div class="login_box">
      <div class="text">用户登录</div>
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
            placeholder="请输入学号(9位数)"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-select v-model="loginForm.usertype" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.usertype"
            :label="item.label"
            :value="item.usertype"
          >
          </el-option>
        </el-select>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
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
      loginForm: {
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
      loginFormRules: {
        username: [
          {
            required: true,
            message: '请输入学号(9位数)',
            trigger: 'blur',
          },
          {
            min: 3,
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
    resetLoginForm() {
      // 重置登录表单
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      // this.$router.push("/home");
      // console.log(this.$refs.loginFormRef.validate);
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$http.post('/login', this.loginForm);
        console.log(res);
        if (res.status !== '200') return this.$message.error('登录失败！');
        this.$message.success('登录成功！');
        window.sessionStorage.setItem('token', res.token);
        this.$router.push('/home');
      });
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
}
.form_container {
  background-color: #2090ff;
  height: 657px;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 3px;
  transform: translate(-50%, -50%);
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
.text {
  width: 200px;
  height: 30px;
  background-color: lightblue;
  text-align: center;
  border-radius: 3px;
  margin-left: 124px;
}
</style>
