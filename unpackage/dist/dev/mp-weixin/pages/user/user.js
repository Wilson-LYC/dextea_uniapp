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
      mainsty: "height:calc(100vh - 150rpx);",
      headerLH: "line-height: 32px;",
      //
      bgimg: "https://img.js.design/assets/img/655756ef36b76e1b4624e4db.png#c77afea5e25c8836b461646cd175f6c8",
      user: {
        id: "",
        name: ""
      }
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - 150rpx);";
  },
  onShow() {
    this.user = this.getCustomer();
  },
  methods: {
    navToDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetail/orderDetail?id=" + id
      });
    },
    navToSetUser() {
      common_vendor.index.navigateTo({
        url: "/pages/setUser/setUser",
        animationType: "none"
      });
    },
    getCustomer() {
      return common_vendor.index.getStorageSync("customer");
    },
    waiting() {
      common_vendor.index.showToast({
        title: "功能未开放，敬请期待……",
        duration: 2e3,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_BottomNav = common_vendor.resolveComponent("BottomNav");
  (_component_t_image + _easycom_uni_icons2 + _component_BottomNav)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.p({
      src: $data.bgimg
    }),
    b: common_vendor.t($data.user.name),
    c: common_vendor.o(($event) => $options.waiting()),
    d: common_vendor.o(($event) => $options.waiting()),
    e: common_vendor.o(($event) => $options.waiting()),
    f: common_vendor.p({
      type: "compose",
      size: "25"
    }),
    g: common_vendor.o(($event) => $options.navToSetUser()),
    h: common_vendor.p({
      type: "notification",
      size: "25"
    }),
    i: common_vendor.o(($event) => $options.waiting()),
    j: common_vendor.p({
      type: "chatboxes",
      size: "25"
    }),
    k: common_vendor.o(($event) => $options.waiting()),
    l: common_vendor.p({
      type: "more",
      size: "25"
    }),
    m: common_vendor.o(($event) => $options.waiting()),
    n: common_vendor.s($data.mainsty),
    o: common_vendor.p({
      vid: "4"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-0f7520f0"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
