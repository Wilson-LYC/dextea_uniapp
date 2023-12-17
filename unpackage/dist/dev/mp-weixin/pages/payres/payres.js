"use strict";
const common_vendor = require("../../common/vendor.js");
const BottomNav = () => "../../components/BottomNav.js";
const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
const _sfc_main = {
  components: {
    BottomNav
  },
  data() {
    return {
      //布局相关
      menuButtonInfo,
      //右侧胶囊详细信息
      headersty: "padding-top:51px;height:32px;",
      mainsty: "height:calc(100vh - 83px - 20rpx);",
      headerLH: "line-height: 32px;"
    };
  },
  onLoad() {
    console.log("payres load");
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);";
    this.delCartInStorage();
  },
  methods: {
    //前往订单列表
    navToOrderList() {
      common_vendor.index.switchTab({
        url: "/pages/orderList/orderList"
      });
    },
    //删除缓存数据
    delCartInStorage() {
      common_vendor.index.removeStorageSync("cart");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  (_easycom_uni_icons2 + _component_t_image)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.navToOrderList()),
    b: common_vendor.p({
      type: "home",
      size: "20"
    }),
    c: common_vendor.s($data.headerLH),
    d: common_vendor.s($data.headersty),
    e: common_vendor.p({
      src: "https://img.js.design/assets/img/64609bd33424d3dc041d0b36.png#6cb8523e77140f816b53f153ef1a30ec"
    }),
    f: common_vendor.o(($event) => $options.navToOrderList()),
    g: common_vendor.s($data.mainsty)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-5c5f73e4"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/payres/payres.vue"]]);
wx.createPage(MiniProgramPage);
