<style scoped>
	@import 'buy.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				堂食点单
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<!-- 商店 -->
			<view class="store">
				<view class="s-name" @click="navToStoreList()">
					{{store.name}}
					<uni-icons type="right" size="15"></uni-icons>
				</view>
				<view class="s-distance">
					<uni-icons type="location" size="13" color="#999999"></uni-icons>
					距离您100m
				</view>
			</view>
			<!-- 菜单 -->
			<view class="menu">
				<view class="class-container">
					<view v-for="(item,index) in menu" @click="changMenuClass(index)"
						:class="classIndex == index? 'class-item-sel' : 'class-item'">
						{{item.class}}
					</view>
				</view>
				<view class="commodity-container">
					<scroll-view class="commodity-scroll" scroll-y="true" :scroll-into-view="commScrollId"
						scroll-with-animation :show-scrollbar="false">
						<view v-for="(mit,mIndex) in menu">
							<!-- 分类标题 -->
							<view class="class-title" :id="'class'+mIndex">
								{{mit.class}}
							</view>
							<!-- 商品 -->
							<view class="commodity" v-for="(cit,cIndex) in mit.commodity" @click="openCommDetail(cit)">
								<view class="c-img">
									<!-- 图片 -->
									<t-image class="c-img" :src="cit.img" mode="widthFix"></t-image>
								</view>
								<view class="c-text-container">
									<!-- 名称 -->
									<view class="c-name">
										{{cit.name}}
									</view>
									<!-- 简要介绍 -->
									<view class="c-info">
										{{cit.briefInfo}}
									</view>
									<!-- 价格 -->
									<view class="c-price-line">
										<view class="c-price">
											¥{{cit.price}}
											<text style="font-size: 22rpx;font-weight: 500;color: #999999;">起</text>
										</view>
										<view class="c-buy-container">
											<view class="c-buy" v-if="cit.state=='1'">
												选规格
											</view>
											<view class="c-buy" v-else style="background: #eeeeee; color: #999999;">
												售罄
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 留白 -->
							<view style="height: 25rpx;"></view>
						</view>
						<!-- 留白 -->
						<view style="height: 300rpx;"></view>
					</scroll-view>
				</view>
			</view>
		</view>
		<!-- 底部导航栏 -->
		<view class=" nav">
			<BottomNav vid="2" />
		</view>
	</view>

	<!-- 商品详情弹窗-->
	<uni-popup ref="commDetail" type="bottom" :safe-area="false">
		<!-- 关闭按钮 -->
		<uni-icons type="closeempty" size="20" @click="closeCommDetail" class="iconclose"></uni-icons>
		<view class="commdetail-container">
			<scroll-view class="cd-main" scroll-y="true" :enhanced="true" :bounces="false" :show-scrollbar="false">
				<!-- 图片 -->
				<t-image :src="cDetail.img" mode="heightFix" class="cd-img" />
				<!-- 品名 -->
				<view class="cd-name">{{cDetail.name}}</view>
				<!-- 介绍 -->
				<view class="cd-info">{{cDetail.info}}</view>
				<!-- 定制选项 -->
				<view class="cd-custom" v-for="cdc in cDetail.custom">
					<view class="cdc-title">
						{{cdc.title}}
					</view>
					<view class="cdc-item-container">
						<view :class="index == cdc.opt?'cdc-item-sel':'cdc-item'" v-for="(op,index) in cdc.option"
							@click="changeCustom(cdc,index)">
							{{op.text}}
						</view>
					</view>
				</view>
				<view style="height: 100px;"></view>
			</scroll-view>
			<view class="cd-foo">
				<view class="cd-price-container">
					<view style="width: 70%;">
						<view class="cd-price">
							¥{{cDetail.finalPrice}}
						</view>
						<!-- 定制要求 -->
						<!-- <view class="cd-cus">
							<text v-for="op in cDetail.custom">{{op.option[op.opt].text}}/</text>
						</view> -->
					</view>
					<view style="width: 30%;display: flex;flex-direction: row-reverse;">
						<uni-number-box v-model="cDetail.num" :min="1" />
					</view>
				</view>
				<!-- 可购买 -->
				<view class="cd-btcontainer" v-if="cDetail.state=='1'">
					<view style="width: 50%;text-align: center;">
						<view class="cd-bt" @click="buyNow()">立即下单</view>
					</view>
					<view style="width: 50%;text-align: center;">
						<view class="cd-bt" style="background: #b28561; color: #ffffff;" @click="addToCart()">加入购物车
						</view>
					</view>
				</view>
				<!-- 售罄按钮 -->
				<view class="cd-btcontainer" v-else>
					<view style="width: 100%;text-align: center;">
						<view
							style="color: #ffffff;padding: 13rpx 43rpx;border-radius: 1000rpx;border: 5rpx solid #b28561;background: #b28561;">
							售罄
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>

	<!-- 购物车栏 -->
	<view class="cart-bar" v-if="store.openState=='1'">
		<view class="cr-background" v-if="cart.totalNum>0">
			<view style="width: calc(100% - 180rpx);display: flex;" @click="openCartDetail()">
				<view class="cr-bag">
					<uni-badge size="small" :text="cart.totalNum" absolute="rightTop" type="error">
						<uni-icons custom-prefix="iconfont" type="icon-bag" size="30" color="#ffffff"></uni-icons>
					</uni-badge>
				</view>
				<view class="cr-price">¥{{cart.totalPrice}}</view>
			</view>
			<view style="width: 180rpx;background: #b28561;" @click="comfireOrder()">
				<view class="cr-submit">结算</view>
			</view>
		</view>
	</view>
	<!-- 门店关闭提醒 -->
	<view class="storeoff" v-if="store.openState=='2'">
		门店已休息~
	</view>
	<!-- 购物车详情 -->
	<uni-popup ref="cartDetail" type="bottom" :safe-area="false">
		<view class="crd-containr">
			<!-- 头部 -->
			<view class="crd-header">
				<t-row>
					<t-col span="22" class="crd-htitle">
						购物车
					</t-col>
					<t-col span="2">
						<uni-icons type="closeempty" size="20" @click="closeCartDetail()"></uni-icons>
					</t-col>
				</t-row>
			</view>
			<!-- 主要内容 -->
			<scroll-view class="crd-main" scroll-y="true" :enhanced="true" :bounces="false" :show-scrollbar="false">
				<!-- 店铺 -->
				<view class="crd-store">
					{{store.name}}
				</view>
				<!-- 商品 -->
				<view class="crd-comm-container">
					<!-- 商品列表 -->
					<view v-for="(comm,cIndex) in cart.list">
						<view class="crd-comm" v-if="comm.num>0">
							<t-row :gutter="10">
								<t-col span="8">
									<!-- 图片 -->
									<t-image class="crd-img" :src="comm.img" mode="widthFix"></t-image>
								</t-col>
								<t-col span="16">
									<view class="crd-cinfo">
										<!-- 品名 -->
										<view class="crc-name">
											{{comm.name}}
										</view>
										<!-- 客制化要求 -->
										<view class="crc-custom">
											<text v-for="cus in comm.custom">
												{{cus.option[cus.opt].text}}/
											</text>
										</view>
									</view>
									<t-row>
										<t-col span="8" class="crd-price">
											￥{{comm.finalPrice}}
										</t-col>
										<t-col span="10" offset="4">
											<uni-number-box v-model="comm.num" />
										</t-col>
									</t-row>
								</t-col>
							</t-row>
						</view>
					</view>
				</view>
				<!-- 价格 -->
				<view class="crd-foo" v-if="cart.list.length>0">
					<view style="width: 50%;">
						<!-- <view class="crd-totalPrice">总计：￥{{cart.totalPrice}}</view> -->
					</view>
					<view style="width: 50%;display:flex;flex-direction: row-reverse;">
						<view>
							<button size="mini" class="crd-submit" hover-class="is-hover"
								@click="comfireOrder()">去结算</button>
						</view>
					</view>
				</view>
				<!-- 未选购商品 -->
				<view v-if="cart.list.length<1">
					<view class="crd-empty">
						未选购商品
					</view>
				</view>
			</scroll-view>
		</view>
	</uni-popup>
