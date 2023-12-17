<style scoped>
	.container {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: #e5e5e5;
		display: flex;
	}

	.item {
		margin: 0;
		padding: 0;
		width: 25%;
		text-align: center;
		margin-top: 20rpx;
	}

	.text {
		font-size: 24rpx;
		margin-top: 5rpx;
	}
</style>

<template>
	<view class="container">
		<view class="item" v-for="it in list" @click="switchTo(it.path)">
			<view v-if="vid==it.vid">
				<uni-icons custom-prefix="iconfont" :type="it.icon" size="15" color="#B8701B" style="font-weight: 600;"></uni-icons>
				<view class="text" style="color: #B8701B;">{{it.text}}</view>
			</view>
			<view v-else>
				<uni-icons custom-prefix="iconfont" :type="it.icon" size="15" style="font-weight: 600;"></uni-icons>
				<view class="text">{{it.text}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			vid: String
		},
		data() {
			return {
				list: [{
						vid: 1,
						text: "首页",
						icon: "icon-home",
						path: "/pages/index/index"
					},
					{
						vid: 2,
						text: "点单",
						icon: "icon-cup",
						path: "/pages/buy/buy"
					},
					{
						vid: 3,
						text: "订单",
						icon: "icon-cart",
						path: "/pages/orderList/orderList"
					},
					{
						vid: 4,
						text: "我的",
						icon: "icon-user",
						path: "/pages/user/user"
					}
				]
			}
		},
		methods: {
			switchTo(path) {
				uni.switchTab({
					url: path
				});
			}
		}
	}
</script>