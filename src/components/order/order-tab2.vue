<!--  -->
<template>
  <div class="tab">
    <ul class="tab-box">
      <li v-for="(item,index) in orderArr" :key="index" @click="to_order_detail(item)">
        <h1>
          <span class="icon-wrap">
            <i
              :class="['icon',{'icon-need':item.demandType ==1},{'icon-need':item.demandType ==2},{'icon-wei':item.demandType ==3},{'icon-zhang':item.demandType ==4}]"
            ></i>
            <span class="order-number">订单编号：{{item.demandCode }}</span>
          </span>
          <span class="deal">{{statusText}}</span>
        </h1>
        <div class="detail">
          <p>
            <span class="img-wrap">
              <img src="@/assets/images/officialAccount/dot.png" alt />
              <span>{{item.addrDistrict }}.{{item.addrStreet }}</span>
            </span>
            <span class="money">¥{{item.fundingBudget }}</span>
          </p>
          <div class="order-item">下单时间：{{item.createTimeStr  }}</div>
          <div class="order-item">接单时间：{{item.worksheetDateStr }}</div>
          <div class="order-item">需求产品：{{item.productList|productConcat }}</div>
          <div class="order-item">客户名称：{{item.consumerName }}</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import {setSessionStore} from "@/common/js/storage.js"
export default {
  props:['statusText','orderArr'],
  components: {},
  data() {
    return {
      // orderArr: [
      //   {
      //     statusOrder: 1,
      //     orderNumber: "JX384845949",
      //     city: "嘉善县",
      //     street: "魏塘街道",
      //     placeTime: "2020.02.01 12:00",
      //     grabTime: "2020.02.21 12:00",
      //     product: "电脑、交换机......",
      //     name: "王先生"
      //   },
      //   {
      //     statusOrder: 2,
      //     orderNumber: "JX384845949",
      //     city: "嘉善县",
      //     street: "魏塘街道",
      //     placeTime: "2020.02.01 12:00",
      //     grabTime: "2020.02.21 12:00",
      //     product: "电脑、交换机......",
      //     name: "王先生"
      //   },
      //   {
      //     statusOrder: 3,
      //     orderNumber: "JX384845949",
      //     city: "嘉善县",
      //     street: "魏塘街道",
      //     placeTime: "2020.02.01 12:00",
      //     grabTime: "2020.02.21 12:00",
      //     product: "电脑、交换机......",
      //     name: "王先生"
      //   }
      // ]
    };
  },
  computed: {},
  watch: {},
  methods: {
    to_order_detail (item) {
      setSessionStore('orderItem',item);
      this.$router.push({path:'/orderDetail',query:{id:item.id}})
    }
  },
  created() {},
  mounted() {},
  filters: {
    productConcat (list) {
        let nameStr='';
        for(let item of list) nameStr+=item.productName+"、";
        nameStr = nameStr.substring(0,(nameStr.length-1))
      return nameStr;
    }
  }
};
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.tab {
  .tab-box {
    li {
      width: 700px;
      height: 353px;
      margin: 34px auto;
      background-size: 100% 100%;
      background-image: url("~@/assets/images/officialAccount/order-bg.png");
      .icon{
          width: 48px;
          height: 35px;
          display: inline-block;
          background-repeat: no-repeat;
          background-size: 100%;
      }
      .icon-need{
          background-image:url("~@/assets/images/officialAccount/icon-need.png");
      }
      .icon-wei{
          background-image:url("~@/assets/images/officialAccount/icon-w.png")
      }
      .icon-zhang{
          background-image:url("~@/assets/images/officialAccount/icon-zhang.png")
      }
      h1{
          padding: 16px 30px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .icon-wrap{
              display: flex;
              align-items: center;
            .order-number{
                color: #cbcff3;
                font-size: 28px;
                margin-left: 6px;
            }
          }
          .deal{
              color: #fbd38b;
              font-size: 28px;
          }
      }
      .detail{
          margin-top: 32px;
          padding: 0 30px;
          p{
              display: flex;
              justify-content: space-between;
              align-items: center;
                .img-wrap{
                    display: flex;
                    img{
                        width: 26px;
                        height: 34px;
                        margin-right: 8px;
                    }
                    span{
                        color: #cbcff3;
                        font-size: 30px;
                    }
                }
                .money{
                    color: #fbd38b;
                    font-size: 36px;
                }
          }
          .order-item{
              color: #cbcff3;
              font-size: 28px;
              padding: 4px 0;
          }
      }
    }

  }
}
</style>