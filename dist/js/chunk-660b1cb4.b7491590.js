(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-660b1cb4"],{3566:function(t,e,a){},c254:function(t,e,a){"use strict";var s=a("3566"),n=a.n(s);n.a},cb8b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("el-card",{staticClass:"box-card"},[a("el-row",{attrs:{gutter:20}},[a("el-col",{attrs:{span:6}},[a("el-button",{attrs:{type:"primary"},on:{click:t.refresh}},[t._v("手动刷新热门文章列表")])],1)],1),a("el-table",{staticClass:"user-table",staticStyle:{width:"100%",height:"100%"},attrs:{data:t.articles,border:""},on:{"selection-change":t.handleSelectionChange}},[a("el-table-column",{attrs:{type:"index"}}),a("el-table-column",{attrs:{prop:"tittle",label:"文章标题",align:"center"}}),a("el-table-column",{attrs:{prop:"weights",label:"权重分(权重加使用)",align:"center"}})],1)],1)],1)},n=[],r={name:"AdminUser",data:function(){return{articles:[]}},created:function(){this.getArticles()},methods:{getArticles:function(){var t=this;this.$http.get("/admin/hot/articles").then((function(e){console.log(e),t.articles=e.data.data}))},refresh:function(){var t=this;this.$http.get("/admin/hot/refreshArticles").then((function(e){200==e.data.code?(t.$message({type:"info",message:"正在刷新请稍等...."}),setTimeout((function(){t.$message({type:"success",message:"刷新成功!"}),t.getArticles()}),2e3)):t.$message.error("数据错误!")}))}}},c=r,i=(a("c254"),a("2877")),l=Object(i["a"])(c,s,n,!1,null,"0eab6650",null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-660b1cb4.b7491590.js.map