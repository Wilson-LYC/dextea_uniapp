<style scoped>
	@import 'storeList.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="back" size="20" class="iconback" @click="back()"></uni-icons>
				所有门店
			</view>
		</view>
		<view class="city-container">
			<view class="ccity" @click="navToAreaList()">
				{{city}}
				<uni-icons type="bottom" size="18"></uni-icons>
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<view class="container" v-for="sit in storeList">
					<view class="background" @click="selStore(sit)">
						<view style="width: calc(100% - 140rpx);">
							<view class="sname">
								{{sit.name}}
							</view>
							<view class="saddress">
								<uni-icons type="location" size="15" color="#a5a5a5"></uni-icons>
								<text v-if="sit.address.length<15">{{sit.address}}</text>
								<text v-else>{{sit.address.substring(0,15)}}...</text>
							</view>
						</view>
						<view class="ssel">
							<view style="margin-top: 20rpx;color: #b28561;" v-if="sit.openState=='1'">去点单</view>
							<view style="margin-top: 20rpx;color: #cacaca;" v-else>闭店</view>
							<view class="sdistance">
								100m
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	import storeData from '@/pages/storeList/storeListData.js';
	export default {
		components: {},
		data() {
			return {
				//布局相关
				menuButtonInfo: menuButtonInfo, //右侧胶囊详细信息
				headersty: "padding-top:51px;height:32px;",
				mainsty: "height:calc(100vh - 83px - 100rpx);",
				headerLH: "line-height: 32px;",
				//城市
				city: "",
				//本市所有门店
				storeList: []
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 100rpx);"
		},
		onShow() {
			//获取城市
			let city = this.getCity()
			if (city) {
				//有城市
				this.city = city
				this.getStoreList(city).then(res => {
					this.storeList = res
				}).catch(err => {
					console.log(err)
				})
			} else {
				//无城市
				this.navToAreaList()
			}
			//从缓存读取城市数据
			this.getStoreFromStorage()
		},
		methods: {
			//返回
			back() {
				uni.navigateBack()
			},
			//从缓存读取城市
			getCity() {
				return uni.getStorageSync('city');
			},
			saveSid(sid) {
				uni.setStorageSync('sid', sid);
			},
			getStoreList(city) {
				const token = uni.getStorageSync('token');
				return new Promise((resolve, reject) => {
					uni.request({
						url: getApp().globalData.host + "/v1/customer/store?area=" + city,
						method: "GET",
						header: {
							"Authorization": token
						},
						success: (res) => {
							resolve(res.data.data.stores);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			},
			//前往购买页面
			navToBuy() {
				uni.switchTab({
					url: '/pages/buy/buy'
				})
			},
			//跳转至区域列表页
			navToAreaList() {
				uni.navigateTo({
					url: '/pages/openArea/openArea'
				})
			},
			//选择门店
			selStore(val){
				// if(val.openState!='1')
				// 	return
				this.saveSid(val.id)
				this.navToBuy()
			}
		}
	}
</script>