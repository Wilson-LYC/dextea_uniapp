"use strict";
const common_vendor = require("../../common/vendor.js");
const menuButtonInfo = common_vendor.index.getMenuButtonBoundingClientRect();
const _sfc_main = {
  components: {},
  data() {
    return {
      //布局相关
      menuButtonInfo,
      //右侧胶囊详细信息
      headersty: "padding-top:51px;height:32px;",
      mainsty: "height:calc(100vh - 83px - 20rpx);",
      headerLH: "line-height: 32px;",
      //区域
      area: []
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);";
  },
  onShow() {
    this.getArea().then((res) => {
      this.area = res;
    }).catch((err) => {
      console.error("Error:", err);
    });
  },
  methods: {
    //返回
    navBack() {
      common_vendor.index.navigateBack();
    },
    navToStoreList() {
      common_vendor.index.redirectTo({
        url: "/pages/storeList/storeList"
      });
    },
    //选择了城市
    bindClick(e) {
      var city = e.item.name;
      common_vendor.index.setStorageSync("city", city);
      this.navToStoreList();
    },
    getArea() {
      const token = common_vendor.index.getStorageSync("token");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
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
        });
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_indexed_list2 = common_vendor.resolveComponent("uni-indexed-list");
  (_easycom_uni_icons2 + _easycom_uni_indexed_list2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_indexed_list = () => "../../uni_modules/uni-indexed-list/components/uni-indexed-list/uni-indexed-list.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_indexed_list)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.navBack()),
    b: common_vendor.p({
      type: "back",
      size: "20"
    }),
    c: common_vendor.s($data.headerLH),
    d: common_vendor.s($data.headersty),
    e: common_vendor.o($options.bindClick),
    f: common_vendor.p({
      options: $data.area,
      showSelect: false
    }),
    g: common_vendor.s($data.mainsty)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-da71ba54"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/openArea/openArea.vue"]]);
wx.createPage(MiniProgramPage);
