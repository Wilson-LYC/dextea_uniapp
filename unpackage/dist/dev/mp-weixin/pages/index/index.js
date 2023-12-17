"use strict";
const common_vendor = require("../../common/vendor.js");
const BottomNav = () => "../../components/BottomNav.js";
const _sfc_main = {
  onLoad() {
    this.login();
  },
  components: {
    BottomNav
  },
  data() {
    return {
      bgimg: "https://img.js.design/assets/img/65250ec4a2052b1e24d16742.jpg#7c1634846e24472b676d6da5db896bbd",
      user: {
        avatar: "https://img.js.design/assets/img/65524bfabe0574e7eb227df3.png#b6416d312211d4ea7ad1d771ea69f178",
        name: "未登录",
        label: "得闲茶友",
        points: "0",
        coupon: "0"
      },
      swiperList: [
        {
          url: "https://tdesign.gtimg.com/miniprogram/images/swiper1.png"
        },
        {
          url: "https://tdesign.gtimg.com/miniprogram/images/swiper2.png"
        },
        {
          url: "https://tdesign.gtimg.com/miniprogram/images/swiper1.png",
          ariaLabel: "图片1"
        },
        {
          url: "https://tdesign.gtimg.com/miniprogram/images/swiper2.png"
        }
      ],
      current: 0,
      mode: "default"
    };
  },
  methods: {
    // 单击用户名跳转用户信息详情页面
    switchTo(path) {
      common_vendor.index.switchTab({
        url: path
      });
    },
    dialogToggle() {
      this.$refs.alertDialog.open();
    },
    change(e) {
      this.current = e.detail.current;
    },
    userLogin() {
      common_vendor.index.login({
        provider: "weixin",
        success: (res) => {
          console.log(res);
        }
      });
    },
    login() {
      common_vendor.index.login({
        provider: "weixin",
        success: (loginRes) => {
          let sData = {
            code: loginRes.code
          };
          common_vendor.index.request({
            url: getApp().globalData.host + "/login/customer",
            method: "POST",
            data: {
              data: sData
            },
            header: {
              "content-type": "application/json"
            },
            success: (res) => {
              let token = res.data.data.customer.token;
              let customer = res.data.data.customer;
              common_vendor.index.setStorageSync("token", token);
              common_vendor.index.setStorageSync("customer", customer);
              this.user.name = customer.name;
            }
          });
        },
        fail: function(err) {
        }
      });
    }
  }
};
if (!Array) {
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_t_col = common_vendor.resolveComponent("t-col");
  const _component_t_row = common_vendor.resolveComponent("t-row");
  const _component_BottomNav = common_vendor.resolveComponent("BottomNav");
  const _easycom_uni_popup_dialog2 = common_vendor.resolveComponent("uni-popup-dialog");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  (_component_t_image + _component_t_col + _component_t_row + _component_BottomNav + _easycom_uni_popup_dialog2 + _easycom_uni_popup2)();
}
const _easycom_uni_popup_dialog = () => "../../uni_modules/uni-popup/components/uni-popup-dialog/uni-popup-dialog.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
if (!Math) {
  (_easycom_uni_popup_dialog + _easycom_uni_popup)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.bgimg,
    b: common_vendor.o(($event) => _ctx.goToUserInfo()),
    c: common_vendor.p({
      src: $data.user.avatar,
      shape: "circle",
      mode: "aspectFill"
    }),
    d: common_vendor.t($data.user.label),
    e: common_vendor.t($data.user.name),
    f: common_vendor.o(($event) => $options.dialogToggle()),
    g: common_vendor.t($data.user.points),
    h: common_vendor.o(($event) => $options.dialogToggle()),
    i: common_vendor.t($data.user.coupon),
    j: common_vendor.o(($event) => $options.dialogToggle()),
    k: common_vendor.o(($event) => $options.switchTo("/pages/buy/buy")),
    l: common_vendor.p({
      span: "12"
    }),
    m: common_vendor.o(($event) => $options.dialogToggle()),
    n: common_vendor.p({
      span: "12"
    }),
    o: common_vendor.o(($event) => $options.dialogToggle()),
    p: common_vendor.o(($event) => $options.dialogToggle()),
    q: common_vendor.o(($event) => $options.dialogToggle()),
    r: common_vendor.o(($event) => $options.userLogin()),
    s: common_vendor.p({
      vid: "1"
    }),
    t: common_vendor.o(($event) => _ctx.dialogConfirm()),
    v: common_vendor.o(($event) => _ctx.dialogClose()),
    w: common_vendor.p({
      type: "info",
      confirmText: "好的",
      title: "温馨提示",
      content: "服务未开通!尽请期待……"
    }),
    x: common_vendor.sr("alertDialog", "1cf27b2a-5"),
    y: common_vendor.p({
      type: "dialog"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
