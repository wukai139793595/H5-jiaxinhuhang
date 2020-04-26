<template>
	<div class="demand">
        <div class="margin">
            <van-row gutter="10" class="flex3">
                <van-col span="8" v-for="(item,index) in productList" :key="index">
					<div class="img-wrap">
                    	<img :src="item.picAddr?item.picAddr:require('@/assets/images/officialAccount/demand/pro'+(index+1)+'.png')">
					</div>
                    <div class="title">{{item.productName}}</div>
                    <div :class="['checkSign',{active:item.checked}]" @click="item.checked=!item.checked"></div>
                </van-col>
            </van-row>
        </div>
        <div class="info" v-if="showInfo">
            <SubmitOrder :isQuote="true" :partNum="partNum" :productList="productList"></SubmitOrder>
        </div>
	</div>
</template>
<script>
	import {
		Col,
		Row
	} from 'vant';
	import {
		officialAccount,
		config
	} from "@/api/officialAccount/";
    import SubmitOrder from "@/views/officialAccount/submitOrder.vue";
    import prefixAPI from "@/api/prefixAPI";
	export default {
		components: {
			[Col.name]: Col,
			[Row.name]: Row,
            SubmitOrder
		},
		data() {
			return {
			    showInfo:false,
				productList: [{
						imgUrl: require('@/assets/images/officialAccount/demand/product1.png'),
						title: '笔记本电脑',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product2.png'),
						title: '交换机',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product3.png'),
						title: '路由器',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product4.png'),
						title: '打印机',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product5.png'),
						title: '网络',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product6.png'),
						title: 'WiFi',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product7.png'),
						title: '服务器',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/demand/product8.png'),
						title: '其他',
						checked: false
					},
				]
			};
		},
        props: [
            'partNum', //0为找产品，1为发需求，2为报故障
        ],
		watch: {
            partNum(val) {
                console.log('val:',val)
                this.getProduct();
                if(window.localStorage.getItem('userId')=='0'){
                    this.showInfo=true;
                }
            }
        },
		computed: {},
		mounted() {
			this.getProduct();
		},
		created() {
            if(window.localStorage.getItem('userId')=='0'){
                this.showInfo=true;
            }
		},
		methods: {
			testClick(item){
				this.testList.forEach(function(value,index,arr1){
					value.isBg=false;
                });
				item.isBg=!item.isBg;
			},
			//发需求报故障
			async getProduct() {
				let params = {
					appSceFlag:1
				};
				try {
				    let { data } = await this.$http({
				        type: 'get',       // 请求类型
				        url: officialAccount.getProductsOneByAppSceFlag,     // 主求Url 在上面api中进行配置
				        data: params,       // 请求参数
				    });
				    if(data.code == '0') {
						data.products.forEach(function(element,index,arr1){
						    element.checked = false;
						    element.picAddr= element.picAddr?prefixAPI.hp+'/img/'+element.picAddr:'';
						})
				       this.productList=data.products;
						console.log('productList_pic:',this.productList)
				    }else{
				        this.$toast(data.msg);
				    }
				} catch (error) {
				    // 接口返回错误 会跑到这里
				    console.log(error);
				}
			}
		}
	};
</script>
<style lang="less" scoped>
	@import "~@/assets/css/officialAccount/demand.less";
</style>
