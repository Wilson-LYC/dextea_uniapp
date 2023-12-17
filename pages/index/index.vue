<style scoped>
	@import 'index.css';
</style>

<template>
	<view class="window">
		<scroll-view class="main" scroll-y="true" :enhanced="true" :bounces="false" :show-scrollbar="false">
			<image :src="bgimg" class="bgimg" mode="aspectFill"></image>
			<view class="container">
				<view class="user">
					<view class="line">
						<t-image :src="user.avatar" shape="circle" class="avatar" mode="aspectFill"
							@click="goToUserInfo()" />
						<view class="nl" @click="dialogToggle()">
							<view class="label">{{user.label}}</view>
							<view class="username">{{user.name}}</view>
						</view>
					</view>
					<view class="line" style="flex-direction: row-reverse;">
						<view class="info" @click="dialogToggle()">
							<view class="num">{{user.points}}</view>
							<view class="text">积分</view>
						</view>
						<view class="info" @click="dialogToggle()">
							<view class="num">{{user.coupon}}</view>
							<view class="text">优惠券</view>
						</view>
					</view>
				</view>
				<view class="option">
					<view class="buy">
						<t-row>
							<t-col span="12">
								<view style="border-right: 1px solid #bebebd;" @click="switchTo('/pages/buy/buy')">
									<view class="b-text">
										点单
									</view>
									<view class="b-tips">
										门店自取更好喝
									</view>
								</view>

							</t-col>
							<t-col span="12">
								<view @click="dialogToggle()">
									<view class="b-text">
										外卖
									</view>
									<view class="b-tips">
										随时随地饮靓茶
									</view>
								</view>
							</t-col>
						</t-row>
					</view>
					<view class="publicize">
						<view class="p-container">
							<view class="p-item" @click="dialogToggle()">
								入群有礼
							</view>
							<view class="p-item" @click="dialogToggle()">
								团购专区
							</view>
							<view class="p-item" @click="dialogToggle()">
								关于我们
							</view>
							<view class="p-item" @click="userLogin()">
								加盟合作
							</view>
						</view>
					</view>
				</view>
				<!-- 轮播图 -->
				<!-- <uni-swiper-dot :info="swiperList" :current="current" field="content" :mode="mode">
					<swiper class="swiper-box" @change="change" autoplay="true" interval="3000">
						<swiper-item v-for="(sw ,index) in swiperList" :key="index">
							<image :src="sw.url" class="simg" mode="aspectFill"></image>
						</swiper-item>
					</swiper>
				</uni-swiper-dot> -->
				<view class="copyright"></view>
			</view>
		</scroll-view>
		<view class="nav">
			<BottomNav vid="1" />
		</view>

		<uni-popup ref="alertDialog" type="dialog">
			<uni-popup-dialog type="info" confirmText="好的" title="温馨提示" content="服务未开通!尽请期待……"
				@confirm="dialogConfirm()" @close="dialogClose()"></uni-popup-dialog>
		</uni-popup>

	</view>
</template>

<script>
	import BottomNav from "@/components/BottomNav.vue"
	export default {
		onLoad() {
			//登录
			this.login()
		},
		components: {
			BottomNav
		},
		data() {
			return {
				bgimg: "https://img.js.design/assets/img/65250ec4a2052b1e24d16742.jpg#7c1634846e24472b676d6da5db896bbd",
				user: {
					avatar: "https://img.js.design/assets/img/65524bfabe0574e7eb227df3.png#b6416d312211d4ea7ad1d771ea69f178",
					name: "未登录",
					label: "得闲茶友",
					points: "0",
					coupon: "0"
				},
				swiperList: [{
						url: 'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
					},
					{
						url: 'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
					},
					{
						url: 'https://tdesign.gtimg.com/miniprogram/images/swiper1.png',
						ariaLabel: '图片1'
					},
					{
						url: 'https://tdesign.gtimg.com/miniprogram/images/swiper2.png',
					}
				],
				current: 0,
				mode: 'default',
			}
		},
		methods: {
			// 单击用户名跳转用户信息详情页面
			switchTo(path) {
				uni.switchTab({
					url: path
				})
			},
			dialogToggle() {
				this.$refs.alertDialog.open()
			},
			change(e) {
				this.current = e.detail.current;
			},
			userLogin() {
				uni.login({
					provider: 'weixin',
					success: (res) => {
						console.log(res)
					}
				});

			},
			login() {
				/*const token = uni.getStorageSync('token')
				if (token) {
					//缓存有登录信息，无需发登录请求
					const customer = uni.getStorageSync('customer')
					this.user.name = customer.name;
				} else {*/
				uni.login({
					provider: 'weixin',
					success: (loginRes) => {
						// 获取临时code
						let sData = {
							code: loginRes.code
						}
						// 后端登录
						uni.request({
							url: getApp().globalData.host + "/login/customer",
							method: "POST",
							data: {
								data: sData
							},
							header: {
								'content-type': 'application/json'
							},
							success: (res) => {
								let token = res.data.data.customer.token //获取token
								let customer = res.data.data.customer
								//存入缓存中
								uni.setStorageSync("token", token)
								uni.setStorageSync("customer", customer)
								this.user.name = customer.name
							}
						})
					},
					fail: function(err) {}
				})
				/*}*/
			}
		}
	}
</script>