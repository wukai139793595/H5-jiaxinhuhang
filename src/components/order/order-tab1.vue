<!--  -->
<template>
  <div class="tab">
    <ul class="tab-box">
      <li v-for="(item,index) in orderArr" :key="index">
        <h1>
          <span class="icon-wrap">
            <span class="order-number">订单编号：{{item.orderNumber}}</span>
          </span>
          <i class="share" @click="showShare"></i>
        </h1>
        <div class="detail">
          <p>
            <span class="img-wrap">
              <img src="@/assets/images/officialAccount/dot.png" alt />
              <span>{{item.addrDistrict}}.{{item.addrStreet}}</span>
            </span>
            <span class="money">¥234</span>
          </p>
          <div class="order-item">下单时间：{{item.worksheetDateStr}}</div>
          <div class="order-item">需求产品：{{item.product}}</div>
          <div class="order-item">客户名称：{{item.consumerName}}</div>
          <div class="btn-wrap">
            <button :class="{'active':item.active}">抢&nbsp;&nbsp;单</button>
          </div>
        </div>
      </li>
    </ul>
    <share :show.sync="show"/>
  </div>
</template>

<script>
import Share from "@/components/share.vue";
export default {
  props: ["statusText"],
  components: {
      Share
  },
  data() {
    return {
        show:false,
      orderArr: [
        {
          statusOrder: 1,
          orderNumber: "JX384845949",
          city: "嘉善县",
          street: "魏塘街道",
          placeTime: "2020.02.01 12:00",
          grabTime: "2020.02.21 12:00",
          product: "电脑、交换机......",
          name: "王先生",
          active:0
        },
        {
          statusOrder: 2,
          orderNumber: "JX384845949",
          city: "嘉善县",
          street: "魏塘街道",
          placeTime: "2020.02.01 12:00",
          grabTime: "2020.02.21 12:00",
          product: "电脑、交换机......",
          name: "王先生",
           active:1
        },
        {
          statusOrder: 3,
          orderNumber: "JX384845949",
          city: "嘉善县",
          street: "魏塘街道",
          placeTime: "2020.02.01 12:00",
          grabTime: "2020.02.21 12:00",
          product: "电脑、交换机......",
          name: "王先生",
          active:1
        }
      ]
    };
  },
  computed: {},
  watch: {},
  methods: {
      showShare () {
          this.show = true;
      }
  },
  created() {},
  mounted() {},
  beforeCreate() {}, //生命周期 - 创建之前
  beforeMount() {}, //生命周期 - 挂载之前
  beforeUpdate() {}, //生命周期 - 更新之前
  updated() {}, //生命周期 - 更新之后
  beforeDestroy() {}, //生命周期 - 销毁之前
  destroyed() {}, //生命周期 - 销毁完成
  activated() {} //如果页面有keep-alive缓存功能，这个函数会触发
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.tab {
  .tab-box {
    li {
      width: 700px;
      height: 409px;
      margin: 34px auto;
      background-size: 100% 100%;
      background-image: url("~@/assets/images/officialAccount/order-bg.png");
      .icon {
        width: 48px;
        height: 35px;
        display: inline-block;
        background-repeat: no-repeat;
        background-size: 100%;
      }
      .icon-need {
        background-image: url("~@/assets/images/officialAccount/icon-need.png");
      }
      .icon-wei {
        background-image: url("~@/assets/images/officialAccount/icon-w.png");
      }
      .icon-zhang {
        background-image: url("~@/assets/images/officialAccount/icon-zhang.png");
      }
      h1 {
        padding: 16px 30px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .icon-wrap {
          display: flex;
          align-items: center;
          .order-number {
            color: #cbcff3;
            font-size: 28px;
            margin-left: 6px;
          }
        }
        .deal {
          color: #fbd38b;
          font-size: 28px;
        }
        .share {
          display: inline-block;
          width: 36px;
          height: 36px;
          background-image: url("~@/assets/images/officialAccount/icon-share.png");
          background-size: 100%;
        }
      }
      .detail {
        margin-top: 32px;
        padding: 0 30px;
        p {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .img-wrap {
            display: flex;
            img {
              width: 26px;
              height: 34px;
              margin-right: 8px;
            }
            span {
              color: #cbcff3;
              font-size: 30px;
            }
          }
          .money {
            color: #fbd38b;
            font-size: 36px;
          }
        }
        .order-item {
          color: #cbcff3;
          font-size: 28px;
          padding: 4px 0;
        }
        .btn-wrap {
          text-align: center;
          button {
            width: 375px;
            height: 74px;
            text-align: center;
            line-height: 74px;
            background-color: #c2c2c2;
            color: #201d56;
            border-radius: 40px;
            margin-top: 12px;
          }
          .active {
            background: linear-gradient(to bottom, #ffe69c 0%, #f6b977 100%);
            color: #201d56;
          }
        }
      }
    }
  }
}
</style>