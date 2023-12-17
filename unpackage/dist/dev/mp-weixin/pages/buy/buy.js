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
      //布局相关 - 初始化数据
      menuButtonInfo,
      //右侧胶囊详细信息
      headersty: "padding-top:51px;height:32px;",
      //header高度
      mainsty: "height:calc(100vh - 83px - 170rpx);",
      //主要内容高度
      headerLH: "line-height: 32px;",
      //header的line-height
      // 商店相关
      store: {},
      // 菜单相关
      menu: [],
      classIndex: 0,
      commScrollId: "class0",
      //商品详情弹窗
      cDetail: {},
      //购物车
      cart: {
        list: [],
        totalPrice: 0,
        totalNum: 0
      }
    };
  },
  onLoad() {
    this.headersty = "padding-top:" + menuButtonInfo.top + "px;height:" + menuButtonInfo.height + "px;";
    this.headerLH = "line-height:" + menuButtonInfo.height + "px;";
    const h = parseInt(menuButtonInfo.height) + parseInt(menuButtonInfo.top);
    this.mainsty = "height:calc(100vh - " + h + "px - 170rpx);";
  },
  onShow() {
    this.cart = this.getCart();
    let city = this.getCity();
    if (city) {
      let sid = this.getStoreId();
      if (sid) {
        this.getStoreInfoBySid(sid).then((res) => {
          this.store = res;
        }).catch((err) => {
          console.log(err);
        });
        this.getMenuBySid(sid).then((res) => {
          this.menu = res;
        }).catch((err) => {
          console.log(err);
        });
      } else {
        this.navToStoreList();
      }
    } else {
      this.navToAreaList();
    }
  },
  onHide() {
    this.saveCart(this.cart);
    if (this.store)
      this.savaSoteInfo(this.store);
  },
  methods: {
    //更换品类
    changMenuClass(index) {
      this.classIndex = index;
      this.commScrollId = "class" + index;
    },
    //单击商品 -> 打开弹窗展示详情
    openCommDetail(detail) {
      this.cDetail = JSON.parse(JSON.stringify(detail));
      this.cDetail.num = 1;
      this.cDetail.finalPrice = this.cDetail.price;
      this.$refs.commDetail.open("bottom");
    },
    //关闭弹窗
    closeCommDetail() {
      this.$refs.commDetail.close();
    },
    //更改定制化选项
    changeCustom(item, newopt) {
      item.opt = newopt;
      this.cDetail.finalPrice = parseFloat(this.cDetail.price);
      for (var i = 0; i < this.cDetail.custom.length; i++) {
        var op = this.cDetail.custom[i].opt;
        this.cDetail.finalPrice += parseFloat(this.cDetail.custom[i].option[op].cost);
      }
    },
    //加入购物车 -> 更新购物车信息
    addToCart() {
      var flag = false;
      for (var i = 0; i < this.cart.list.length; i++) {
        var item = this.cart.list[i];
        if (item.id === this.cDetail.id && JSON.stringify(item.custom) === JSON.stringify(this.cDetail.custom)) {
          item.num += this.cDetail.num;
          flag = true;
        }
      }
      if (!flag) {
        const tmp = JSON.parse(JSON.stringify(this.cDetail));
        this.cart.list.push(tmp);
      }
      this.$refs.commDetail.close();
      this.updataCartInfo();
    },
    //立即购买 -> 清空购物车后再加入商品
    buyNow() {
      this.cart.list = [];
      let tmp = JSON.parse(JSON.stringify(this.cDetail));
      this.cart.list.push(tmp);
      this.updataCartInfo();
      this.comfireOrder();
    },
    //更新购物车的数量和总价
    updataCartInfo() {
      var list = this.cart.list;
      for (var i = 0; i < list.length; i++) {
        var lNum = parseFloat(list[i].num);
        if (lNum < 1)
          this.delCommInCart(i);
      }
      var list = this.cart.list;
      var price = 0;
      var num = 0;
      for (var i = 0; i < list.length; i++) {
        var lPrice = parseFloat(list[i].finalPrice);
        var lNum = parseFloat(list[i].num);
        price += lPrice * lNum;
        num += lNum;
      }
      this.cart.totalNum = num;
      this.cart.totalPrice = price;
    },
    //去结算 -> 确认订单
    comfireOrder() {
      let sid = this.getStoreId();
      this.getStoreInfoBySid(sid).then((res) => {
        this.store = res;
      }).catch((err) => {
        console.log(err);
      });
      if (this.store.openState == "1") {
        common_vendor.index.navigateTo({
          url: "/pages/confirm/confirm"
        });
      } else {
        common_vendor.index.showToast({
          title: "门店已休息~",
          icon: "none",
          duration: 2e3
        });
      }
    },
    //打开购物车
    openCartDetail() {
      this.updataCartInfo();
      this.$refs.cartDetail.open("bottom");
    },
    //关闭购物车
    closeCartDetail() {
      this.updataCartInfo();
      this.$refs.cartDetail.close();
    },
    //购物车删除商品
    delCommInCart(id) {
      this.cart.list.splice(id, 1);
    },
    //保存购物车数据到缓存
    saveCart(val) {
      common_vendor.index.setStorageSync("cart", val);
    },
    //从缓存读取购物车数据
    getCart() {
      const values = common_vendor.index.getStorageSync("cart");
      if (values) {
        return values;
      } else {
        let cart = {
          list: [],
          totalPrice: 0,
          totalNum: 0
        };
        return cart;
      }
    },
    //获取菜单
    getMenuBySid(sid) {
      const token = common_vendor.index.getStorageSync("token");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: getApp().globalData.host + "/v1/customer/menu?id=" + sid,
          method: "GET",
          header: {
            "Authorization": token
          },
          success: (res) => {
            resolve(res.data.data.menu);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    //从缓存读取城市
    getCity() {
      return common_vendor.index.getStorageSync("city");
    },
    //从缓存读取门店
    getStoreId() {
      return common_vendor.index.getStorageSync("sid");
    },
    //从服务器获取门店详情
    getStoreInfoBySid(sid) {
      const token = common_vendor.index.getStorageSync("token");
      return new Promise((resolve, reject) => {
        common_vendor.index.request({
          url: getApp().globalData.host + "/v1/customer/store/detail?id=" + sid,
          header: {
            "Authorization": token
          },
          success: (res) => {
            resolve(res.data.data.store);
          },
          fail: (err) => {
            reject(err);
          }
        });
      });
    },
    //跳转至门店列表页
    navToStoreList() {
      common_vendor.index.navigateTo({
        url: "/pages/storeList/storeList"
      });
    },
    //跳转至区域列表页
    navToAreaList() {
      common_vendor.index.navigateTo({
        url: "/pages/openArea/openArea"
      });
    },
    savaSoteInfo(val) {
      common_vendor.index.setStorageSync("store", val);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_t_image = common_vendor.resolveComponent("t-image");
  const _component_BottomNav = common_vendor.resolveComponent("BottomNav");
  const _easycom_uni_number_box2 = common_vendor.resolveComponent("uni-number-box");
  const _easycom_uni_popup2 = common_vendor.resolveComponent("uni-popup");
  const _easycom_uni_badge2 = common_vendor.resolveComponent("uni-badge");
  const _component_t_col = common_vendor.resolveComponent("t-col");
  const _component_t_row = common_vendor.resolveComponent("t-row");
  (_easycom_uni_icons2 + _component_t_image + _component_BottomNav + _easycom_uni_number_box2 + _easycom_uni_popup2 + _easycom_uni_badge2 + _component_t_col + _component_t_row)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
const _easycom_uni_number_box = () => "../../uni_modules/uni-number-box/components/uni-number-box/uni-number-box.js";
const _easycom_uni_popup = () => "../../uni_modules/uni-popup/components/uni-popup/uni-popup.js";
const _easycom_uni_badge = () => "../../uni_modules/uni-badge/components/uni-badge/uni-badge.js";
if (!Math) {
  (_easycom_uni_icons + _easycom_uni_number_box + _easycom_uni_popup + _easycom_uni_badge)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.s($data.headerLH),
    b: common_vendor.s($data.headersty),
    c: common_vendor.t($data.store.name),
    d: common_vendor.p({
      type: "right",
      size: "15"
    }),
    e: common_vendor.o(($event) => $options.navToStoreList()),
    f: common_vendor.p({
      type: "location",
      size: "13",
      color: "#999999"
    }),
    g: common_vendor.f($data.menu, (item, index, i0) => {
      return {
        a: common_vendor.t(item.class),
        b: common_vendor.o(($event) => $options.changMenuClass(index)),
        c: common_vendor.n($data.classIndex == index ? "class-item-sel" : "class-item")
      };
    }),
    h: common_vendor.f($data.menu, (mit, mIndex, i0) => {
      return {
        a: common_vendor.t(mit.class),
        b: "class" + mIndex,
        c: common_vendor.f(mit.commodity, (cit, cIndex, i1) => {
          return common_vendor.e({
            a: "f2d0c748-2-" + i0 + "-" + i1,
            b: common_vendor.p({
              src: cit.img,
              mode: "widthFix"
            }),
            c: common_vendor.t(cit.name),
            d: common_vendor.t(cit.briefInfo),
            e: common_vendor.t(cit.price),
            f: cit.state == "1"
          }, cit.state == "1" ? {} : {}, {
            g: common_vendor.o(($event) => $options.openCommDetail(cit))
          });
        })
      };
    }),
    i: $data.commScrollId,
    j: common_vendor.s($data.mainsty),
    k: common_vendor.p({
      vid: "2"
    }),
    l: common_vendor.o($options.closeCommDetail),
    m: common_vendor.p({
      type: "closeempty",
      size: "20"
    }),
    n: common_vendor.p({
      src: $data.cDetail.img,
      mode: "heightFix"
    }),
    o: common_vendor.t($data.cDetail.name),
    p: common_vendor.t($data.cDetail.info),
    q: common_vendor.f($data.cDetail.custom, (cdc, k0, i0) => {
      return {
        a: common_vendor.t(cdc.title),
        b: common_vendor.f(cdc.option, (op, index, i1) => {
          return {
            a: common_vendor.t(op.text),
            b: common_vendor.n(index == cdc.opt ? "cdc-item-sel" : "cdc-item"),
            c: common_vendor.o(($event) => $options.changeCustom(cdc, index))
          };
        })
      };
    }),
    r: common_vendor.t($data.cDetail.finalPrice),
    s: common_vendor.o(($event) => $data.cDetail.num = $event),
    t: common_vendor.p({
      min: 1,
      modelValue: $data.cDetail.num
    }),
    v: $data.cDetail.state == "1"
  }, $data.cDetail.state == "1" ? {
    w: common_vendor.o(($event) => $options.buyNow()),
    x: common_vendor.o(($event) => $options.addToCart())
  } : {}, {
    y: common_vendor.sr("commDetail", "f2d0c748-4"),
    z: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    }),
    A: $data.store.openState == "1"
  }, $data.store.openState == "1" ? common_vendor.e({
    B: $data.cart.totalNum > 0
  }, $data.cart.totalNum > 0 ? {
    C: common_vendor.p({
      ["custom-prefix"]: "iconfont",
      type: "icon-bag",
      size: "30",
      color: "#ffffff"
    }),
    D: common_vendor.p({
      size: "small",
      text: $data.cart.totalNum,
      absolute: "rightTop",
      type: "error"
    }),
    E: common_vendor.t($data.cart.totalPrice),
    F: common_vendor.o(($event) => $options.openCartDetail()),
    G: common_vendor.o(($event) => $options.comfireOrder())
  } : {}) : {}, {
    H: $data.store.openState == "2"
  }, $data.store.openState == "2" ? {} : {}, {
    I: common_vendor.p({
      span: "22"
    }),
    J: common_vendor.o(($event) => $options.closeCartDetail()),
    K: common_vendor.p({
      type: "closeempty",
      size: "20"
    }),
    L: common_vendor.p({
      span: "2"
    }),
    M: common_vendor.t($data.store.name),
    N: common_vendor.f($data.cart.list, (comm, cIndex, i0) => {
      return common_vendor.e({
        a: comm.num > 0
      }, comm.num > 0 ? {
        b: "f2d0c748-17-" + i0 + "," + ("f2d0c748-16-" + i0),
        c: common_vendor.p({
          src: comm.img,
          mode: "widthFix"
        }),
        d: "f2d0c748-16-" + i0 + "," + ("f2d0c748-15-" + i0),
        e: common_vendor.p({
          span: "8"
        }),
        f: common_vendor.t(comm.name),
        g: common_vendor.f(comm.custom, (cus, k1, i1) => {
          return {
            a: common_vendor.t(cus.option[cus.opt].text)
          };
        }),
        h: common_vendor.t(comm.finalPrice),
        i: "f2d0c748-20-" + i0 + "," + ("f2d0c748-19-" + i0),
        j: common_vendor.p({
          span: "8"
        }),
        k: "f2d0c748-22-" + i0 + "," + ("f2d0c748-21-" + i0),
        l: common_vendor.o(($event) => comm.num = $event),
        m: common_vendor.p({
          modelValue: comm.num
        }),
        n: "f2d0c748-21-" + i0 + "," + ("f2d0c748-19-" + i0),
        o: common_vendor.p({
          span: "10",
          offset: "4"
        }),
        p: "f2d0c748-19-" + i0 + "," + ("f2d0c748-18-" + i0),
        q: "f2d0c748-18-" + i0 + "," + ("f2d0c748-15-" + i0),
        r: common_vendor.p({
          span: "16"
        }),
        s: "f2d0c748-15-" + i0 + ",f2d0c748-10",
        t: common_vendor.p({
          gutter: 10
        })
      } : {});
    }),
    O: $data.cart.list.length > 0
  }, $data.cart.list.length > 0 ? {
    P: common_vendor.o(($event) => $options.comfireOrder())
  } : {}, {
    Q: $data.cart.list.length < 1
  }, $data.cart.list.length < 1 ? {} : {}, {
    R: common_vendor.sr("cartDetail", "f2d0c748-10"),
    S: common_vendor.p({
      type: "bottom",
      ["safe-area"]: false
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-f2d0c748"], ["__file", "D:/CodeBase/uniapp/dextea_uniui/pages/buy/buy.vue"]]);
wx.createPage(MiniProgramPage);
