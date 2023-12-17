<style scoped>
	@import 'orderDetail.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="back" size="20" class="iconback" @click="backToBuy()"></uni-icons>
				订单详情
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<!-- 制作进度 -->
				<view class="container" style="padding-top: 20rpx;margin-top: 0;text-align: center;">
					<view class="background">
						<view>取餐号</view>
						<view class="mpickup">{{order.code}}</view>
						<uni-section>
							<uni-steps :options="makeState" :active="order.state" active-color="#b28561" />
						</uni-section>
					</view>
				</view>
				<!-- 门店信息 -->
				<view class="container">
					<view class="background">
						<view class="s-name">
							{{order.store.name}}
						</view>
						<view class="s-schedule" v-if="order.state=='1'||order.state=='2'">
							现在下单，前方有
							<text style="color: #b28561;font-weight: 800;">
								{{order.store.queue}}
							</text>
							杯在制作中
						</view>
					</view>
				</view>
				<view class="container">
					<view class="background">
						<view class="contitle">
							商品信息
						</view>
						<view v-for="comm in order.commodity" class="comm-item">
							<view class="comm-img">
								<t-image :src="comm.img" class="cimg" mode="widthFix"></t-image>
							</view>
							<view class="comm-text">
								<view class="cname">
									{{comm.name}}
								</view>
								<view class="ccustom">
									<text v-for="op in comm.custom">{{op.value}}/</text>
								</view>

							</view>
							<view class="comm-price">
								<view class="cprice">
									￥{{comm.price}}
								</view>
								<view class="cnum">
									×{{comm.num}}
								</view>
							</view>
						</view>
						<view class="order-info">
							<view class="oprice">已支付 ￥{{order.price}}</view>
							<view class="onum">共{{order.num}}件</view>
						</view>
					</view>
				</view>
				<view class="container">
					<view class="background">
						<view class="contitle">
							订单信息
						</view>
						<view class="otext">
							下单时间：{{order.time}}
						</view>
						<view class="otext">
							取餐号码：{{order.code}}
						</view>
						<view class="otext">
							订单编号：{{order.id}}
						</view>
						<view class="otext">
							备注信息：{{order.note}}
						</view>
						<view class="otext">
							联系方式：{{order.phone}}
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
<!-- 		<view class="nav">
			<view class="buybt-container">
				<button class="buybt" hover-class="is-hover" @click="">我已取餐</button>
			</view>

		</view> -->
	</view>
</template>

<script>
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	export default {
		components: {},
		data() {
			return {
				//布局相关
				menuButtonInfo: menuButtonInfo, //右侧胶囊详细信息
				headersty: "padding-top:51px;height:32px;",
				mainsty: "height:calc(100vh - 83px - 20rpx);",
				headerLH: "line-height: 32px;",
				makeState: [{
						title: '已下单'
					},
					{
						title: '制作中'
					},
					{
						title: '待取餐'
					},
					{
						title: '已完成'
					}
				],
				//订单数据
				order: {},
				oid:"",
				queue:""
			}
		},
		onLoad:function(option){
			// console.log("confirm load");
			// this.dumpStorage();
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);"
			this.oid=option.id
			this.getOrder()
			// this.getQueue()
		},
		methods: {
			//返回
			backToBuy() {
				uni.navigateBack()
			},
			getOrder(){
				const token = uni.getStorageSync('token');
				const customer=uni.getStorageSync('customer');
				uni.request({
					url: getApp().globalData.host + "/v1/customer/order/detail?id="+this.oid,
					method: "GET",
					header: {
						"Authorization": token
					},
					success: (res) => {
						this.order=res.data.data.order
						this.order.state=Number(this.order.state)-1
					},
					fail: (res) => {
						console.log(res)
					}
				})
			},
			// getQueue(){
			// 	const token = uni.getStorageSync('token');
			// 	uni.request({
			// 		url: "http://192.168.205.57:6688/customer/order/queue?id="+this.oid,
			// 		method: "GET",
			// 		header: {
			// 			"Authorization": token
			// 		},
			// 		success: (res) => {
			// 			this.queue=res.data.data.queue
			// 		},
			// 		fail: (res) => {
			// 			console.log(res)
			// 		}
			// 	})
			// }
		}
	}
</script>