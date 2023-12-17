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
      mainsty: "height:calc(100vh - 83px - 170rpx);",
      headerLH: "line-height: 32px;",
      //订单数据
      orderList: []
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 170rpx);";
  },
  onShow() {
    this.getOrder();
  },
  methods: {
    navToDetail(id) {
      common_vendor.index.navigateTo({
        url: "/pages/orderDetail/orderDetail?id=" + id
      });
    },
    getOrder() {
      const token = common_vendor.index.getStorageSync("token");
      const customer = common_vendor.index.getStorageSync("customer");
      common_vendor.index.request({
        url: getApp().globalData.host + "/v1/customer/order/list?id=" + customer.id,
        method: "GET",
        header: {
          "Authorization": token
        },
        success: (res) => {
          this.orderList = res.data.data.order;
        },
        fail: (res) => {
        }
      });
    }
  }
};
if (!Array) {
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_BottomNav = common_vendor.resolveComponent("BottomNav");
  (_component_t_image + _component_BottomNav)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.s($data.headerLH),
    b: common_vendor.s($data.headersty),
    c: common_vendor.f($data.orderList, (od, k0, i0) => {
      return common_vendor.e({
        a: common_vendor.t(od.type),
        b: common_vendor.t(od.store),
        c: od.state == "1"
      }, od.state == "1" ? {} : od.state == "2" ? {} : od.state == "3" ? {} : od.state == "4" ? {} : od.state == "0" ? {} : {}, {
        d: od.state == "2",
        e: od.state == "3",
        f: od.state == "4",
        g: od.state == "0",
        h: common_vendor.t(od.time),
        i: common_vendor.f(od.commodity, (item, k1, i1) => {
          return {
            a: "1d51308d-0-" + i0 + "-" + i1,
            b: common_vendor.p({
              src: item.img
            })
          };
        }),
        j: common_vendor.t(od.price),
        k: common_vendor.t(od.num),
        l: od.state != "4" && od.state != "0"
      }, od.state != "4" && od.state != "0" ? {
        m: common_vendor.t(od.code)
      } : {}, {
        n: common_vendor.o(($event) => $options.navToDetail(od.id))
      });
    }),
    d: common_vendor.s($data.mainsty),
    e: common_vendor.p({
      vid: "3"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1d51308d"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/orderList/orderList.vue"]]);
wx.createPage(MiniProgramPage);
