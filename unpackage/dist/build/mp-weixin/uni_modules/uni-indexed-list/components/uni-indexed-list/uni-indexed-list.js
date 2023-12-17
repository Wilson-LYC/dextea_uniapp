"use strict";const t=require("../../../../common/vendor.js"),e={name:"UniIndexedList",components:{indexedListItem:()=>"./uni-indexed-list-item.js"},emits:["click"],props:{options:{type:Array,default:()=>[]},showSelect:{type:Boolean,default:!1}},data:()=>({lists:[],winHeight:0,itemHeight:0,winOffsetY:0,touchmove:!1,touchmoveIndex:-1,scrollViewId:"",touchmovable:!0,loaded:!1,isPC:!1}),watch:{options:{handler:function(){this.setList()},deep:!0}},mounted(){setTimeout((()=>{this.setList()}),50),setTimeout((()=>{this.loaded=!0}),300)},methods:{setList(){let e=0;this.lists=[],this.options.forEach((t=>{if(0===t.data.length)return;let i=e,s=t.data.map((i=>{let s={};return s.key=t.letter,s.name=i,s.itemIndex=e,e++,s.checked=!!i.checked&&i.checked,s}));this.lists.push({title:t.letter,key:t.letter,items:s,itemIndex:i})})),t.index.createSelectorQuery().in(this).select("#list").boundingClientRect().exec((t=>{this.winOffsetY=t[0].top,this.winHeight=t[0].height,this.itemHeight=this.winHeight/this.lists.length}))},touchStart(t){this.touchmove=!0;let e=this.isPC?t.pageY:t.touches[0].pageY,i=Math.floor((e-this.winOffsetY)/this.itemHeight);this.lists[i]&&(this.scrollViewId="uni-indexed-list-"+i,this.touchmoveIndex=i)},touchMove(t){let e=this.isPC?t.pageY:t.touches[0].pageY,i=Math.floor((e-this.winOffsetY)/this.itemHeight);if(this.touchmoveIndex===i)return!1;this.lists[i]&&(this.scrollViewId="uni-indexed-list-"+i,this.touchmoveIndex=i)},touchEnd(){this.touchmove=!1},mousedown(t){this.isPC&&this.touchStart(t)},mousemove(t){this.isPC&&this.touchMove(t)},mouseleave(t){this.isPC&&this.touchEnd(t)},onClick(t){let{idx:e,index:i}=t,s={};for(let h in this.lists[e].items[i])s[h]=this.lists[e].items[i][h];let o=[];this.showSelect&&(this.lists[e].items[i].checked=!this.lists[e].items[i].checked,this.lists.forEach(((t,e)=>{t.items.forEach(((t,i)=>{if(t.checked){let t={};for(let s in this.lists[e].items[i])t[s]=this.lists[e].items[i][s];o.push(t)}}))}))),this.$emit("click",{item:s,select:o})}}};if(!Array){t.resolveComponent("indexed-list-item")()}const i=t._export_sfc(e,[["render",function(e,i,s,o,h,n){return t.e({a:t.f(h.lists,((e,i,o)=>({a:t.o(n.onClick,i),b:"442c70e4-0-"+o,c:t.p({list:e,loaded:h.loaded,idx:i,showSelect:s.showSelect}),d:i,e:"uni-indexed-list-"+i}))),b:h.scrollViewId,c:t.f(h.lists,((e,i,s)=>({a:t.t(e.key),b:t.n(h.touchmoveIndex==i?"uni-indexed-list__menu-text--active":""),c:i,d:t.n(h.touchmoveIndex==i?"uni-indexed-list__menu--active":"")}))),d:t.o(((...t)=>n.touchStart&&n.touchStart(...t))),e:t.o(((...t)=>n.touchMove&&n.touchMove(...t))),f:t.o(((...t)=>n.touchEnd&&n.touchEnd(...t))),g:t.o(((...t)=>n.mousedown&&n.mousedown(...t))),h:t.o(((...t)=>n.mousemove&&n.mousemove(...t))),i:t.o(((...t)=>n.mouseleave&&n.mouseleave(...t))),j:h.touchmove},h.touchmove?{k:t.t(h.lists[h.touchmoveIndex].key)}:{})}]]);wx.createComponent(i);