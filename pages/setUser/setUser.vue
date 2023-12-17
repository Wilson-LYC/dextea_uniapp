<style scoped>
	@import 'setUser.css';
</style>

<template>
	<view class="winsdow">
		<!-- 顶部 -->
		<view :style="headersty" class="header-container">
			<view class="header" :style="headerLH">
				<uni-icons type="back" size="20" class="iconback" @click="back()"></uni-icons>
				修改资料
			</view>
		</view>
		<!-- 主要内容 -->
		<view class="main-container" :style="mainsty">
			<scroll-view scroll-y="true" class="main" :enhanced="true" :show-scrollbar="false">
				<uni-section title="用户名" type="line" padding>
					<uni-easyinput v-model="user.name" :clearable="false"></uni-easyinput>
				</uni-section>
				<uni-section title="手机号" type="line" padding>
					<uni-easyinput v-model="user.phone" :clearable="false"></uni-easyinput>
				</uni-section>
			</scroll-view>
		</view>
		<view class="nav">
			<view class="buybt-container">
				<button class="buybt" hover-class="is-hover" @click="submit()">确认修改</button>
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
				user: {
					name: "",
					phone: ""
				}
			}
		},
		onLoad() {
			//布局
			this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;"
			this.headerLH = "line-height:" + menuButtonInfo.height + "px;"
			const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top)
			this.mainsty = "height:calc(100vh - " + h + "px - 200rpx);"
		},
		onShow() {
			this.user = this.getCustomer()
			console.log(this.getCustomer())
		},
		methods: {
			//返回
			back() {
				uni.navigateBack()
			},
			getCustomer() {
				return uni.getStorageSync('customer')
			},
			submit(){
				uni.showToast({
					title: '功能未开放，敬请期待……',
					duration: 2000,
					icon:"none"
				});
			}
		}
	}
</script>