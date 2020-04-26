<template>
	<div class="order">
		<nav-bar :title="title" :left="1"></nav-bar>
		<van-form @submit="handle_submit" class="v-form label-180">
			<van-field v-model="form.name" label="姓名：" placeholder="请输入您的姓名" required />
			<van-field v-model="form.addr " type="password" label="联系地址：" required>
				<div class="select" slot="input" >
					<a href="javascript:" @click="addrClick('addrDistrict')">{{form.addrDistrict}}</a>
					<a href="javascript:" @click="addrClick('addrStreet')">{{form.addrStreet}}</a>
				</div>
			</van-field>
			<van-field v-model="form.addrDetail" label="详细地址：" placeholder="请输入您的详细地址" />
			<van-field v-model="form.mobile" type="tel" label="手机号码：" placeholder="请输入您的手机号码" maxlength="11" required />
			<van-field v-model="form.yzm" label="验证码：" placeholder="请输入您的验证码" maxlength="6" required>
				<send-msg @on-run="handle_send" ref="send" slot="button"></send-msg>
			</van-field>
		</van-form>
		<div class="v-footer">
			<van-button round block @click="handle_submit">提 交</van-button>
		</div>
		<van-popup v-model="layer.addr" position="bottom" class="v-popup">
			<van-picker show-toolbar v-if="nowColumns.length>0" :columns="nowColumns" @change="addr_change" @cancel="layer.addr = false" @confirm="addr_confirm" />
		    <div class="pickerTip" v-else>暂无数据</div>
        </van-popup>
		<share :show.sync="showshare"/>
	</div>