</template>

<script>
	import BottomNav from "@/components/BottomNav.vue";
	import menuData from '@/pages/buy/menuData.js'
	//布局相关 - 获取胶囊位置
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	export default {
		components: {
			BottomNav
		},
		data() {
			return {
				//布局相关 - 初始化数据
				menuButtonInfo: menuButtonInfo, //右侧胶囊详细信息
				headersty: "padding-top:51px;height:32px;", //header高度
				mainsty: "height:calc(100vh - 83px - 170rpx);", //主要内容高度
				headerLH: "line-height: 32px;", //header的line-height
				// 商店相关
				store: {},
				// 菜单相关
				menu: [],
				classIndex: 0,
				commScrollId: "class0",
				//商品详情弹窗
				cDetail: {},
				//购物车
				cart: {
					list: [],
					totalPrice: 0,
					totalNum: 0
				}
			}
		},
		onLoad() {
			//布局相关 - 加载时计算
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 170rpx);"
		},
		onShow() {
			//获取购物车
			this.cart=this.getCart()
			//获取城市
			let city=this.getCity()
			if(city){
				//有城市信息，获取sid
				let sid=this.getStoreId()
				if(sid){
					//存在sid
					this.getStoreInfoBySid(sid).then(res=>{
						this.store=res
					}).catch(err=>{
						console.log(err)
					})
					this.getMenuBySid(sid).then(res=>{
						this.menu=res
					}).catch(err=>{
						console.log(err)
					})
				}else{
					//不存在sid
					this.navToStoreList()
				}
			}else{
				//没有城市信息
				this.navToAreaList()
			}
		},
		onHide() {
			//窗口关闭
			this.saveCart(this.cart)
			if(this.store)
				this.savaSoteInfo(this.store)
		},
		methods: {
			//更换品类
			changMenuClass(index) {
				//左侧 -> 更换选择品类
				this.classIndex = index;
				//右侧 -> 滚动到指定品类
				this.commScrollId = "class" + index
			},
			//单击商品 -> 打开弹窗展示详情
			openCommDetail(detail) {
				this.cDetail = JSON.parse(JSON.stringify(detail))
				this.cDetail.num = 1 //初始化购买数量 1
				this.cDetail.finalPrice = this.cDetail.price //初始化最终价格
				this.$refs.commDetail.open('bottom') //底部popup打开
			},
			//关闭弹窗
			closeCommDetail() {
				this.$refs.commDetail.close() //关闭商品详情popup
			},
			//更改定制化选项
			changeCustom(item, newopt) {
				item.opt = newopt
				//计算最终价格
				this.cDetail.finalPrice = parseFloat(this.cDetail.price)
				for (var i = 0; i < this.cDetail.custom.length; i++) {
					var op = this.cDetail.custom[i].opt
					this.cDetail.finalPrice += parseFloat(this.cDetail.custom[i].option[op].cost)
				}
			},
			//加入购物车 -> 更新购物车信息
			addToCart() {
				//合并同类
				var flag = false //标志是否找到同类
				for (var i = 0; i < this.cart.list.length; i++) {
					var item = this.cart.list[i] //购物车商品
					if (item.id === this.cDetail.id && JSON.stringify(item.custom) === JSON.stringify(this.cDetail
							.custom)) {
						//是同一个商品且定制要求一致，可以合并
						item.num += this.cDetail.num //合并
						flag = true //找到同类
					}
				}
				if (!flag) {
					//没有找到同类，需要新增
					const tmp = JSON.parse(JSON.stringify(this.cDetail)) //浅拷贝选购数据
					this.cart.list.push(tmp) //加入购物车
				}
				this.$refs.commDetail.close() //关闭弹窗
				this.updataCartInfo() //更新购物车总价和数量
			},
			//立即购买 -> 清空购物车后再加入商品
			buyNow() {
				//清空购物车
				this.cart.list = []
				//加入新商品
				let tmp = JSON.parse(JSON.stringify(this.cDetail))
				this.cart.list.push(tmp)
				//重新计算价格和数量
				this.updataCartInfo()
				//结算
				this.comfireOrder()
			},
			//更新购物车的数量和总价
			updataCartInfo() {
				//删除数量为0的商品
				var list = this.cart.list
				for (var i = 0; i < list.length; i++) {
					var lNum = parseFloat(list[i].num)
					if (lNum < 1)
						this.delCommInCart(i)
				}
				//更新总价和总数量
				var list = this.cart.list
				var price = 0
				var num = 0
				for (var i = 0; i < list.length; i++) {
					var lPrice = parseFloat(list[i].finalPrice)
					var lNum = parseFloat(list[i].num)
					price += lPrice * lNum
					num += lNum
				}
				this.cart.totalNum = num
				this.cart.totalPrice = price
			},
			//去结算 -> 确认订单
			comfireOrder() {
				//获取门店最新信息
				let sid=this.getStoreId()
				this.getStoreInfoBySid(sid).then(res=>{
					this.store=res
				}).catch(err=>{
					console.log(err)
				})
				//判断门店是否还在营业
				if (this.store.openState == '1') {
					//营业中
					uni.navigateTo({
						url: "/pages/confirm/confirm"
					})
				} else {
					//未营业
					uni.showToast({
						title: '门店已休息~',
						icon: "none",
						duration: 2000
					});
				}
			},
			//打开购物车
			openCartDetail() {
				//更新好再打开
				this.updataCartInfo()
				this.$refs.cartDetail.open('bottom')
			},
			//关闭购物车
			closeCartDetail() {
				//可能存在修改 更新下信息
				this.updataCartInfo()
				this.$refs.cartDetail.close()
			},
			//购物车删除商品
			delCommInCart(id) {
				this.cart.list.splice(id, 1)
			},
			//保存购物车数据到缓存
			saveCart(val) {
				uni.setStorageSync('cart', val);
			},
			//从缓存读取购物车数据
			getCart() {
				const values = uni.getStorageSync('cart');
				if (values) {
					//缓存有购物车数据，直接读取
					return values
				} else {
					//没有数据，初始化结构
					let cart = {
						list: [],
						totalPrice: 0,
						totalNum: 0
					}
					return cart
				}
			},
			//获取菜单
			getMenuBySid(sid) {
				const token = uni.getStorageSync('token');
				return new Promise((resolve, reject) => {
					uni.request({
						url: getApp().globalData.host + "/v1/customer/menu?id=" + sid,
						method: "GET",
						header: {
							"Authorization": token
						},
						success: (res) => {
							resolve(res.data.data.menu);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			},
			//从缓存读取城市
			getCity() {
				return uni.getStorageSync('city');
			},
			//从缓存读取门店
			getStoreId() {
				return uni.getStorageSync('sid');
			},
			//从服务器获取门店详情
			getStoreInfoBySid(sid) {
				const token = uni.getStorageSync('token');
				return new Promise((resolve, reject) => {
					uni.request({
						url: getApp().globalData.host + "/v1/customer/store/detail?id=" + sid,
						header: {
							"Authorization": token
						},
						success: (res) => {
							resolve(res.data.data.store);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			},
			//跳转至门店列表页
			navToStoreList() {
				uni.navigateTo({
					url: '/pages/storeList/storeList'
				})
			},
			//跳转至区域列表页
			navToAreaList() {
				uni.navigateTo({
					url: '/pages/openArea/openArea'
				})
			},
			savaSoteInfo(val){
				uni.setStorageSync('store', val);
			}
		}
	}
</script>