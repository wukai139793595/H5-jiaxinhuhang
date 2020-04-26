<template>
  <div class="order-detail">
    <nav-bar title="订单详情" :left="1"></nav-bar>
    <div class="order-detail-wrap">
      <div class="process">
        <span class="process-item" :class="{'active':(orderItem.demandStatus >0)}">
          <span class="icon-wrap">
            <i class="iconfont icon-chuli"></i>
          </span>
          <p>处理中</p>
        </span>
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus>1"
          src="@/assets/images/officialAccount/ellipsis.png"
          alt
        />
        <img class="ellipsis" v-else src="@/assets/images/officialAccount/ellipsis2.png" alt />
        <span class="process-item" :class="{'active':(orderItem.demandStatus>1)}">
          <span class="icon-wrap">
            <i class="iconfont icon-wancheng"></i>
          </span>
          <p>已完成</p>
        </span>
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus>2"
          src="@/assets/images/officialAccount/ellipsis.png"
          alt
        />
        <img class="ellipsis" v-else src="@/assets/images/officialAccount/ellipsis2.png" alt />
        <span class="process-item" :class="{'active':(orderItem.demandStatus>2)}">
          <span class="icon-wrap">
            <i class="iconfont icon-iconfontevaluate"></i>
          </span>
          <p>已评价</p>
        </span>
      </div>
      <div class="order-con">
        <div class="order">
          <div class="title">
            <span class="line"></span>
            <span class="word">订单情况</span>
          </div>
          <ul class="detail-box">
            <li class="detail">
              <span class="left-word">订单编号：</span>
              <span>{{orderItem.id}}</span>
            </li>
            <li class="detail">
              <span class="left-word">订单时间：</span>
              <span>{{orderItem.createTimeStr }}</span>
            </li>
            <li class="detail">
              <span class="left-word">订单产品：</span>
              <span>{{orderItem.productList|productConcat}}</span>
            </li>
            <li class="detail">
              <span class="left-word">产品数量：</span>
              <span>{{orderItem.count}}</span>
            </li>
            <li class="detail">
              <span class="left-word">产品规格：</span>
              <span>{{}}</span>
            </li>
            <li class="detail">
              <span class="left-word">总计费用：</span>
              <span>￥{{}}元</span>
            </li>
          </ul>
        </div>
        <div class="order">
          <div class="title">
            <span class="line"></span>
            <span class="word">接单情况</span>
          </div>
          <ul class="detail-box">
            <li class="detail">
              <span class="left-word">客户经理：</span>
              <span>{{manager}}</span>
            </li>
            <li class="detail">
              <span class="left-word">联系方式：</span>
              <span>{{tel}}</span>
            </li>
            <li class="detail">
              <span class="left-word">接单时间：</span>
              <span>{{receiveTime}}</span>
            </li>
          </ul>
        </div>
        <div class="order">
          <div class="title">
            <span class="line"></span>
            <span class="word">订单评价</span>
          </div>
          <div class="star-wrap">
            <van-rate :readonly="orderItem.isScore" v-model="orderItem.score" color="#ffe69c" size="30px"></van-rate>
          </div>
        </div>
      </div>
      <div class="btn-wrap">
        <button>提&nbsp;&nbsp;交</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Icon, Image, Col, Row, Rate } from "vant";
import { mapMutations } from "vuex";
import NavBar from "@/components/navBar/navBar.vue";
import { officialAccount, config } from "@/api/officialAccount";
import { getSessionStore } from "@/common/js/storage.js";
export default {
  components: {
    [Button.name]: Button,
    [Icon.name]: Icon,
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Rate.name]: Rate,
    NavBar
  },
  data() {
    return {
      process: 2,
      starValue: 3,
      orderNum: "JX384845949",
      orderTime: "2020.02.01 12:00",
      orderPro: "维护服务尊享版",
      orderCount: 7,
      orderSize: "包年",
      orderMoney: "12345",
      manager: "张某某",
      tel: "18374849393",
      receiveTime: "2020.02.04 12:00",
      orderItem: {
        id: 1,
        demandCode: "eee",
        consumerName: null,
        addrDistrict: null,
        addrStreet: null,
        fundingBudget: null,
        demandType: "2",
        description: null,
        demandStatus: "2",
        worksheetDate: null,
        createTime: null,
        worksheetDateStr: "2020.03.16 13:50",
        createTimeStr: "2020.03.11 00:00",
        productList: [],
        workOrderId: null,
        isScore: false,
        score: null
      }
    };
  },
  watch: {},
  computed: {},
  created() {
    let orderItem = getSessionStore("orderItem");
    if (orderItem) {
      this.orderItem = JSON.parse(orderItem);
    }
  },
  mounted() {},
  methods: {},
  filters: {
    productConcat (list) {
      return list?list.join(','):''
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/officialAccount/orderDetail.less";
</style>
