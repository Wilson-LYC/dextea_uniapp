<style scoped>
	@import 'openArea.css';
</style>

<template>
	<view class="window">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="back" size="20" class="iconback" @click="navBack()"></uni-icons>
				营业区域
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<uni-indexed-list :options="area" :showSelect="false" class="list"
					@click="bindClick"></uni-indexed-list>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
	import areaData from '@/pages/openArea/openArea.js'
	export default {
		components: {},
		data() {
			return {
				//布局相关
				menuButtonInfo: menuButtonInfo, //右侧胶囊详细信息
				headersty: "padding-top:51px;height:32px;",
				mainsty: "height:calc(100vh - 83px - 20rpx);",
				headerLH: "line-height: 32px;",
				//区域
				area: []
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);"
		},
		onShow() {
			//获取营业区域
			this.getArea().then(res => {
				this.area=res
			}).catch(err => {
				console.error("Error:", err);
			});
		},
		methods: {
			//返回
			navBack() {
				uni.navigateBack()
			},
			navToStoreList() {
				uni.redirectTo({
					url: '/pages/storeList/storeList'
				})
			},
			//选择了城市
			bindClick(e) {
				var city = e.item.name
				//城市写入缓存
				uni.setStorageSync("city", city)
				this.navToStoreList()
			},
			getArea() {
				const token = uni.getStorageSync('token');
				return new Promise((resolve, reject) => {
					uni.request({
						url: getApp().globalData.host + "/v1/customer/openarea",
						header: {
							"Authorization": token
						},
						success: (res) => {
							resolve(res.data.data.area);
						},
						fail: (err) => {
							reject(err);
						}
					})
				});
			}
		}
	}
</script>