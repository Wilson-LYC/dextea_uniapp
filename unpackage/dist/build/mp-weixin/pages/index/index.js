"use strict";const e=require("../../common/vendor.js"),o={onLoad(){this.login()},components:{BottomNav:()=>"../../components/BottomNav.js"},data:()=>({bgimg:"https://img.js.design/assets/img/65250ec4a2052b1e24d16742.jpg#7c1634846e24472b676d6da5db896bbd",user:{avatar:"https://img.js.design/assets/img/65524bfabe0574e7eb227df3.png#b6416d312211d4ea7ad1d771ea69f178",name:"未登录",label:"得闲茶友",points:"0",coupon:"0"},swiperList:[{url:"https://tdesign.gtimg.com/miniprogram/images/swiper1.png"},{url:"https://tdesign.gtimg.com/miniprogram/images/swiper2.png"},{url:"https://tdesign.gtimg.com/miniprogram/images/swiper1.png",ariaLabel:"图片1"},{url:"https://tdesign.gtimg.com/miniprogram/images/swiper2.png"}],current:0,mode:"default"}),methods:{switchTo(o){e.index.switchTab({url:o})},dialogToggle(){this.$refs.alertDialog.open()},change(e){this.current=e.detail.current},userLogin(){e.index.login({provider:"weixin",success:e=>{console.log(e)}})},login(){if(e.index.getStorageSync("token")){const o=e.index.getStorageSync("customer");this.user.name=o.name}else e.index.login({provider:"weixin",success:o=>{let t={code:o.code};e.index.request({url:getApp().globalData.host+"/login/customer",method:"POST",data:{data:t},header:{"content-type":"application/json"},success:o=>{let t=o.data.data.customer.token,i=o.data.data.customer;e.index.setStorageSync("token",t),e.index.setStorageSync("customer",i),this.user.name=i.name}})},fail:function(e){}})}}};if(!Array){(e.resolveComponent("t-image")+e.resolveComponent("t-col")+e.resolveComponent("t-row")+e.resolveComponent("BottomNav")+e.resolveComponent("uni-popup-dialog")+e.resolveComponent("uni-popup"))()}Math||((()=>"../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js")+(()=>"../../uni_modules/uni-popup/components/uni-popup/uni-popup.js"))();const t=e._export_sfc(o,[["render",function(o,t,i,n,s,a){return{a:s.bgimg,b:e.o((e=>o.goToUserInfo())),c:e.p({src:s.user.avatar,shape:"circle",mode:"aspectFill"}),d:e.t(s.user.label),e:e.t(s.user.name),f:e.o((e=>a.dialogToggle())),g:e.t(s.user.points),h:e.o((e=>a.dialogToggle())),i:e.t(s.user.coupon),j:e.o((e=>a.dialogToggle())),k:e.o((e=>a.switchTo("/pages/buy/buy"))),l:e.p({span:"12"}),m:e.o((e=>a.dialogToggle())),n:e.p({span:"12"}),o:e.o((e=>a.dialogToggle())),p:e.o((e=>a.dialogToggle())),q:e.o((e=>a.dialogToggle())),r:e.o((e=>a.userLogin())),s:e.p({vid:"1"}),t:e.o((e=>o.dialogConfirm())),v:e.o((e=>o.dialogClose())),w:e.p({type:"info",confirmText:"好的",title:"温馨提示",content:"服务未开通!尽请期待……"}),x:e.sr("alertDialog","b9985c44-5"),y:e.p({type:"dialog"})}}],["__scopeId","data-v-b9985c44"]]);wx.createPage(t);
