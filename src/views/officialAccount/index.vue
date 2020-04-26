<template>
    <div class="index">
        <nav-bar title="首页" :left="0"></nav-bar>
        <van-notice-bar  class="scrollTip" :text="scrollText"  />
        <div class="partList">
            <div :class="['part',{selcted:partNum==index}]" v-for="(item,index) in partList" :key="index" @click="partClick(index)">
                <img :src="item.imgUrl" />
                <span class="text">{{item.text}}</span>
            </div>
        </div>
        <div class="linkage">
            <!--找产品-->
            <!--<Product v-if="partNum==0" :productList="productList" :isQuote="true" :partNum="partNum"  @isProduct="isProduct"></Product>-->
            <Product v-if="partNum==0"  :partNum="partNum"  @isProduct="isProduct"></Product>
            <!--发需求-->
            <Demand v-else :partNum="partNum"></Demand>
        </div>
    <!--   <div class="info" v-show="showInfo">
            <SubmitOrder :isQuote="true" :partNum="partNum" ></SubmitOrder>
        </div>-->
    </div>
</template>
<script>
    import {NoticeBar} from "vant";
    import {mapMutations} from "vuex";
    import NavBar from "@/components/navBar/navBar.vue";
    import Product from "@/views/officialAccount/product.vue";
    import Demand from "@/views/officialAccount/demand.vue";
    import SubmitOrder from "@/views/officialAccount/submitOrder.vue";
    import { officialAccount,config } from "@/api/officialAccount/";
    import { setSessionStore } from "@/common/js/storage.js"
    export default {
        components: {
            [NoticeBar.name]: NoticeBar,//滚动文字
            NavBar,//导航
            Product,//产品
            Demand,//发需求和报故障的页面
            SubmitOrder,//提交订单
        },
        data() {
            return {
                scrollText:'',
                partNum:0,//0为找产品，1为发需求，2为报故障
                partList:[
                    {imgUrl:require('@/assets/images/officialAccount/index/part1.png'),text:'找产品'},
                    {imgUrl:require('@/assets/images/officialAccount/index/part2.png'),text:'发需求'},
                    {imgUrl:require('@/assets/images/officialAccount/index/part3.png'),text:'报故障'},
                ],
                productList:[
                    {imgUrl:require('@/assets/images/officialAccount/index/product1.png'),title:'维护服务定制版',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product2.png'),title:'维护服务尊享版',price:'199',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product3.png'),title:'维护服务标准版',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product4.png'),title:'维护服务全屋wifi版',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product5.png'),title:'维护服务基础版',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product6.png'),title:'云服务',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product7.png'),title:'云形象',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product8.png'),title:'云工作',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product9.png'),title:'云主机',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product10.png'),title:'智慧会议盒子',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product11.png'),title:'智慧无人前台',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product12.png'),title:'全屋wifi',price:'2000',checked:false},
                    {imgUrl:require('@/assets/images/officialAccount/index/product13.png'),title:'天翼对讲',price:'45',checked:false,unit:'/月'},
                    {imgUrl:require('@/assets/images/officialAccount/index/product14.png'),title:'云监控',price:'2000',checked:false},
                ],
                productData:{},//产品数据
                newProductList:[],//产品列表
                pageData:{},//分页
                showInfo:false,//是否显示信息
            };
        },
        watch: {
		},
        computed: {},
        mounted() {
            this.orderInfo();//订购滚动信息
        },
        methods: {
            partClick(num){
              this.partNum=num;
                if(this.partNum!=0) this.showInfo=true;
                else this.showInfo=false;;
            },
            productSelect(item){
                item.checked=!item.checked;
                this.isProduct();
            },
            isProduct(){
                for(let value of this.productData.list){
                    if(value.checked) {
                        this.showInfo=true;
                        return;
                    }else{
                        this.showInfo=false;
                    }
                }
            },
            //订购信息滚动显示查询
            async orderInfo(){
                // 2 请求参数
                let params = {};
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.orderInfo,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                        config: config.applicationJon
                    });
                    if(data.code == '0') {
                        this.scrollText=data.list.join(' ');
                    }else{
                        this.$toast(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                }
            },
            //货品分页列表查询
            async productInfoList(){
                // 2 请求参数
                let params = {
                    /* username: this.loginForm.username,
                     password: this.loginForm.pwd,
                     smsCode: this.loginForm.pwdMsg*/
                }
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.productList,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                    });
                    if(data.code == '0') {
//                        this.newProductList=data.page;
                        data.page.list.forEach(function(element,index,arr1){
                            element.checked = false;
                        })
                        this.productData=data.page;
                    }else{
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //产品库--提交订单
            async saveOrder(){
                // 2 请求参数
                let params = {
                    /* username: this.loginForm.username,
                     password: this.loginForm.pwd,
                     smsCode: this.loginForm.pwdMsg*/
                }
                try {
                    let { data } = await this.$http({
                        type: 'post',       // 请求类型
                        url: officialAccount.saveOrder,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                        config: config.applicationJon
                    });
                    if(data.code == '0') {

                    }
                    console.log(data)

                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
        }
    };
</script>
<style lang="less" scoped>
    @import "~@/assets/css/officialAccount/index.less";
</style>
