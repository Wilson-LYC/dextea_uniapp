"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  props: {
    vid: String
  },
  data() {
    return {
      list: [
        {
          vid: 1,
          text: "首页",
          icon: "icon-home",
          path: "/pages/index/index"
        },
        {
          vid: 2,
          text: "点单",
          icon: "icon-cup",
          path: "/pages/buy/buy"
        },
        {
          vid: 3,
          text: "订单",
          icon: "icon-cart",
          path: "/pages/orderList/orderList"
        },
        {
          vid: 4,
          text: "我的",
          icon: "icon-user",
          path: "/pages/user/user"
        }
      ]
    };
  },
  methods: {
    switchTo(path) {
      common_vendor.index.switchTab({
        url: path
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.list, (it, k0, i0) => {
      return common_vendor.e({
        a: $props.vid == it.vid
      }, $props.vid == it.vid ? {
        b: "53d1cde7-0-" + i0,
        c: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: it.icon,
          size: "15",
          color: "#B8701B"
        }),
        d: common_vendor.t(it.text)
      } : {
        e: "53d1cde7-1-" + i0,
        f: common_vendor.p({
          ["custom-prefix"]: "iconfont",
          type: it.icon,
          size: "15"
        }),
        g: common_vendor.t(it.text)
      }, {
        h: common_vendor.o(($event) => $options.switchTo(it.path))
      });
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-53d1cde7"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/components/BottomNav.vue"]]);
wx.createComponent(Component);
