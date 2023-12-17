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
      mainsty: "height:calc(100vh - 83px - 100rpx);",
      headerLH: "line-height: 32px;",
      //城市
      city: "",
      //本市所有门店
      storeList: []
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 100rpx);";
  },
  onShow() {
    let city = this.getCity();
    if (city) {
      this.city = city;
      this.getStoreList(city).then((res) => {
        this.storeList = res;
      }).catch((err) => {
        console.log(err);
      });
    } else {
      this.navToAreaList();
    }
    this.getStoreFromStorage();
  },
  methods: {
    //返回
    back() {
      common_vendor.index.navigateBack();
    },
    //从缓存读取城市
    getCity() {
      return common_vendor.index.getStorageSync("city");
    },
    saveSid(sid) {
      common_vendor.index.setStorageSync("sid", sid);
    },
    getStoreList(city) {
      const token = common_vendor.index.getStorageSync("token");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
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
        });
      });
    },
    //前往购买页面
    navToBuy() {
      common_vendor.index.switchTab({
        url: "/pages/buy/buy"
      });
    },
    //跳转至区域列表页
    navToAreaList() {
      common_vendor.index.navigateTo({
        url: "/pages/openArea/openArea"
      });
    },
    //选择门店
    selStore(val) {
      this.saveSid(val.id);
      this.navToBuy();
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.back()),
    b: common_vendor.p({
      type: "back",
      size: "20"
    }),
    c: common_vendor.s($data.headerLH),
    d: common_vendor.s($data.headersty),
    e: common_vendor.t($data.city),
    f: common_vendor.p({
      type: "bottom",
      size: "18"
    }),
    g: common_vendor.o(($event) => $options.navToAreaList()),
    h: common_vendor.f($data.storeList, (sit, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(sit.name),
        b: "aa01ade3-2-" + i0,
        c: sit.address.length < 15
      }, sit.address.length < 15 ? {
        d: common_vendor.t(sit.address)
      } : {
        e: common_vendor.t(sit.address.substring(0, 15))
      }, {
        f: sit.openState == "1"
      }, sit.openState == "1" ? {} : {}, {
        g: common_vendor.o(($event) => $options.selStore(sit))
      });
    }),
    i: common_vendor.p({
      type: "location",
      size: "15",
      color: "#a5a5a5"
    }),
    j: common_vendor.s($data.mainsty)
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-aa01ade3"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/storeList/storeList.vue"]]);
wx.createPage(MiniProgramPage);
