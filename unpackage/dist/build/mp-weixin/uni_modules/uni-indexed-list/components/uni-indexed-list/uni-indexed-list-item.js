"use strict";const e=require("../../../../common/vendor.js"),t={name:"UniIndexedList",emits:["itemClick"],props:{loaded:{type:Boolean,default:!1},idx:{type:Number,default:0},list:{type:Object,default:()=>({})},showSelect:{type:Boolean,default:!1}},methods:{onClick(e,t){this.$emit("itemClick",{idx:e,index:t})}}};if(!Array){e.resolveComponent("uni-icons")()}Math;const i=e._export_sfc(t,[["render",function(t,i,l,s,o,d){return e.e({a:l.loaded||l.list.itemIndex<15},l.loaded||l.list.itemIndex<15?e.e({b:l.list.items&&l.list.items.length>0},l.list.items&&l.list.items.length>0?{c:e.t(l.list.key)}:{}):{},{d:(l.loaded||l.list.itemIndex<15)&&l.list.items&&l.list.items.length>0},(l.loaded||l.list.itemIndex<15)&&l.list.items&&l.list.items.length>0?{e:e.f(l.list.items,((t,i,s)=>e.e(l.showSelect?{a:"2e30f7bc-0-"+s,b:e.p({type:t.checked?"checkbox-filled":"circle",color:t.checked?"#007aff":"#C0C0C0",size:"24"})}:{},{c:e.t(t.name),d:i===l.list.items.length-1?1:"",e:e.o((e=>d.onClick(l.idx,i)),i),f:i}))),f:l.showSelect}:{})}]]);wx.createComponent(i);