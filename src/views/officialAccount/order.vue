<template>
  <div class="order">
    <nav-bar title="我的订单" :left="1"></nav-bar>
      <div class="order-wrap" v-if="userId=='0'">
          <van-tabs v-model="active" class="v-tabs">
              <van-tab title="处理中">
                  <order-tab2 statusText="处理中" :orderArr="clzList"></order-tab2>
              </van-tab>
              <van-tab title="已完成">
                  <order-tab2 statusText="已完成" :orderArr="clwcList"></order-tab2>
              </van-tab>
          </van-tabs>
      </div>
      <div class="order-wrap" v-else>
      <van-tabs v-model="active" class="v-tabs">
        <van-tab title="抢  单">
          <div class="developing">该板块正在开发中。。。</div>
          <!-- <order-tab1 statusText="抢单"></order-tab1> -->
        </van-tab>
        <van-tab title="处理中">
          <order-tab2 statusText="处理中" :orderArr="clzList"></order-tab2>
        </van-tab>
        <van-tab title="已完成">
          <order-tab2 statusText="已完成" :orderArr="clwcList"></order-tab2>
        </van-tab>
      </van-tabs>
    </div>
      </div>
</template>
<script>
import { Button, Icon, Image, Col, Row, Tab, Tabs } from "vant";
import { mapMutations } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";
import { officialAccount, config } from "@/api/officialAccount";
import orderTab1 from "@/components/order/order-tab1.vue";
import orderTab2 from "@/components/order/order-tab2.vue";
import {getSessionStore} from "@/common/js/storage.js";
export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs,
    NavBar,
    orderTab1,
    orderTab2
  },
  data() {
    return {
      userId:'',//是否是用户
      active: 0,
      clzList: [], //处理中订单
      clwcList: [] //处理完成订单,
    };
  },
  watch: {},
  computed: {},
  mounted() {
      this.userId=window.localStorage.getItem('userId');
      this.orderSysList();
  },
  methods: {
    // 用户 订单列表
    async orderList() {
      try {
        let { data } = await this.$http({
          type: "get",
          url: officialAccount.orderList,
          data: {}
        });
        if (data.code == 0) {
          this.clzList = data.clzList;
          this.clwcList = data.clwcList;
        } else {
          this.$toast.fail(data.msg);
        }
      } catch (error) {
        console.log("error", error);
      }
    },
    // 客户经理 订单列表
    async orderSysList() {
        let linkUrl=this.userId=='0'?officialAccount.orderList:officialAccount.orderSysList;//orderList-用户   orderSysList-客户经理
      try {
        let { data } = await this.$http({
          type: "get",
          url: linkUrl,
          data: {}
        });
        if (data.code == 0) {
          this.clzList = data.clzList;
          this.clwcList = data.clwcList;
        } else {
          this.$toast.fail(data.msg);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/officialAccount/order.less";
.developing{
  padding-top: 100px;
  font-size: 30px;
  color: #fff;
  text-align: center;
}
</style>
