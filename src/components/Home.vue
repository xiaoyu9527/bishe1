<template>
  <div>
    <el-header class="h-header">
      <el-menu mode="horizontal">
        <div class="div1">校 园 二 手 猫 平 台</div>
        <el-menu-item index="1" @click="item1">二手优品</el-menu-item>
        <el-menu-item index="2" @click="item2">发布商品</el-menu-item>
        <el-menu-item index="3" @click="item3">我的发布</el-menu-item>
        <el-menu-item index="4" @click="item4">我的收藏</el-menu-item>
        <!-- <el-button type="primary" class="login_btn" ><router-link to="/login" style="color:#FFF;text-decoration:none;display: inline-block;width: 68px;height: 38px;line-height: 38px;text-align: center;">登录</router-link></el-button> -->
        <!-- <el-button type="info" class="register_btn" ><router-link to="/register" style="color:#FFF;text-decoration:none;display: inline-block;width: 68px;height: 38px;line-height: 38px;text-align: center;">注册</router-link></el-button> -->
        <el-button type="info" class="tuichu" @click="tc">退出</el-button>
      </el-menu>
    </el-header>
    <div class="goodslist">
      <el-table :data="GoodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="图片" prop="picture"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="详情" prop="xq"></el-table-column>
        <el-table-column label="详情" prop="xq"></el-table-column>
        <el-table-column label="详细" prop="gd">
          <!-- eslint-disable-next-line -->
          <template slot-scope="scope">
            <!-- 获取每条数据的数据对象 -->
            <span @click="showEditDialog(scope.row.id)" class="span1">更多..</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog title="详细" :visible.sync="editDialogVisible" width="80%">
      <el-table :data="dtForm" border stripe>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="图片" prop="picture"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="详情" prop="xq"></el-table-column>
        <el-table-column label="微信" prop="vx"></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="collectFun">收藏</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取商品列表的参数对象
      queryInfo: {
        // query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 5,
      },
      GoodsList: [],
      //总数据条数
      total: 4,
      editDialogVisible: false,
      dtForm: [],
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('/show/byPage/1/2');
      console.log(res);
      // if (res.status !== '200') return this.$message.error('获取商品列表失败！');
      this.GoodsList = res.goods;
      this.pagenum = res.pagenum;
      this.total = res.total;
      // console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getGoodsList();
      console.log(newSize);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getGoodsList();
      // console.log(newPage);
    },
    tc() {
      this.$router.push('/login');
    },
    async showEditDialog(id) {
      this.editDialogVisible = true;
      //根据id查询单条数据
      const { data: res } = await this.$http.get('/show/findOne/showid');
      console.log(id);
      console.log(res);
      const arr = [];
      arr.push(res);
      // if (res.status !== 200) {
      //   return this.$message.error('查询详细信息失败');
      // }
      // res.split(',');
      // const resarr = Object.values(res);
      // console.log(resarr);
      this.dtForm = arr;
    },
    async collectFun(id) {
      const { data: res } = await this.$http.get('/show/collect/' + id);
      console.log(res);

      // if (res.status !== '200') {
      // return this.$message.error('收藏失败');
      // }
    },
    item1() {
      // this.$router.push('/home')
    },
    item2() {
      this.$router.push('/release');
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
  line-height: 38px;
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
.login_btn {
  position: absolute;
  right: 90px;
  top: 10px;
  box-sizing: border-box;
  padding: 0;
}
.register_btn {
  position: absolute;
  right: 0;
  top: 10px;
  padding: 0;
}
.goodslist {
  width: 80%;
  height: auto;
  position: absolute;
  right: 0;
  top: 100px;
}
.span1 {
  cursor: pointer;
}
.span1:hover {
  color: blue;
}
</style>
