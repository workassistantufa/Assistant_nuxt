(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{241:function(t,e,r){var content=r(250);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,r(61).default)("12715f2f",content,!0,{sourceMap:!1})},249:function(t,e,r){"use strict";r(241)},250:function(t,e,r){var o=r(60)(!1);o.push([t.i,".grid-container{display:grid;grid-template-columns:1fr 5fr;grid-row-gap:10px}.grid-item{box-sizing:border-box;text-align:center;font-size:1.1em;padding:1.5em;color:#fff}",""]),t.exports=o},267:function(t,e,r){"use strict";r.r(e);var o=r(7),n=(r(49),{middleware:function(t){t.store;var e=t.redirect,r=localStorage.getItem("UsertAuthID");if(console.log("UsertAuthID=",r),!r)return e("/auth")},data:function(){return{formData:{}}},asyncData:function(t){return Object(o.a)(regeneratorRuntime.mark((function e(){var r,o,n,data,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.app,o=t.params,n={params:{module:"dictionary",form:"Client",id:o.id}},e.next=4,r.$axios.$get("api",n);case 4:return data=e.sent,console.log("data=",data),l={id:data._id._Value,Name:data._Name._Value,Description:data._Description._Value},e.abrupt("return",{formData:l});case 8:case"end":return e.stop()}}),e)})))()},methods:{saveFormData:function(){console.log("this.data.formData.Name=",this.$data.formData);var t={module:"dictionary",form:"Client",data:{id:this.$data.formData.id,Name:this.$data.formData.Name,Description:this.$data.formData.Description}};console.log("formData=",t),this.$axios.$post("api",t)}}}),l=(r(249),r(38)),component=Object(l.a)(n,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("h1",[t._v("Клиенты")]),t._v(" "),t._m(0),t._v(" "),r("nuxt-link",{attrs:{to:"/dictionary/Client"}},[r("button",[t._v("Выход")])]),t._v(" "),r("button",{on:{click:t.saveFormData}},[t._v("Сохранить")]),t._v(" "),t._m(1),t._v(" "),r("div",{staticClass:"grid-container"},[r("label",[t._v("Наименование")]),t._v(" "),r("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.Name,expression:"formData.Name"}],attrs:{type:"text",placeholder:"Введите наименование"},domProps:{value:t.formData.Name},on:{input:function(e){e.target.composing||t.$set(t.formData,"Name",e.target.value)}}}),t._v(" "),r("label",[t._v("Описание")]),t._v(" "),r("textarea",{directives:[{name:"model",rawName:"v-model",value:t.formData.Description,expression:"formData.Description"}],domProps:{value:t.formData.Description},on:{input:function(e){e.target.composing||t.$set(t.formData,"Description",e.target.value)}}})])],1)}),[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("label",[t._v("----------")])])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("label",[t._v("----------")])])}],!1,null,null,null);e.default=component.exports}}]);