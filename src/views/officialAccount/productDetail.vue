<template>
    <div class="productDetail">
        <nav-bar title="产品详情" :left="1"  @shareHandle="shareHandle"></nav-bar><!--right="share"-->
        <div class="product-detail-wrap">
            <div class="title-wrap">
        <span class="title">
          <span class="line"></span>
          维护服务：
          <span class="type">{{productItem.picAddr?"":"尊享版"}}</span>
        </span>
                <span class="sale-volume">销量：{{productItem.orderNumber}}</span>
            </div>
            <div class="banner-wrap">
                <img src="@/assets/images/officialAccount/banner.png" alt/>
                <div class="product-detail-con">

                    <div class="zf expenses">
                        <span class="number">{{productList.details}}</span>
                    </div>
                    <!-- <div class="zf expenses">
                      <span class="dot"></span>
                      产品资费
                      <span class="number">199/月</span>
                    </div>-->
                    <!-- <div class="zf detail">
                      <span class="dot"></span>
                      产品详情：
                      <span class="number">{{productItem.details}}</span>
                    </div>-->
                </div>
            </div>
            <!-- <div class="product-detail-con server">
              <div class="zf expenses">
                <span class="dot"></span>
                承诺服务期：
                <span class="number">12个月</span>
              </div>
              <div class="zf detail">
                <span class="dot"></span>
                主要客户群：
                <span class="number">中小企业、厂区、园区等</span>
              </div>
            </div>-->
        </div>
        <div class="place-order">
            <div class="specification-wrap">
                <div class="specification">
                    规格：
                    <span>
            <span :class="['month',{active:payUnit=='month'}]" @click="changeServeType('month')">包月</span>
            <span :class="['year',{active:payUnit=='year'}]" @click="changeServeType('year')">包年</span>
          </span>
                </div>
                <div class="step">
                    <van-stepper class="v-stepper" v-model="value" min="1" max="8"/>
                </div>
            </div>
            <div class="order">
        <span class="money">
          金额
          <span class="rmb">
            ￥
            <span>{{productItem.price}}/{{productItem.optionValue}}</span>
          </span>
        </span>
                <span class="btn-wrap">
          <button @click="submitHandle">立即下单</button>
        </span>
            </div>
        </div>
        <van-popup v-model="show" round>
            <div class="order-res">
                <i
                        :class="['iconfont',{'icon-gongneng_chenggong':isSuccess,'icon-gongneng_cuowu':!isSuccess}]"
                ></i>
                <p>{{orderMsg}}</p>
            </div>
        </van-popup>
        <van-popup class="share-popup" v-model="showShare" position="bottom" round>
            <div class="share-wrap">
                <div class="title-wrap">
                    <h1>分享至</h1>
                </div>
                <ul class="share-box">
                    <li v-for="(item,index) in shareArr" :key="index">
                        <div class="icon-wrap">
                            <img :src="item.imgSrc" alt/>
                            <!-- <i :class="['iconfont',item.icon,item.color]"></i> -->
                        </div>
                        <p>{{item.word}}</p>
                    </li>
                </ul>
            </div>
        </van-popup>
    </div>
</template>
<script>
    import {Button, Icon, Image, Col, Row, Stepper, Dialog, Popup} from "vant";
    import {mapMutations} from "vuex";
    import NavBar from "@/components/navBar/navBar.vue";
    import {officialAccount, config} from "@/api/officialAccount";
    import {getSessionStore,setSessionStore} from "@/common/js/storage.js";
    export default {
        components: {
            [Button.name]: Button,
            [Icon.name]: Icon,
            [Image.name]: Image,
            [Row.name]: Row,
            [Col.name]: Col,
            [Stepper.name]: Stepper,
            [Popup.name]: Popup,
            NavBar
        },
        data() {
            return {
                value: "",
                payUnit:'month',//month为月，year年
                show: false,
                isSuccess: true,
                orderMsg: "",
                showShare: false,
                productItem: {},
                shareArr: [
                    {
                        imgSrc: require("@/assets/images/officialAccount/icon-wei.png"),
                        word: "微信好友"
                    },
                    {
                        imgSrc: require("@/assets/images/officialAccount/icon-pyq.png"),
                        word: "朋友圈"
                    },
                    {
                        imgSrc: require("@/assets/images/officialAccount/icon-qq.png"),
                        word: "QQ好友"
                    },
                    {
                        imgSrc: require("@/assets/images/officialAccount/icon-lj.png"),
                        word: "复制链接"
                    }
                ],
                productList:[],//产品月和年所有的数据
            };
        },
        watch: {},
        computed: {},
        created() {
            this.id = this.$route.query.id;
            this.reqProductInfo();
        },
        mounted() {
        },
        methods: {
            // 提交
            submitHandle() {
                this.productItem.num=this.value;
                setSessionStore('productList',[this.productItem]);//储存产品数据
                let query = {
                        id: this.productItem.id,
                        goodsId: this.productItem.goodsId
                }
                this.$router.push({
                    path: '/' + 'submitOrder',
                    query: query
                });
                /*Dialog.confirm({
                 title: "下单",
                 message: "确认下单"
                 }).then(() => {
                 setTimeout(() => {
                 this.show = true;
                 if (Math.random() > 0.5) {
                 this.isSuccess = true;
                 this.orderMsg = "支付成功！";
                 } else {
                 this.isSuccess = false;
                 this.orderMsg = "支付失败！";
                 }
                 setTimeout(() => {
                 this.show = false;
                 }, 2000);
                 });
                 });*/
            },
            // 分享
            shareHandle() {
                this.showShare = true;
            },
            //更改包年包月
            changeServeType(servetype) {
                this.payUnit=servetype;
                if(servetype=='month') this.productItem=this.productList.goodsList[0];
                if(servetype=='year') this.productItem=this.productList.goodsList[1];
            },
            async reqProductInfo(){
                let id = this.id;
                try {
                    let {data} = await this.$http({
                        type: 'get',
                        url: officialAccount.productInfo + "/" + 111,
                        data: {}
                    })
                    if (data.code == '0') {
                        this.productList=data.products;
                        this.productItem=data.products.goodsList[0];
                    } else {
                        this.$toast(data.msg)
                    }
                }
                catch (error) {

                }
            }
        }
    };
</script>
<style lang="less">
    @import "~@/assets/css/officialAccount/common.less";
</style>
<style lang="less" scoped>
    @import "~@/assets/css/officialAccount/productDetail.less";
</style>
