(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-72cfc5fa"],{"4f9b":function(e,t,o){"use strict";o.r(t);var a=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("el-card",{staticClass:"box-card"},[o("el-alert",{attrs:{title:"添加商品信息",type:"info","show-icon":"",closable:!1,center:""}}),o("el-steps",{staticClass:"add-step",attrs:{space:400,"align-center":"",active:e.activeStep-0,"finish-status":"success"}},[o("el-step",{attrs:{title:"进本信息"}}),o("el-step",{attrs:{title:"商品参数"}}),o("el-step",{attrs:{title:"商品属性"}}),o("el-step",{attrs:{title:"商品图片"}}),o("el-step",{attrs:{title:"商品内容"}}),o("el-step",{attrs:{title:"完成"}})],1),o("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",rules:e.rules,"label-position":"top"}},[o("el-tabs",{attrs:{"tab-position":"left","before-leave":e.beforeTabLeave},model:{value:e.activeStep,callback:function(t){e.activeStep=t},expression:"activeStep"}},[o("el-tab-pane",{attrs:{label:"进本信息",name:"0"}},[o("el-form-item",{attrs:{label:"商品名称",prop:"goods_name"}},[o("el-input",{model:{value:e.form.goods_name,callback:function(t){e.$set(e.form,"goods_name",t)},expression:"form.goods_name"}})],1),o("el-form-item",{attrs:{label:"商品价格",prop:"goods_price"}},[o("el-input",{model:{value:e.form.goods_price,callback:function(t){e.$set(e.form,"goods_price",t)},expression:"form.goods_price"}})],1),o("el-form-item",{attrs:{label:"商品重量",prop:"goods_weight"}},[o("el-input",{model:{value:e.form.goods_weight,callback:function(t){e.$set(e.form,"goods_weight",t)},expression:"form.goods_weight"}})],1),o("el-form-item",{attrs:{label:"商品数量",prop:"goods_number"}},[o("el-input",{model:{value:e.form.goods_number,callback:function(t){e.$set(e.form,"goods_number",t)},expression:"form.goods_number"}})],1),o("el-form-item",{attrs:{label:"商品分类",prop:"goods_cat"}},[o("el-alert",{staticStyle:{"margin-bottom":"20px",width:"270px"},attrs:{title:"注意:只允许为第三级分类设置参数",type:"warning","show-icon":"",closable:!1}}),o("el-cascader",{staticStyle:{width:"270px"},attrs:{"expand-trigger":"hover",options:e.catList,props:e.cascaderProps},on:{change:e.catChange},model:{value:e.form.goods_cat,callback:function(t){e.$set(e.form,"goods_cat",t)},expression:"form.goods_cat"}})],1)],1),o("el-tab-pane",{attrs:{label:"商品参数",name:"1"}},[e._v("商品参数")]),o("el-tab-pane",{attrs:{label:"商品属性",name:"2"}},[e._v("商品属性")]),o("el-tab-pane",{attrs:{label:"商品图片",name:"3"}},[e._v("商品图片")]),o("el-tab-pane",{attrs:{label:"商品内容",name:"4"}},[e._v("商品内容")])],1)],1)],1)],1)},s=[],r={name:"Add",data:function(){return{activeStep:"0",form:{goods_name:"",goods_price:0,goods_number:0,goods_weight:0,goods_cat:[]},rules:{goods_name:[{required:!0,message:"请输入商品名称",trigger:"blur"}],goods_price:[{required:!0,message:"请输入商品价格",trigger:"blur"}],goods_number:[{required:!0,message:"请输入商品数量",trigger:"blur"}],goods_weight:[{required:!0,message:"请输入商品重量",trigger:"blur"}],goods_cat:[{required:!0,message:"请选择商品分类",trigger:"blur"}]},cascaderProps:{value:"cat_id",label:"cat_name",children:"children"},catList:[]}},methods:{getCatList:function(){var e=this;this.$http.get("categories").then((function(t){e.catList=t.data.data}))},catChange:function(){console.log(this.form.goods_cat),3==this.form.goods_cat.length||(this.form.goods_cat=[])},beforeTabLeave:function(e,t){if("0"==t&&this.form.goods_cat.length<3)return this.$message({showClose:!0,message:"请选择商品分类",type:"error"}),!1}},created:function(){this.getCatList()}},l=r,i=(o("c796"),o("2877")),n=Object(i["a"])(l,a,s,!1,null,"6b657958",null);t["default"]=n.exports},a4f9:function(e,t,o){},c796:function(e,t,o){"use strict";var a=o("a4f9"),s=o.n(a);s.a}}]);
//# sourceMappingURL=chunk-72cfc5fa.f8b20522.js.map