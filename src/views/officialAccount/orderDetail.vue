<template>
  <div class="order-detail">
    <nav-bar title="订单详情" :left="1"></nav-bar>
    <div class="order-detail-wrap">
      <div class="process">
        <!-- 待派单 -->
        <span
          class="process-item"
          v-if="orderItem.demandType!=3"
          :class="{'active':(orderItem.demandStatus > 0)}"
        >
          <span class="icon-wrap">
            <i class="iconfont icon-paisong"></i>
          </span>
          <p>待派单</p>
        </span>
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus>0 && orderItem.demandType!=3"
          src="@/assets/images/officialAccount/ellipsis.png"
          alt
        />
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus<1 && orderItem.demandType!=3"
          src="@/assets/images/officialAccount/ellipsis2.png"
          alt
        />
        <!-- 处理中 -->
        <span class="process-item" :class="{'active':(orderItem.demandStatus > 1)}">
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
        <!-- 已完成 -->
        <span class="process-item" :class="{'active':(orderItem.demandStatus >2)}">
          <span class="icon-wrap">
            <i class="iconfont icon-wancheng"></i>
          </span>
          <p>已完成</p>
        </span>
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus>2 && orderItem.demandType!=1 &&orderItem.demandType!=2"
          src="@/assets/images/officialAccount/ellipsis.png"
          alt
        />
        <img
          class="ellipsis"
          v-if="orderItem.demandStatus<=2 && orderItem.demandType!=1 &&orderItem.demandType!=2"
          src="@/assets/images/officialAccount/ellipsis2.png"
          alt
        />
        <!-- 已评价 -->
        <span
          class="process-item"
          v-if="orderItem.demandType!=1&&orderItem.demandType!=2"
          :class="{'active':(orderItem.isScore)}"
        >
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
              <i
                :class="['icon',{'icon-need':orderItem.demandType ==1},{'icon-need':orderItem.demandType ==2},{'icon-wei':orderItem.demandType ==3},{'icon-zhang':orderItem.demandType ==4}]"
              ></i>
              <span class="left-word">订单编号：</span>
              <span>{{orderItem.demandCode}}</span>
            </li>
            <li class="detail">
              <span class="left-word">下单时间：</span>
              <span>{{orderItem.createTimeStr }}</span>
            </li>
            <li class="detail">
              <span class="left-word">接单时间：</span>
              <span>{{orderItem.worksheetDateStr }}</span>
            </li>
            <li class="detail">
              <span class="left-word">客户名称：</span>
              <span>{{orderItem.consumerName }}</span>
            </li>
            <li class="detail">
              <span class="left-word">联系电话：</span>
              <span>{{orderItem.contactNumber }}</span>
            </li>
            <li class="detail">
              <span class="left-word">联系地址：</span>
              <span>{{orderItem.addrDistrict}}-{{orderItem.addrStreet}}</span>
            </li>
            <li class="detail">
              <span class="left-word">详细地址：</span>
              <span>{{orderItem.addrDetail }}</span>
            </li>
            <li class="detail">
              <span class="left-word">企业名称：</span>
              <span>{{orderItem.companyName}}</span>
            </li>
            <li class="detail">
              <span class="left-word">需求产品：</span>
              <span>{{orderItem.productList | productConcat}}</span>
            </li>
            <li class="detail">
              <span class="left-word">订单金额：</span>
              <span>￥{{orderItem.fundingBudget }}元</span>
            </li>
            <li class="detail">
              <span class="left-word">备注：</span>
              <span>{{orderItem.description }}</span>
            </li>
          </ul>
        </div>
        <div class="order" v-if="showScore">
          <div class="title">
            <span class="line"></span>
            <span class="word">订单评价</span>
          </div>
          <div class="star-wrap">
            <van-rate :readonly="!couldScore" v-model="orderItem.score" color="#ffe69c" size="30px"></van-rate>
          </div>
        </div>
      </div>
      <div class="btn-wrap" v-if="couldScore">
        <button :class="{'active':couldScore}" @click="submitHandle">提&nbsp;&nbsp;交</button>
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
      orderItem: {
        demandType: "",
        demandStatus: ""
        // id: 1,
        // demandCode: "eee",
        // consumerName: null,
        // addrDistrict: null,
        // addrStreet: null,
        // fundingBudget: null,
        // demandType: "2",
        // description: null,
        // demandStatus: "2",
        // worksheetDate: null,
        // createTime: null,
        // worksheetDateStr: "2020.03.16 13:50",
        // createTimeStr: "2020.03.11 00:00",
        // productList: [],
        // workOrderId: null,
        // isScore: false,
        // score: null
      },
      orderId: "" //当前订单的id
    };
  },
  watch: {},
  computed: {
    // 是否可以评价
    couldScore() {
      if (this.orderItem.isScore) {
        return false;
      }
      if (
        (this.orderItem.demandType == 3 || this.orderItem.demandType == 4) &&
        this.orderItem.demandStatus > 2
      ) {
        return true;
      } else {
        return false;
      }
    },
    showScore() {
      if (
        (this.orderItem.demandType == 3 || this.orderItem.demandType == 4) &&
        this.orderItem.demandStatus > 2
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.orderId = this.$route.query.id;
    console.log("this.orderId:", this.orderId);
    /*  let orderItem = getSessionStore("orderItem");
    if (orderItem) {
      this.orderItem = JSON.parse(orderItem);
    }*/
    this.orderDetail(); //获取详情
  },
  mounted() {},
  methods: {
    submitHandle() {
      if (!this.couldScore) {
        return;
      }
      this.orderScore();
    },
    async orderScore() {
      let params = {
        demandId: this.orderItem.id,
        score: this.orderItem.score
      };
      try {
        let { data } = await this.$http({
          type: "post",
          url: officialAccount.orderScore,
          // config: config.applicationJon,
          data: params
        });
        if (data.code == "0") {
          console.log(data);
          this.$router.go(-1);
        } else {
          this.$toast(data.msg);
        }
      } catch (error) {}
    },
    //订单详情
    async orderDetail() {
      let params = {
        demandId: this.orderId
      };
      try {
        let { data } = await this.$http({
          type: "get",
          url: officialAccount.orderDetail,
          config: config.applicationJon,
          data: params
        });
        if (data.code == "0") {
          this.orderItem = data.order;
        } else {
          this.$toast(data.msg);
        }
      } catch (error) {}
    }
  },
  filters: {
    productConcat(list) {
      if (list) {
        let str = list.reduce((pre, item, index) => {
          return pre + item.productName + "、";
        }, "");
        return str.substring(0, str.length - 1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/assets/css/officialAccount/orderDetail.less";
</style>
