(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2086b7"],{a55b:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"container"},[s("div",{staticClass:"d-flex justify-content-center"},[s("form",{staticStyle:{width:"500px"},on:{submit:function(t){return t.preventDefault(),e.signin(t)}}},[s("h2",[e._v("登入頁面")]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"exampleInputEmail1"}},[e._v("Email address")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.email,expression:"user.email"}],staticClass:"form-control",attrs:{type:"email",id:"exampleInputEmail1","aria-describedby":"emailHelp",placeholder:"Enter email"},domProps:{value:e.user.email},on:{input:function(t){t.target.composing||e.$set(e.user,"email",t.target.value)}}})]),s("div",{staticClass:"form-group"},[s("label",{attrs:{for:"exampleInputPassword1"}},[e._v("Password")]),s("input",{directives:[{name:"model",rawName:"v-model",value:e.user.password,expression:"user.password"}],staticClass:"form-control",attrs:{type:"password",id:"exampleInputPassword1",placeholder:"Password"},domProps:{value:e.user.password},on:{input:function(t){t.target.composing||e.$set(e.user,"password",t.target.value)}}})]),s("button",{staticClass:"btn btn-success",attrs:{type:"submit"}},[e._v("登入")])])])])},o=[],r=(s("99af"),{data:function(){return{user:{email:"",password:""},token:""}},methods:{signin:function(){var e=this,t="".concat("https://course-ec-api.hexschool.io","/api/auth/login");this.$http.post(t,this.user).then((function(t){console.log(t);var s=t.data.expired,a=t.data.token;document.cookie="hextoken=".concat(a,";expires=").concat(new Date(1e3*s),";"),e.$router.push("/admin/products")})).catch((function(e){console.log(e)}))}}}),n=r,i=s("2877"),l=Object(i["a"])(n,a,o,!1,null,null,null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d2086b7.4609065c.js.map