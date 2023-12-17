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
      cart: [],
      store: "",
      customer: "",
      phone: "",
      note: ""
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 200rpx);";
  },
  onShow() {
    this.cart = this.getCart();
    this.store = this.getStore();
    this.customer = this.getCustomer();
    this.getQueue().then((res) => {
      this.store.queue = res;
    }).catch((err) => {
      console.log(err);
    });
  },
  methods: {
    //从缓存读取购物车数据
    getCart() {
      return common_vendor.index.getStorageSync("cart");
    },
    //从缓存读取用户数据
    getCustomer() {
      return common_vendor.index.getStorageSync("customer");
    },
    //返回
    back() {
      common_vendor.index.navigateBack();
    },
    //支付
    pay() {
      if (this.phone == null || this.phone == "") {
        common_vendor.index.showModal({
          title: "提示",
          content: "请输入联系方式",
          showCancel: false,
          confirmColor: "#B8701B",
          success: function(res) {
            return;
          }
        });
      } else {
        let comm = [];
        for (var i = 0; i < this.cart.list.length; i++) {
          let citem = this.cart.list[i];
          let cust = [];
          for (var j = 0; j < citem.custom.length; j++) {
            let dzit = citem.custom[j];
            const value = {
              "item": dzit.title,
              "value": dzit.option[dzit.opt].text
            };
            cust.push(value);
          }
          let new_item = {
            id: citem.id,
            name: citem.name,
            price: citem.finalPrice,
            img: citem.img,
            num: citem.num,
            custom: cust
          };
          comm.push(new_item);
        }
        let order = {
          sid: this.store.id,
          cid: this.customer.id,
          num: this.cart.totalNum,
          price: this.cart.totalPrice,
          commodity: comm,
          phone: this.phone,
          note: this.note
        };
        const token = common_vendor.index.getStorageSync("token");
        common_vendor.index.showModal({
          title: "提示",
          content: "点击“确定”模拟支付完成",
          confirmColor: "#B8701B",
          success: (res) => {
            if (res.confirm) {
              common_vendor.index.showLoading({
                title: "提交中"
              });
              common_vendor.index.request({
                url: getApp().globalData.host + "/v1/customer/order/add",
                method: "POST",
                data: {
                  data: order
                },
                header: {
                  "content-type": "application/json",
                  "Authorization": token
                },
                success: (res2) => {
                  common_vendor.index.hideLoading();
                  common_vendor.index.navigateTo({
                    url: "/pages/payres/payres",
                    animationType: "none"
                  });
                },
                fail: (res2) => {
                  console.log(res2);
                }
              });
            } else if (res.cancel) {
              console.log("用户点击取消");
            }
          }
        });
      }
    },
    //删除缓存数据
    delCart() {
      common_vendor.index.removeStorageSync("cart");
    },
    getQueue() {
      const token = common_vendor.index.getStorageSync("token");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: getApp().globalData.host + "/v1/customer/storequeue?id=" + this.store.id,
          method: "GET",
          header: {
            "Authorization": token
          },
          success: (res) => {
            resolve(res.data.data.queue);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    //从缓存读取门店
    getStore() {
      return common_vendor.index.getStorageSync("store");
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _easycom_uni_easyinput2 = common_vendor.resolveComponent("uni-easyinput");
  const _easycom_uni_section2 = common_vendor.resolveComponent("uni-section");
  (_easycom_uni_icons2 + _component_t_image + _easycom_uni_easyinput2 + _easycom_uni_section2)();
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
    e: common_vendor.t($data.store.name),
    f: common_vendor.t($data.store.queue),
    g: common_vendor.f($data.cart.list, (comm, k0, i0) => {
      return {
        a: "eec36e84-1-" + i0,
        b: common_vendor.p({
          src: comm.img,
          mode: "widthFix"
        }),
        c: common_vendor.t(comm.name),
        d: common_vendor.f(comm.custom, (op, k1, i1) => {
          return {
            a: common_vendor.t(op.option[op.opt].text)
          };
        }),
        e: common_vendor.t(comm.finalPrice),
        f: common_vendor.t(comm.num)
      };
    }),
    h: common_vendor.t($data.cart.totalPrice),
    i: common_vendor.t($data.cart.totalNum),
    j: common_vendor.o(($event) => $data.phone = $event),
    k: common_vendor.p({
      placeholder: "",
      modelValue: $data.phone
    }),
    l: common_vendor.p({
      title: "联系方式",
      subTitle: "",
      type: "line",
      padding: true
    }),
    m: common_vendor.o(($event) => $data.note = $event),
    n: common_vendor.p({
      type: "textarea",
      autoHeight: true,
      placeholder: "",
      modelValue: $data.note
    }),
    o: common_vendor.p({
      title: "订单备注",
      subTitle: "",
      type: "line",
      padding: true
    }),
    p: common_vendor.s($data.mainsty),
    q: common_vendor.o(($event) => $options.pay())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-eec36e84"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/confirm/confirm.vue"]]);
wx.createPage(MiniProgramPage);
