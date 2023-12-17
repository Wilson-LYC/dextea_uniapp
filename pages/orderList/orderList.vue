<style scoped>
	@import 'orderList.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				我的订单
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<view class="container">
					<view class="order" v-for="od in orderList" @click="navToDetail(od.id)">
						<view class="o-header">
							<!-- 下单门店 -->
							<view style="width: 70%;" class="o-h-text">
								{{od.type}} | {{od.store}}
							</view>
							<!-- 订单状态 -->
							<view style="width: 30%;display: flex;flex-direction: row-reverse;color: #B8701B;"
								class="o-h-text">
								<text v-if="od.state=='1'">已下单</text>
								<text v-else-if="od.state=='2'">制作中</text>
								<text v-else-if="od.state=='3'">待取茶</text>
								<text v-else-if="od.state=='4'">已完成</text>
								<text v-else-if="od.state=='0'">退单</text>
								<text v-else>未知</text>
							</view>
						</view>
						<!-- 下单时间 -->
						<view class="ordertime">
							{{od.time}}
						</view>
						<!-- 图片 价格 数量 -->
						<view class="o-info">
							<view class="cimg-container">
								<scroll-view scroll-x="true" class="cimg-scroll">
									<view class="commimg">
										<t-image :src="item.img" class="c-img" v-for="item in od.commodity"></t-image>
									</view>
								</scroll-view>
							</view>
							<view class="price-container">
								<view class="price">
									￥{{od.price}}
								</view>
								<view class="num">
									共{{od.num}}件
								</view>
							</view>
						</view>
						<view class="code-container" v-if="od.state!='4'&&od.state!='0'">
							取餐号：{{od.code}}
						</view>
						<!-- <view class="btn">
							<button size="mini" style="margin-right: 15rpx;" type="default">评价</button>
							<button size="mini" type="primary" class="againbt" hover-class="is-hover">再来一单</button>
						</view> -->
					</view>
					<!-- <view v-if="orderList.length<1" style="text-align: center;margin-top: 300rpx;color:#999999;">您还没有订单噢~</view> -->
				</view>
			</scroll-view>
		</view>
		<!-- 底部导航栏 -->
		<view class="nav">
			<BottomNav vid="3" />
		</view>
	</view>
</template>

<script>
	import BottomNav from "@/components/BottomNav.vue"
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	export default {
		components: {
			BottomNav
		},
		data() {
			return {
				//布局相关
				menuButtonInfo: menuButtonInfo, //右侧胶囊详细信息
				headersty: "padding-top:51px;height:32px;",
				mainsty: "height:calc(100vh - 83px - 170rpx);",
				headerLH: "line-height: 32px;",
				//订单数据
				orderList: []
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 170rpx);"
		},
		onShow() {
			this.getOrder()
		},
		methods: {
			navToDetail(id) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?id=' + id,
				})
			},
			getOrder() {
				const token = uni.getStorageSync('token');
				const customer = uni.getStorageSync('customer');
				uni.request({
					url: getApp().globalData.host + "/v1/customer/order/list?id=" + customer.id,
					method: "GET",
					header: {
						"Authorization": token
					},
					success: (res) => {
						this.orderList = res.data.data.order
					},
					fail: (res) => {}
				})
			}
		}
	}
</script>