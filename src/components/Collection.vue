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
    <div class="logo">我的收藏</div>
    <hr class="hr1" />
    <div class="goodslist">
      <el-table :data="collectGoodsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="图片" prop="picture"></el-table-column>
        <el-table-column label="价格" prop="price"></el-table-column>
        <el-table-column label="详情" prop="xq"></el-table-column>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      // 获取发布列表的参数对象
      queryInfo: {
        query: "",
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2,
      },
      // myGoodsList: [],
      //总数据条数
      total: 0,
      collectGoodsList: [],
    };
  },
  created() {
    this.getcollectGoodsList();
  },
  methods: {
    async getcollectGoodsList() {
      const { data: res } = await this.$http.get("", { params: this.queryInfo });
      if (res.meta.status !== 200) {
        return this.$message.error("获取收藏列表失败！");
      }
      this.collectGoodsList = res.data.collectgoods;
      this.total = res.data.total;
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize;
      this.getcollectGoodsList();
      // console.log(newSize);
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage;
      this.getcollectGoodsList();
      // console.log(newPage);
    },
    tc() {
      this.$router.push("/login");
    },
    item1() {
      this.$router.push("/home");
    },
    item2() {
      this.$router.push("/release");
    },
    item3() {
      this.$router.push("/myrelease");
    },
    item4() {
      // this.$router.push('/collection')
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
.logo {
  width: 160px;
  height: 50px;
  font-size: 30px;
  background-color: lightcoral;
  margin-left: 80px;
  margin-top: 50px;
  text-align: center;
  padding-top: 10px;
}
.hr1 {
  border-color: lightcoral;
}
</style>
