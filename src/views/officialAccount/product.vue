<template>
	<div :class="['product',{isQuote:isQuote}]">
		<nav-bar v-if="!isQuote" title="产品" :left="1"></nav-bar>
		<van-notice-bar v-if="!isQuote" class="scrollTip" :text="scrollText" />
		<div class="productList" v-if="!partNum || partNum==0">
			<div class="perProduct" v-for="(item,index) in productData.list" :key="index" @click="to_product_detail(item)">
				<img v-if="index%2==0" :src="item.picAddr?item.picAddr:require('@/assets/images/officialAccount/index/product1.png')" />
				<img v-else :src="item.picAddr?item.picAddr:require('@/assets/images/officialAccount/index/product2.png')" />
				<div class="script">
					<div class="title">{{item.productName}}</div>
					<!--<div class="unit">&yen;<span class="num">{{item.price}}</span>{{item.unit}}</div>-->
					<div class="unit">&yen;<span class="num">{{item.price}}</span>{{item.option_value}}</div>
					<div class="btn" @click.stop="linkFun(item)">立即下单</div>
				</div>
				<div :class="['checkSign',{active:item.checked}]" @click.stop="productSelect(item)"></div>
			</div>
		</div>
		<div class="info" v-show="showInfo">
		    <SubmitOrder :isQuote="true" :partNum="partNum" :productList="productData.list"></SubmitOrder>
		</div>
	</div>
</template>
<script>
	import {
		NoticeBar
	} from "vant";
	import NavBar from "@/components/navBar/navBar.vue";
	import SubmitOrder from "@/views/officialAccount/submitOrder.vue";
	import { officialAccount,config } from "@/api/officialAccount/";
	import { setSessionStore } from "@/common/js/storage.js"
	export default {
		components: {
			[NoticeBar.name]: NoticeBar, //滚动文字
			NavBar,
			SubmitOrder
		},
		props: [
			'partNum', //0为找产品，1为发需求，2为报故障
		],
		data() {
			return {
				isQuote:'',//是否是产品库
				showInfo:false,//是否展示信息
				productData:{},//产品数据
				currentList: [{
						imgUrl: require('@/assets/images/officialAccount/index/product1.png'),
						title: '维护服务定制版',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product2.png'),
						title: '维护服务尊享版',
						price: '199',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product3.png'),
						title: '维护服务标准版',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product4.png'),
						title: '维护服务全屋wifi版',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product5.png'),
						title: '维护服务基础版',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product6.png'),
						title: '云服务',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product7.png'),
						title: '云形象',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product8.png'),
						title: '云工作',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product9.png'),
						title: '云主机',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product10.png'),
						title: '智慧会议盒子',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product11.png'),
						title: '智慧无人前台',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product12.png'),
						title: '全屋wifi',
						price: '2000',
						checked: false
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product13.png'),
						title: '天翼对讲',
						price: '45',
						checked: false,
						unit: '/月'
					},
					{
						imgUrl: require('@/assets/images/officialAccount/index/product14.png'),
						title: '云监控',
						price: '2000',
						checked: false
					},
				],
				scrollText: '177****1234用户成功订购维护服务尊享版  177****1234用户成功订购维护服务尊享版',
			};
		},
		watch: {
			partNum(val) {
			    if(val==0) this.shoInfo=false;
			}
		},
		computed: {},
		mounted() {
			let curPath=this.$route.path;
			if(curPath=='/product') this.isQuote=false;
			else this.isQuote=true;
			this.productInfoList();
		},
		methods: {
			// 跳转到产品详情
			to_product_detail (item) {
				setSessionStore('productItem',item);
				this.$router.push({path:'/productDetail',query:{id:item.id}})
			},
			//跳转链接
			linkFun(item) {
				setSessionStore('productList',[item]);//储存产品数据
				let query = {};
				if (item) {
					query = {
						id: item.id,
						goodsId: item.goodsId
					}
				}
				this.$router.push({
					path: '/' + 'submitOrder',
					query: query
				});
			},
			//货品分页列表查询
			async productInfoList() {
				// 2 请求参数
				let params = {
					page:1,
					limit:10,
				}
				try {
					let {data} = await this.$http({
						type: 'get', // 请求类型
						url: officialAccount.productList, // 主求Url 在上面api中进行配置
						data: params, // 请求参数
					});
					if (data.code == '0') {
						data.page.list.forEach(function(element, index, arr1) {
							element.checked = false;
						})
						this.productData = data.page;
					} else {
						this.$toast.fail(data.msg);
					}
				} catch (error) {
					console.log(error)
				}
			},
			//判断是否有选中的产品
			isProduct(){
			    if(window.localStorage.getItem('userId')=='4' || window.localStorage.getItem('userId')=='0'){//客户经理和用户可以操作下单，
                    for(let value of this.productData.list){
                        if(value.checked) {
                            this.showInfo=true;
                            return;
                        }else{
                            this.showInfo=false;
                        }
                    }
                }
			},
			//产品选中
			productSelect(item) {
				this.$notify({
					type: 'primary',
					message: '选中产品后，下方有完善信息可提交！',
					duration: 1000
				});
				item.checked = !item.checked;
				this.isProduct();
			},
		}
	};
</script>
<style lang="less" scoped>
	@import "~@/assets/css/officialAccount/product.less";
</style>
