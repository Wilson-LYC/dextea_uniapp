<style scoped>
	@import 'confirm.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="back" size="20" class="iconback" @click="back()"></uni-icons>
				确认订单
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<view class="store-container">
					<view class="store-background">
						<view class="s-name">
							{{store.name}}
						</view>
						<view class="s-schedule">
							现在下单，前方有
							<text style="color: #b28561;font-weight: 800;">
								{{store.queue}}
							</text>
							杯在制作中
						</view>
					</view>
				</view>
				<view class="commodity-container">
					<view class="comm-background">
						<view class="buytips">
							选购商品，注意选对冰度和甜度
						</view>
						<view v-for="comm in cart.list" class="comm-item">
							<view class="comm-img">
								<t-image :src="comm.img" class="cimg" mode="widthFix"></t-image>
							</view>
							<view class="comm-text">
								<view class="cname">
									{{comm.name}}
								</view>
								<view class="ccustom">
									<text v-for="op in comm.custom">{{op.option[op.opt].text}}/</text>
								</view>

							</view>
							<view class="comm-price">
								<view class="cprice">
									￥{{comm.finalPrice}}
								</view>
								<view class="cnum">
									×{{comm.num}}
								</view>
							</view>
						</view>
						<view class="order-info">
							<view class="oprice">待支付 ￥{{cart.totalPrice}}</view>
							<view class="onum">共{{cart.totalNum}}件</view>
						</view>
					</view>
				</view>
				<view class="customer-container">
					<view class="cus-background">
						<uni-section title="联系方式" subTitle="" type="line" padding>
							<uni-easyinput v-model="phone" placeholder=""></uni-easyinput>
						</uni-section>
						<uni-section title="订单备注" subTitle="" type="line" padding>
							<uni-easyinput type="textarea" autoHeight v-model="note" placeholder=""></uni-easyinput>
						</uni-section>
					</view>
				</view>
				<!-- 留白 -->
				<view style="height: 200rpx;"></view>
			</scroll-view>
		</view>
		<view class="nav">
			<view class="buybt-container">
				<button class="buybt" hover-class="is-hover" @click="pay()">立即支付</button>
			</view>

		</view>
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
				mainsty: "height:calc(100vh - 83px - 200rpx);",
				headerLH: "line-height: 32px;",
				cart: [],
				store: "",
				customer: "",
				phone: "",
				note: ""
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 200rpx);"
		},
		onShow(){
			this.cart=this.getCart()
			this.store=this.getStore()
			this.customer=this.getCustomer()
			this.getQueue().then(res=>{
				this.store.queue=res
			}).catch(err=>{
				console.log(err)
			})
		},
		methods: {
			//从缓存读取购物车数据
			getCart() {
				return uni.getStorageSync('cart');
			},
			//从缓存读取用户数据
			getCustomer() {
				return uni.getStorageSync('customer');
			},
			//返回
			back() {
				uni.navigateBack()
			},
			//支付
			pay() {
				//检查是否输入手机号
				if (this.phone == null || this.phone == '') {
					uni.showModal({
						title: '提示',
						content: '请输入联系方式',
						showCancel: false,
						confirmColor: '#B8701B',
						success: function(res) {
							return
						}
					});
				} else {
					//创建订单
					// 重构商品
					let comm = []
					for (var i = 0; i < this.cart.list.length; i++) {
						let citem = this.cart.list[i]
						//定制要求转文本
						let cust = []
						for (var j = 0; j < citem.custom.length; j++) {
							let dzit = citem.custom[j]
							const value = {
								"item": dzit.title,
								"value": dzit.option[dzit.opt].text
							}
							cust.push(value)
						}
						let new_item={
							id:citem.id,
							name:citem.name,
							price:citem.finalPrice,
							img:citem.img,
							num:citem.num,
							custom:cust,
						}
						comm.push(new_item)
					}
					let order = {
						sid: this.store.id,
						cid: this.customer.id,
						num: this.cart.totalNum,
						price: this.cart.totalPrice,
						commodity: comm,
						phone: this.phone,
						note: this.note
					}
					const token = uni.getStorageSync('token');
					uni.showModal({
						title: '提示',
						content: '点击“确定”模拟支付完成',
						confirmColor: '#B8701B',
						success: (res) => {
							if (res.confirm) {
								uni.showLoading({
									title: '提交中'
								});
								//提交订单
								uni.request({
									url: getApp().globalData.host + "/v1/customer/order/add",
									method: "POST",
									data: {
										data: order
									},
									header: {
										"content-type": "application/json",
										"Authorization": token
									},
									success: (res) => {
										uni.hideLoading();
										uni.navigateTo({
											url: '/pages/payres/payres',
											animationType: "none"
										})
									},
									fail: (res) => {
										console.log(res)
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					});
				}
			},
			//删除缓存数据
			delCart() {
				uni.removeStorageSync('cart');
			},
			getQueue() {
				//获取排队情况
				const token = uni.getStorageSync('token');
				return new Promise((resolve, reject) => {
					uni.request({
						url: getApp().globalData.host + "/v1/customer/storequeue?id=" + this.store.id,
						method: "GET",
						header: {
							"Authorization": token
						},
						success: (res) => {
							resolve(res.data.data.queue);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			},
			//从缓存读取门店
			getStore() {
				return uni.getStorageSync('store');
			},
			
		}
	}
</script>