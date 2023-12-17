"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/user/user.js";
  "./pages/buy/buy.js";
  "./pages/orderList/orderList.js";
  "./pages/confirm/confirm.js";
  "./pages/payres/payres.js";
  "./pages/orderDetail/orderDetail.js";
  "./pages/storeList/storeList.js";
  "./pages/openArea/openArea.js";
  "./pages/setUser/setUser.js";
}
const _sfc_main = {
  onLaunch: function() {
  },
  onShow: function() {
  },
  onHide: function() {
  },
  globalData: {
    host: "https://dexapi.ycwisdom.cn"
  }
};
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/CodeBase/uniapp/dextea_uniui/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
