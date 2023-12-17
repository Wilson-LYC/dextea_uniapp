<style scoped>
	@import 'payres.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="home" size="20" class="iconback" @click="navToOrderList()"></uni-icons>
				支付结果
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<view style="height: 120rpx;"></view>
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<t-image src="https://img.js.design/assets/img/64609bd33424d3dc041d0b36.png#6cb8523e77140f816b53f153ef1a30ec" class="res-img"/>
				<view style="height: 60rpx;"></view>
				<view class="res-text">支付成功</view>
				<view style="height: 30rpx;"></view>
				<button size="mini" type="primary" @click="navToOrderList()">完成</button>
			</scroll-view>
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
				mainsty: "height:calc(100vh - 83px - 20rpx);",
				headerLH: "line-height: 32px;"
			}
		},
		onLoad() {
			//布局
			console.log("payres load")
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);"
			//支付完成，清空购物车
			this.delCartInStorage()
			//倒计时3秒前往订单页
			// setTimeout(this.navToOrderList(),10000,null)
		},
		methods: {
			//前往订单列表
			navToOrderList(){
				uni.switchTab({
					url:'/pages/orderList/orderList'
				})
			},
			//删除缓存数据
			delCartInStorage(){
				uni.removeStorageSync('cart');
			},
		}
	}
</script>