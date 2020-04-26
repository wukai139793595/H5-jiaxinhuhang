<template>
	<van-popup v-model="showShare" position="bottom" class="v-share">
		<h3 class="v-share-title">分享至</h3>
		<van-row>
			<van-col span="6">
				<div class="img">
					<i class="iconfont icon-iconfontzhizuobiaozhunbduan32"></i>
				</div>
				<p class="txt">微信好友</p>
			</van-col>
			<van-col span="6">
				<div class="img">
					<svg class="v-icon" aria-hidden="true">
						<use xlink:href="#icon-pengyouquan"></use>
					</svg>
				</div>
				<p class="txt">朋友圈</p>
			</van-col>
			<van-col span="6">
				<div class="img">
					<svg class="v-icon" aria-hidden="true">
						<use xlink:href="#icon-QQ"></use>
					</svg>
				</div>
				<p class="txt">QQ好友</p>
			</van-col>
			<van-col span="6" @click="copy_link" class="copy">
				<div class="img">
					<i class="iconfont icon-lianjie"></i>
				</div>
				<p class="txt">复制链接</p>
				<div class="code"></div>
			</van-col>
		</van-row>
	</van-popup>
</template>
<script>
	import {
		Popup,
		Col,
		Row
	} from "vant";
	import Clipboard from 'clipboard'
	export default {
		name: 'share',
		components: {
			[Popup.name]: Popup,
			[Col.name]: Col,
			[Row.name]: Row,
		},
		props:{
			show:{
				type:Boolean,
				default:false
			}
		},
		data() {
			return {
				showShare: true
			}
		},

		watch: {
			show(v){
				this.showShare=v;
			},
			showShare(v){
				if(!v){
					this.$emit('update:show',v)
				}
			}
		},
		created() {
			this.showShare=this.show;
		},
		mounted(){
			// wx.config({
			//     debug: false,
			//     appId: res.appId,
			//     timestamp: res.timestamp,
			//     nonceStr: res.nonceStr,
			//     signature: res.signature,
			//     jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
			// });
			// wx.ready(function() {
			//     var obj = {
			//         title: title,
			//         desc: desc,
			//         link: url,
			//         imgUrl: pic,
			//         success: function() {
			//             // 用户确认分享后执行的回调函数
			//         },
			//         cancel: function() {
			//             // 用户取消分享后执行的回调函数
			//         }
			//     };
			//     wx.onMenuShareAppMessage(obj);
			//     wx.onMenuShareTimeline(obj);
			//     wx.onMenuShareQQ(obj);
			//     wx.onMenuShareQZone(obj);
			// });
		},
		methods: {
			// 分享微信
			share_onMenuShareAppMessage(){
				
			},
			// 分享朋友圈
			share_onMenuShareTimeline(){
				
			},
			// 分享QQ
			share_onMenuShareQQ(){
				
			},
			// 复制链接
			copy_link(){
				const clipboard = new Clipboard('.copy', {
				    text: function() {
				        return window.location.href;
				    }
				});
				clipboard.on('success', (e)=> {
					this.$toast({
						message:'复制成功'
					})
					this.showShare=false;
				});
				clipboard.on('error', (e)=> {
					this.$toast({
						message:'复制失败'
					})
				    console.log(e);
				});
			}
		}
	}
</script>
<style lang="less" scoped>
	.v-share {
		background-color: #ffe5cb;
		padding: 40px 0 45px;
		text-align: center;
		border-radius: 20px 20px 0 0;

		.v-share-title {
			font-size: 38px;
			color: #211b4f;
			line-height: 44px;
			font-weight: normal;
			margin: 0 0 40px;

			&:before,
			&:after {
				content: '';
				height: 2px;
				width: 264px;
				display: inline-block;
				vertical-align: top;
				margin-top: 21px;
			}

			&:before {
				background: linear-gradient(to right, #f8dcc1, #d3af8b);
				margin-right: 20px;
			}

			&:after {
				background: linear-gradient(to right, #d3af8b, #f8dcc1);
				margin-left: 20px;
			}
		}

		.van-col {
			.img {
				width: 126px;
				height: 126px;
				line-height: 122px;
				border-radius: 100px;
				border: 2px solid #ffc183;
				background-color: #fff;
				margin: 0 auto 15px;
				position: relative;
				.iconfont {
					font-size: 70px;
					&.icon-iconfontzhizuobiaozhunbduan32{
						color: #06a10e;
					}
					&.icon-lianjie{
						color: #a2a6af;
					}
				}

				.v-icon {
					width: 72px;
					height: 72px;
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%,-50%);
				}
			}

			.txt {
				font-size: 30px;
				color: #915e2c
			}
			.code{
				font-size: 0;
			}

		}
	}
</style>