</template>
<script>
	const citys = {
		'嘉兴': ['杭州', '宁波', '温州', '嘉兴', '湖州'],
		'福建': ['福州', '厦门', '莆田', '三明', '泉州']
	};
	import {
		Button,
		Form,
		Field,
		Picker,
		Popup
	} from "vant";
	import {reg} from '@/mixins'
	import {
		mapMutations
	} from "vuex";
	import NavBar from "@/components/navBar/navBar.vue";
	import sendMsg from "@/components/sendMsg.vue";
	import share from "@/components/share.vue";
    import { officialAccount,config } from "@/api/officialAccount/";
    import {getSessionStore,setSessionStore} from "@/common/js/storage.js";
	export default {
		components: {
			[Button.name]: Button,
			[Form.name]: Form,
			[Field.name]: Field,
			[Picker.name]: Picker,
			[Popup.name]: Popup,
			NavBar,
			sendMsg,
			share
		},
		mixins: [reg],
		data() {
			return {
                userId:'',//是个人用户还是客户经理,4为客户经理，0为用户，5为工程师
			    title:'完善信息',
				// 表单
				form: {
                    name:'',
                    addr:'',
                    addrDistrict :'',
                    addrStreet :'',
                    addrDetail:'',
                    mobile :'',
                    yzm:'',
				},
				layer: {
					addr: false
				},

                nowPropText:'',//当前弹框的属性文字标识
                districtsColumns: [],//区域数据
                districtsData: {},//当前区域数据
                streetsColumns: [],//街道数据
                streetsData: [],//当前街道数据
                nowColumns:[],//当前地址弹框数据
				showshare:false
			};
		},
		watch: {},
		computed: {},
		mounted() {
            this.getNowUser();
//            this.getDistrictsName();
          /*  this.getStreetsName();
            this.getStreetsByDistrictId();*/
		},
		methods: {
		    //获取用户信息
            async getNowUser(){
                this.userId=window.localStorage.getItem('userId');
                let userType=this.userId=='0'?1:2;//1为普通用户 2为管理用户
                let params = {
                    userType:userType
                }
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getNowUser,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                    });
                    if(data.code == '0') {
                        for(let key in data.user){
                            this.form[key]=data.user[key];
                        }
                        this.districtsData.id = this.form.addrDistrictId;
                    }else{
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
             },
            //获取区域信息
            async getDistrictsName(){
                let params = {}
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getDistrictsName,     // 主求Url 在上面api中进行配置
                        data:params
                    });
                    if(data.code == '0') {
                        data.districts.forEach(function(item, index, arr1) {
                            item.text = item.areaName;
                        })
                        this.districtsColumns=data.districts;
                        this.nowColumns=this.districtsColumns;
                    }else{
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //获取街道信息
            async getStreetsName(){
                let params = {
                }
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getStreetsName,     // 主求Url 在上面api中进行配置
                    });
                    if(data.code == '0') {

                    }else{
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //根据区域id获取街道
            async getStreetsByDistrictId(){
                let params = {
                    districtId:this.districtsData.id,
                }
                try {
                    let { data } = await this.$http({
                        type: 'get',       // 请求类型
                        url: officialAccount.getStreetsByDistrictId,     // 主求Url 在上面api中进行配置
                        data:params
                    });
                    if(data.code == '0') {
                        data.streets.forEach(function(item, index, arr1) {
                            item.text = item.areaName;
                        })
                        this.streetsColumns=data.streets;
                        this.nowColumns=this.streetsColumns;
                    }else{
                        this.$toast.fail(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(error)
                }
            },
            //联系地址中选项事件
            addrClick(part){
                this.layer.addr=true;
                this.nowPropText=part;
                this.nowColumns=[];
                if(part=='addrDistrict') this.getDistrictsName();
                else if(part=='addrStreet') this.getStreetsByDistrictId();
            },
			// 提交
			handle_submit() {
				// this.showshare=true;
				if(!this.form.name){
					this.$toast({
						message:'请输入您的姓名！',
					})
					return false;
				}
				if(this.form.addrDistrict=='请选择'||this.form.addrStreet=='请选择'){
					this.$toast({
						message:'请输入您的联系地址！',
					})
					return false;
				}
				if(!this.form.mobile){
					this.$toast({
						message:'请输入您的手机号码！',
					})
					return false;
				}
				if(!this.isTel(this.form.mobile)){
					this.$toast({
						message:'请输入正确的手机号码！',
					})
					return false;
				}
				if(!this.form.yzm){
					this.$toast({
						message:'请输入您的验证码！',
					})
					return false;
				}
				// this.$toast({
				// 	type:'html',
				// 	message:'<i class="iconfont icon-gongneng_chenggong"></i><p>支付成功！</p>',
				// 	className:'v-success',
				// });
				// this.$toast({
				// 	type:'html',
				// 	message:'<i class="iconfont icon-gongneng_cuowu"></i><p>支付失败！</p>',
				// 	className:'v-error',
				// });
                this.updUserInfo();
			},
            async updUserInfo(){
                // 2 请求参数
//                let params = this.form;
                let params={
                    id:this.form.id,
                    name:this.form.name,
                    yzm:this.form.yzm,
                    mobile:this.form.mobile,
                    addrDistrict:this.form.addrDistrict,
                    addrDistrictId:this.form.addrDistrictId,
                    addrStreet:this.form.addrStreet,
                    addrStreetId:this.form.addrStreetId,
                    addrDetail:this.form.addrDetail,
                    userType:this.form.userType,
                };
                try {
                    let { data } = await this.$http({
                        type: 'post',       // 请求类型
                        url: officialAccount.updUserInfo,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                        config: config.applicationJon
                    });
                    if(data.code == '0') {
                        this.$toast({
                            message:data.msg
                        })
                        this.$router.push({
                            path: '/' + 'index',
                        });
                    }else{
                        this.$toast(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(errow);
                }
            },
			// 地市更改
			addr_change(picker, values) {
				picker.setColumnValues(1, citys[values[0]]);
			},
			// 地市确认
			addr_confirm(value, index) {
                console.log('value:',value)
                if(this.nowPropText=='addrDistrict') this.districtsData=value;
                if(this.nowPropText=='addrStreet') this.streetsData=value;
				this.form[this.nowPropText+'Id'] = value.id;
				this.form[this.nowPropText] = value.text;
				this.layer.addr = false;
			},
			handle_send(){
				if(!this.form.mobile){
					this.$toast({
						message:'请输入您的手机号码！',
					})
					return false;
				}
				if(!this.isTel(this.form.mobile)){
					this.$toast({
						message:'请输入正确的手机号码！',
					})
					return false;
				}
				this.$refs.send.start();
				this.verificationCode();
			},
            //发送知道接口
            async verificationCode(){
                try {
                    let params={mobile:this.form.mobile};
                    let { data } = await this.$http({
                        type: 'post',       // 请求类型
                        url: officialAccount.verificationCode,     // 主求Url 在上面api中进行配置
                        data: params,       // 请求参数
                        config: config.applicationJon
                    });
                    if(data.code == '0') {
                        this.$toast('验证码发送成功！');
                    }else{
                        this.$toast(data.msg);
                    }
                } catch (error) {
                    // 接口返回错误 会跑到这里
                    console.log(errow);
                }
            },
		}
	};
</script>
<style lang="less">
	@import "~@/assets/css/officialAccount/common.less";
</style>
<style lang="less" scoped>
	@import "~@/assets/css/officialAccount/info.less";
</style>
