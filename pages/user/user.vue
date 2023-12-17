<style scoped>
	@import 'user.css';
</style>

<template>
	<view class="window">
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<t-image :src="bgimg" class="bgimg"></t-image>
				<view class="container">
					<view class="user">
						<view class="ulabel">得闲茶友</view>
						<view class="uname">{{user.name}}</view>
					</view>
					<view class="integral">
						<view class="iitem" @click="waiting()">
							<view class="inum">
								0
							</view>
							<view class="itext">
								积分
							</view>
						</view>
						<view class="iitem" @click="waiting()">
							<view class="inum">
								0
							</view>
							<view class="itext">
								优惠券
							</view>
						</view>
						<view class="iitem" @click="waiting()">
							<view class="inum">
								0
							</view>
							<view class="itext">
								余额
							</view>
						</view>
					</view>
					<view class="option">
						<view class="optitle">我的服务</view>
						<view style="display: flex;">
							<view class="opitem" @click="navToSetUser()">
								<uni-icons type="compose" size="25"></uni-icons>
								<view class="optext">
									资料修改
								</view>
							</view>
							<view class="opitem" @click="waiting()">
								<uni-icons type="notification" size="25"></uni-icons>
								<view class="optext">
									通知
								</view>
							</view>
							<view class="opitem" @click="waiting()">
								<uni-icons type="chatboxes" size="25"></uni-icons>
								<view class="optext">
									在线客服
								</view>
							</view>
							<view class="opitem" @click="waiting()">
								<uni-icons type="more" size="25"></uni-icons>
								<view class="optext">
									更多
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 底部导航栏 -->
		<view class="nav">
			<BottomNav vid="4" />
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
				mainsty: "height:calc(100vh - 150rpx);",
				headerLH: "line-height: 32px;",
				//
				bgimg: "https://img.js.design/assets/img/655756ef36b76e1b4624e4db.png#c77afea5e25c8836b461646cd175f6c8",
				user: {
					id: "",
					name: ""
				}
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - 150rpx);"
		},
		onShow() {
			this.user=this.getCustomer()
		},
		methods: {
			navToDetail(id) {
				uni.navigateTo({
					url: '/pages/orderDetail/orderDetail?id=' + id,
				})
			},
			navToSetUser(){
				uni.navigateTo({
					url:'/pages/setUser/setUser',
					animationType:"none"
				})
			},
			getCustomer() {
				return uni.getStorageSync('customer')
			},
			waiting(){
				uni.showToast({
					title: '功能未开放，敬请期待……',
					duration: 2000,
					icon:"none"
				});
			}
		}
	}
</script>