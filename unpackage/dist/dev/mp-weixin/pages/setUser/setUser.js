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
      mainsty: "height:calc(100vh - 83px - 200rpx);",
      headerLH: "line-height: 32px;",
      user: {
        name: "",
        phone: ""
      }
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 200rpx);";
  },
  onShow() {
    this.user = this.getCustomer();
    console.log(this.getCustomer());
  },
  methods: {
    //返回
    back() {
      common_vendor.index.navigateBack();
    },
    getCustomer() {
      return common_vendor.index.getStorageSync("customer");
    },
    submit() {
      common_vendor.index.showToast({
        title: "功能未开放，敬请期待……",
        duration: 2e3,
        icon: "none"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _easycom_uni_easyinput2 + _easycom_uni_section2)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_easyinput = () => "../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_easyinput + _easycom_uni_section)();
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
    e: common_vendor.o(($event) => $data.user.name = $event),
    f: common_vendor.p({
      clearable: false,
      modelValue: $data.user.name
    }),
    g: common_vendor.p({
      title: "用户名",
      type: "line",
      padding: true
    }),
    h: common_vendor.o(($event) => $data.user.phone = $event),
    i: common_vendor.p({
      clearable: false,
      modelValue: $data.user.phone
    }),
    j: common_vendor.p({
      title: "手机号",
      type: "line",
      padding: true
    }),
    k: common_vendor.s($data.mainsty),
    l: common_vendor.o(($event) => $options.submit())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-c128821d"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/setUser/setUser.vue"]]);
wx.createPage(MiniProgramPage);
