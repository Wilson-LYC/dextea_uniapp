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
      makeState: [
        {
          title: "已下单"
        },
        {
          title: "制作中"
        },
        {
          title: "待取餐"
        },
        {
          title: "已完成"
        }
      ],
      //订单数据
      order: {},
      oid: "",
      queue: ""
    };
  },
  onLoad: function(option) {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 20rpx);";
    this.oid = option.id;
    this.getOrder();
  },
  methods: {
    //返回
    backToBuy() {
      common_vendor.index.navigateBack();
    },
    getOrder() {
      const token = common_vendor.index.getStorageSync("token");
      common_vendor.index.getStorageSync("customer");
      common_vendor.index.request({
        url: getApp().globalData.host + "/v1/customer/order/detail?id=" + this.oid,
        method: "GET",
        header: {
          "Authorization": token
        },
        success: (res) => {
          this.order = res.data.data.order;
          this.order.state = Number(this.order.state) - 1;
        },
        fail: (res) => {
          console.log(res);
        }
      });
    }
    // getQueue(){
    // 	const token = uni.getStorageSync('token');
    // 	uni.request({
    // 		url: "http://192.168.205.57:6688/customer/order/queue?id="+this.oid,
    // 		method: "GET",
    // 		header: {
    // 			"Authorization": token
    // 		},
    // 		success: (res) => {
    // 			this.queue=res.data.data.queue
    // 		},
    // 		fail: (res) => {
    // 			console.log(res)
    // 		}
    // 	})
    // }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _easycom_uni_steps2 = common_vendor.resolveComponent("uni-steps");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  (_easycom_uni_icons2 + _easycom_uni_steps2 + _easycom_uni_section2 + _component_t_image)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_steps = () => "../../uni_modules/uni-steps/components/uni-steps/uni-steps.js";
const _easycom_uni_section = () => "../../uni_modules/uni-section/components/uni-section/uni-section.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_steps + _easycom_uni_section)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o(($event) => $options.backToBuy()),
    b: common_vendor.p({
      type: "back",
      size: "20"
    }),
    c: common_vendor.s($data.headerLH),
    d: common_vendor.s($data.headersty),
    e: common_vendor.t($data.order.code),
    f: common_vendor.p({
      options: $data.makeState,
      active: $data.order.state,
      ["active-color"]: "#b28561"
    }),
    g: common_vendor.t($data.order.store.name),
    h: $data.order.state == "1" || $data.order.state == "2"
  }, $data.order.state == "1" || $data.order.state == "2" ? {
    i: common_vendor.t($data.order.store.queue)
  } : {}, {
    j: common_vendor.f($data.order.commodity, (comm, k0, i0) => {
      return {
        a: "1353b6cf-3-" + i0,
        b: common_vendor.p({
          src: comm.img,
          mode: "widthFix"
        }),
        c: common_vendor.t(comm.name),
        d: common_vendor.f(comm.custom, (op, k1, i1) => {
          return {
            a: common_vendor.t(op.value)
          };
        }),
        e: common_vendor.t(comm.price),
        f: common_vendor.t(comm.num)
      };
    }),
    k: common_vendor.t($data.order.price),
    l: common_vendor.t($data.order.num),
    m: common_vendor.t($data.order.time),
    n: common_vendor.t($data.order.code),
    o: common_vendor.t($data.order.id),
    p: common_vendor.t($data.order.note),
    q: common_vendor.t($data.order.phone),
    r: common_vendor.s($data.mainsty)
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1353b6cf"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/orderDetail/orderDetail.vue"]]);
wx.createPage(MiniProgramPage);
