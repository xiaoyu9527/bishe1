<template>
  <div>
    <el-header class="h-header">
      <el-menu mode="horizontal">
        <div class="div1">校 园 二 手 猫 平 台</div>
        <el-menu-item index="1" @click="item1">二手优品</el-menu-item>
        <el-menu-item index="2" @click="item2">发布商品</el-menu-item>
        <el-menu-item index="3" @click="item3">我的发布</el-menu-item>
        <el-menu-item index="4" @click="item4">我的收藏</el-menu-item>
        <el-button type="info" class="tuichu" @click="tc">退出</el-button>
      </el-menu>
    </el-header>
    <div class="ctnr" :model="fabuForm" ref="fabuFormRef">
      <div>商品名称:<input type="text" v-model="fabuForm.name" /></div>
      <div>
        <!--action为图片上传的接口地址-->
        图片描述:<el-upload
          :action="uploadUrl"
          :on-preview="handlePreview1"
          :on-remove="handleRemove1"
          :headers="headersObj"
          :file-list="fabuForm.pics1"
          :multiple="false"
          list-type="picture"
          :on-success="handleSuccess1"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <div>价格:<input type="text" v-model="fabuForm.price" /></div>
      <div class="xq">
        详情:<textarea rows="4" cols="24" v-model="fabuForm.xq"></textarea>
      </div>
      <div>微信号:<input type="text" v-model="fabuForm.vx" /></div>
      <div>
        学生证图片:<el-upload
          :action="uploadUrl"
          :on-preview="handlePreview2"
          :on-remove="handleRemove2"
          :headers="headersObj"
          :file-list="fabuForm.pics2"
          :multiple="false"
          list-type="picture"
          :on-success="handleSuccess2"
        >
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
      <input type="submit" class="tj" @click="tijiao" />
    </div>
    <el-dialog title="图片预览" :visible.sync="previewVisible" width="50%">
      <img :src="previewPath" alt="" />
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fabuForm: {
        name: '',
        pics1: [],
        price: '',
        xq: '',
        vx: '',
        pics2: [],
      },
      //上传图片的URL地址
      uploadUrl: 'http://123.56.89.169:3546/2021/01/10/',
      headersObj: { token: window.sessionStorage.getItem('token') },
      previewPath: '',
      previewVisible: false,
    };
  },
  methods: {
    async tijiao() {
      // this.fabuForm.pics1 = JSON.stringify(this.fabuForm.pics1);
      // this.fabuForm.pics2 = JSON.stringify(this.fabuForm.pics2);
      const { data: res } = await this.$http.post('/show/release', this.fabuForm);
      console.log(res);
      if (res.status !== '200') return this.$message.error('发布失败！');
      this.$message.success('发布成功！');
      this.$router.push('/home');
    },
    //监听图片上传成功的事件
    handleSuccess1(response) {
      console.log(response);
      const picInfo = { pic1: response.data.url };
      this.fabuForm.pics1.push(picInfo);
      // console.log(this.fabuForm);
    },
    handlePreview1(file) {
      // console.log(file);
      this.previewPath = file.url;
      this.previewVisible = true;
    },
    handleRemove1(file) {
      // console.log(file);
      // console.log(this.fabuForm.picse);
      const filePath = file.url;
      const i = this.fabuForm.pics1.findIndex((x) => x.pic1 === filePath);
      this.fabuForm.pics1.splice(i, 1);
      //  console.log(this.fabuForm);
    },
    //监听图片上传成功的事件
    handleSuccess2(response) {
      // console.log(response);
      const picInfo = { pic2: response.data.url };
      this.fabuForm.pics2.push(picInfo);
      // console.log(this.fabuForm);
    },
    handlePreview2(file) {
      // console.log(file);
      this.previewPath = file.url;
      this.previewVisible = true;
    },
    handleRemove2(file) {
      // console.log(file);
      // console.log(this.fabuForm.picse);
      const filePath = file.url;
      const i = this.fabuForm.pics2.findIndex((x) => x.pic2 === filePath);
      this.fabuForm.pics2.splice(i, 1);
      //  console.log(this.fabuForm);
    },
    myupload(param) {
      this.$http.post('/show/upload');
    },

    //  upLoadPdf() {
    //  this.$http.jsonp('http://123.56.89.169:3546/2021/01/10',{ emulateJSON: true }).then((response) => {
    //     console.log('success');
    //   }).catch((e) => { console.log(e); })
    //   },
    tc() {
      this.$router.push('/login');
    },
    item1() {
      this.$router.push('/home');
    },
    item2() {
      // this.$router.push('/release')
    },
    item3() {
      this.$router.push('/myrelease');
    },
    item4() {
      this.$router.push('/collection');
    },
  },
};
</script>
<style scoped>
.h-header {
  background-color: #666;
}
.el-menu {
  margin-left: 300px;
  background-color: #666;
  position: relative;
  min-width: 750px;
}
.h-header .el-menu-item {
  margin-left: 90px;
  display: inline-block;
}
.tuichu {
  position: absolute;
  right: 0;
  top: 10px;
}
.div1 {
  color: red;
  font-size: 30px;
  position: absolute;
  left: -250px;
  top: 10px;
}
.router-l {
  display: inline-block;
  text-align: center;
  width: 56px;
  height: 58px;
  box-sizing: border-box;
}
.ctnr {
  width: 60%;
  height: auto;
  line-height: 80px;
  margin-left: 500px;
  /* border: 1px solid pink; */
  /* margin: 0 auto; */
}
input[type='text'] {
  width: 200px;
  height: 30px;
  border-radius: 4px;
  border: 1px solid #ccc;
  text-indent: 1em;
}
input[type='text']:focus {
  outline: none;
}
input[type='submit']:focus {
  outline: none;
}
.xq {
  position: relative;
}
textarea:focus {
  outline: none;
}
textarea {
  position: absolute;
  left: 40px;
  top: 20px;
}
.tj {
  width: 60px;
  height: 36px;
  position: relative;
  left: 60px;
  border-radius: 5px;
  background-color: lightblue;
}
</style>
