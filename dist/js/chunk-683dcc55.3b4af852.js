(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-683dcc55"],{"188b":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("el-card",{staticClass:"box-card"},[r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:6}},[r("el-button",{attrs:{type:"primary"},on:{click:t.addUser}},[t._v("添加用户")])],1)],1),r("el-table",{staticClass:"user-table",staticStyle:{width:"100%",height:"100%"},attrs:{data:t.users,border:""},on:{"selection-change":t.handleSelectionChange}},[r("el-table-column",{attrs:{type:"selection"}}),r("el-table-column",{attrs:{type:"index"}}),r("el-table-column",{attrs:{prop:"createTime",label:"创建日期",align:"center"}}),r("el-table-column",{attrs:{prop:"username",label:"用户名",align:"center"}}),r("el-table-column",{attrs:{label:"角色",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[1==e.row.rid?r("el-tag",{attrs:{type:"success"}},[t._v("超级管理员")]):t._e(),2==e.row.rid?r("el-tag",[t._v("普通用户")]):t._e()]}}])}),r("el-table-column",{attrs:{label:"状态",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-switch",{on:{change:function(r){return t.changeState(e.row.id,e.row.status)}},model:{value:1==e.row.status,callback:function(r){t.$set(e.row,"status == 1",r)},expression:"scope.row.status == 1"}})]}}])}),r("el-table-column",{attrs:{label:"操作",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"修改用户",placement:"top-start"}},[r("el-button",{attrs:{type:"primary",size:"small",icon:"el-icon-edit"}})],1),r("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"编辑角色",placement:"top-start"}},[r("el-button",{attrs:{type:"success",size:"small",icon:"el-icon-setting"},on:{click:function(r){return t.editRoles(e.row)}}})],1),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"删除用户",placement:"top-start"}},[r("el-button",{attrs:{type:"danger",size:"small",icon:"el-icon-delete"},on:{click:function(r){return t.deleteUser(e.row.id)}}})],1)]}}])})],1)],1),r("el-dialog",{attrs:{title:"添加用户",visible:t.dialogVisible,width:"30%"},on:{"update:visible":function(e){t.dialogVisible=e},close:t.dialogClose}},[r("el-form",{ref:"form",attrs:{model:t.form,"label-width":"80px",rules:t.rules}},[r("el-form-item",{attrs:{label:"用户名",prop:"username"}},[r("el-input",{attrs:{"prefix-icon":"el-icon-user"},model:{value:t.form.username,callback:function(e){t.$set(t.form,"username",e)},expression:"form.username"}})],1),r("el-form-item",{attrs:{label:"密码",prop:"password"}},[r("el-input",{attrs:{"prefix-icon":"el-icon-lock",type:"password"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),r("el-form-item",{attrs:{prop:"rid",label:"角色"}},[r("el-select",{attrs:{placeholder:"请选择"},model:{value:t.form.rid,callback:function(e){t.$set(t.form,"rid",e)},expression:"form.rid"}},t._l(t.roles,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.dialogVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v("立即创建")])],1)],1),r("el-dialog",{attrs:{title:"分配角色",visible:t.roleDialogVisible,width:"30%","before-close":t.roleDioClose},on:{"update:visible":function(e){t.roleDialogVisible=e}}},[r("div",[r("p",[t._v("当前用户: "+t._s(t.currentUser.username))]),r("p",[t._v("当前角色: "+t._s(1==t.currentUser.rid?"超级管理员":"普通用户"))]),t._v(" 分配新角色: "),r("el-select",{attrs:{placeholder:"请选择"},model:{value:t.selectedId,callback:function(e){t.selectedId=e},expression:"selectedId"}},t._l(t.roles,(function(t){return r("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})})),1)],1),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{on:{click:function(e){t.roleDialogVisible=!1}}},[t._v("取 消")]),r("el-button",{attrs:{type:"primary"},on:{click:t.updateRole}},[t._v("确 定")])],1)])],1)},o=[],i=(r("96cf"),r("1da1")),a={name:"AdminUser",data:function(){return{users:[],dialogVisible:!1,roleDialogVisible:!1,query:"",form:{username:"",password:"",rid:""},rules:{username:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:5,max:13,message:"长度在 5 到 13 个字符",trigger:"blur"}],password:[{required:!0,message:"请输入密码",trigger:"blur"},{min:5,max:13,message:"长度在 5 到 13 个字符",trigger:"blur"}]},currentUser:{},roles:[],selectedId:""}},created:function(){this.getUsers()},methods:{handleSelectionChange:function(t){this.multipleSelection=t},getUsers:function(){var t=this;this.$http.get("/admin/adminUser/list",{params:this.query}).then((function(e){console.log(e),t.users=e.data.data}))},changeState:function(t,e){var r=this;this.$http.put("/admin/adminUser/changeStatus/"+t+"/"+e).then((function(t){r.$message.success("更新状态成功!"),r.getUsers()}))},onSubmit:function(){var t=this;this.$refs["form"].validate(function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:r&&t.$http.post("/admin/adminUser/addUser",t.form).then((function(e){console.log(e);var r=e.data;200==r.code?(t.dialogVisible=!1,t.$message({message:"添加成功",type:"success"}),t.getUsers()):t.$message.error("数据错误")}));case 1:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},deleteUser:function(t){var e=this;this.$confirm("此操作将永久删除该用户, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then((function(){e.$http.delete("/admin/adminUser/deleteUser/"+t).then((function(t){e.$message.success("删除成功!"),e.getUsers()}))})).catch((function(){e.$message({type:"info",message:"已取消删除"})}))},dialogClose:function(){this.$refs["form"].resetFields()},editRoles:function(t){var e=this;this.roleDialogVisible=!0,this.currentUser=t,this.$http.get("/admin/adminUser/roles").then((function(t){console.log(t),e.roles=t.data.data,console.log(e.roles)}))},roleDioClose:function(){},updateRole:function(){var t=this;this.selectedId?(this.$http.put("/admin/adminUser/changeRole/"+this.currentUser.id+"/"+this.selectedId).then((function(e){t.$message({message:"修改角色成功!",type:"success"})})),this.roleDialogVisible=!1,location.reload()):this.$message({message:"请选择角色!",type:"warning"})},addUser:function(){var t=this;this.dialogVisible=!0,this.$http.get("/admin/adminUser/roles").then((function(e){t.roles=e.data.data,console.log(t.roles)}))}}},s=a,l=(r("66d3"),r("2877")),c=Object(l["a"])(s,n,o,!1,null,"1e6935ae",null);e["default"]=c.exports},"1da1":function(t,e,r){"use strict";r.d(e,"a",(function(){return o}));r("d3b7");function n(t,e,r,n,o,i,a){try{var s=t[i](a),l=s.value}catch(c){return void r(c)}s.done?e(l):Promise.resolve(l).then(n,o)}function o(t){return function(){var e=this,r=arguments;return new Promise((function(o,i){var a=t.apply(e,r);function s(t){n(a,o,i,s,l,"next",t)}function l(t){n(a,o,i,s,l,"throw",t)}s(void 0)}))}}},"38c5":function(t,e,r){},"66d3":function(t,e,r){"use strict";var n=r("38c5"),o=r.n(n);o.a},"96cf":function(t,e,r){var n=function(t){"use strict";var e,r=Object.prototype,n=r.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",s=o.toStringTag||"@@toStringTag";function l(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{l({},"")}catch(V){l=function(t,e,r){return t[e]=r}}function c(t,e,r,n){var o=e&&e.prototype instanceof g?e:g,i=Object.create(o.prototype),a=new O(n||[]);return i._invoke=U(t,r,a),i}function u(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(V){return{type:"throw",arg:V}}}t.wrap=c;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",m={};function g(){}function v(){}function y(){}var b={};b[i]=function(){return this};var w=Object.getPrototypeOf,x=w&&w(w(j([])));x&&x!==r&&n.call(x,i)&&(b=x);var _=y.prototype=g.prototype=Object.create(b);function k(t){["next","throw","return"].forEach((function(e){l(t,e,(function(t){return this._invoke(e,t)}))}))}function L(t,e){function r(o,i,a,s){var l=u(t[o],t,i);if("throw"!==l.type){var c=l.arg,f=c.value;return f&&"object"===typeof f&&n.call(f,"__await")?e.resolve(f.__await).then((function(t){r("next",t,a,s)}),(function(t){r("throw",t,a,s)})):e.resolve(f).then((function(t){c.value=t,a(c)}),(function(t){return r("throw",t,a,s)}))}s(l.arg)}var o;function i(t,n){function i(){return new e((function(e,o){r(t,n,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function U(t,e,r){var n=f;return function(o,i){if(n===d)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return C()}r.method=o,r.arg=i;while(1){var a=r.delegate;if(a){var s=E(a,r);if(s){if(s===m)continue;return s}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(n===f)throw n=p,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n=d;var l=u(t,e,r);if("normal"===l.type){if(n=r.done?p:h,l.arg===m)continue;return{value:l.arg,done:r.done}}"throw"===l.type&&(n=p,r.method="throw",r.arg=l.arg)}}}function E(t,r){var n=t.iterator[r.method];if(n===e){if(r.delegate=null,"throw"===r.method){if(t.iterator["return"]&&(r.method="return",r.arg=e,E(t,r),"throw"===r.method))return m;r.method="throw",r.arg=new TypeError("The iterator does not provide a 'throw' method")}return m}var o=u(n,t.iterator,r.arg);if("throw"===o.type)return r.method="throw",r.arg=o.arg,r.delegate=null,m;var i=o.arg;return i?i.done?(r[t.resultName]=i.value,r.next=t.nextLoc,"return"!==r.method&&(r.method="next",r.arg=e),r.delegate=null,m):i:(r.method="throw",r.arg=new TypeError("iterator result is not an object"),r.delegate=null,m)}function $(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function S(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function O(t){this.tryEntries=[{tryLoc:"root"}],t.forEach($,this),this.reset(!0)}function j(t){if(t){var r=t[i];if(r)return r.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function r(){while(++o<t.length)if(n.call(t,o))return r.value=t[o],r.done=!1,r;return r.value=e,r.done=!0,r};return a.next=a}}return{next:C}}function C(){return{value:e,done:!0}}return v.prototype=_.constructor=y,y.constructor=v,v.displayName=l(y,s,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,y):(t.__proto__=y,l(t,s,"GeneratorFunction")),t.prototype=Object.create(_),t},t.awrap=function(t){return{__await:t}},k(L.prototype),L.prototype[a]=function(){return this},t.AsyncIterator=L,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new L(c(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},k(_),l(_,s,"Generator"),_[i]=function(){return this},_.toString=function(){return"[object Generator]"},t.keys=function(t){var e=[];for(var r in t)e.push(r);return e.reverse(),function r(){while(e.length){var n=e.pop();if(n in t)return r.value=n,r.done=!1,r}return r.done=!0,r}},t.values=j,O.prototype={constructor:O,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(S),!t)for(var r in this)"t"===r.charAt(0)&&n.call(this,r)&&!isNaN(+r.slice(1))&&(this[r]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var r=this;function o(n,o){return s.type="throw",s.arg=t,r.next=n,o&&(r.method="next",r.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],s=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var l=n.call(a,"catchLoc"),c=n.call(a,"finallyLoc");if(l&&c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(l){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!c)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var r=this.tryEntries.length-1;r>=0;--r){var o=this.tryEntries[r];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,m):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),m},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.finallyLoc===t)return this.complete(r.completion,r.afterLoc),S(r),m}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var r=this.tryEntries[e];if(r.tryLoc===t){var n=r.completion;if("throw"===n.type){var o=n.arg;S(r)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,r,n){return this.delegate={iterator:j(t),resultName:r,nextLoc:n},"next"===this.method&&(this.arg=e),m}},t}(t.exports);try{regeneratorRuntime=n}catch(o){Function("r","regeneratorRuntime = r")(n)}}}]);
//# sourceMappingURL=chunk-683dcc55.3b4af852.js.map