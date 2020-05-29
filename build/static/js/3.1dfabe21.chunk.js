webpackJsonp([3],{563:function(e,t,a){"use strict";function r(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,a){function r(s,n){try{var o=t[s](n),i=o.value}catch(e){return void a(e)}if(!o.done)return Promise.resolve(i).then(function(e){r("next",e)},function(e){r("throw",e)});e(i)}return r("next")})}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=a(36),l=a.n(i),c=a(0),m=a.n(c),d=a(32),u=(a.n(d),a(26)),h=a(19),f=a(37),p=function(){function e(e,t){for(var a=0;a<t.length;a++){var r=t[a];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,a,r){return a&&e(t.prototype,a),r&&e(t,r),t}}(),v=Object(c.lazy)(function(){return a.e(13).then(a.bind(null,579))}),E=function(e){function t(e){var a=this;s(this,t);var o=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return o.onFormChange=function(e,t){var a=Object.assign({},o.state.formValues);a[e]=t.target.value;var r=o.validateField(e,t.target.value);o.setState({formValues:a,formErrors:r})},o.setRef=function(e){o.success=e},o.initValidation=function(){o.validationSettings={name:[o.requiredCheck,o.minlengthCheck.bind(o,2)],email:[o.requiredCheck,o.emailCheck],password:[o.requiredCheck,o.minlengthCheck.bind(o,6)],confirmPassword:[o.requiredCheck,o.minlengthCheck.bind(o,6),o.confirmPasswordMatch],address1:[o.requiredCheck,o.minlengthCheck.bind(o,2)],zip:[o.requiredCheck,o.minlengthCheck.bind(o,5)],state:[o.requiredCheck,o.minlengthCheck.bind(o,2)],city:[o.requiredCheck,o.minlengthCheck.bind(o,2)],phone:[o.requiredCheck,o.minlengthCheck.bind(o,9),o.checkPhone]}},o.checkPhone=function(e){var t=/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;return!e.match(t)&&"Not a valid Phone Number"},o.validateField=function(e,t){var a=!1;if(void 0!==o.validationSettings[e])for(var r=0;r<o.validationSettings[e].length;r++){var s=o.validationSettings[e][r];a=a||s.call(o,t)}var n={};return n[e]=a,n},o.validateAllFields=r(l.a.mark(function e(){var t,r,s,n,i,c;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:t=o.props.emailUnq,r=o.state.emailReady,s=Object.assign({},o.state.formErrors),n=Object.assign({},o.state.formValues),i=!0;for(c in n)s[c]=o.validateField(c,n[c])[c],i=i&&!s[c];t||""!==n.email&&(s.email="This email already associated with an existing account"),o.setState({formErrors:s}),i&&r?o.props.confirmComplete(o.state.formValues):o.props.updateAccount(o.state.formValues);case 9:case"end":return e.stop()}},e,a)})),o.requiredCheck=function(e){return!e&&"This field is required"},o.minlengthCheck=function(e,t){return(!t||t.length<e)&&"It should be at least "+e+" characters long"},o.emailCheck=function(e){return!/^\w+@\w+\.\w{2,3}$/.test(e)&&"This is not a valid email"},o.state={formErrors:{},formValues:{name:"",email:"",password:"",confirmPassword:"",phone:"",address1:"",address2:"",zip:"",state:"",city:""},emailReady:!1,selected:!1,address:"",formatted_address:""},o.checkEmailAvail=o.checkEmailAvail.bind(o),o.checkEmailError=o.checkEmailError.bind(o),o.onSelectAddress=o.onSelectAddress.bind(o),o}return o(t,e),p(t,[{key:"componentDidMount",value:function(){this.initValidation();var e=this.props,t=e.user,a=void 0===t?"":t,r=e.prefill,s=void 0!==r&&r,n=a.name,o=void 0===n?"":n,i=a.email,l=void 0===i?"":i,c=a.password,m=void 0===c?"":c,d=a.city,u=void 0===d?"":d,h=a.state,f=void 0===h?"":h,p=a.zip,v=void 0===p?"":p,E=a.address1,g=void 0===E?"":E,b=a.address2,y=void 0===b?"":b;if(s){var k={name:o,email:l,password:m,confirmPassword:m,city:u,state:f,zip:v,address1:g,address2:y};this.setState({formValues:k,selected:!0})}}},{key:"componentDidUpdate",value:function(e,t){this.props.emailUnq!==e.emailUnq&&this.checkEmailError()}},{key:"onSelectAddress",value:function(e){var t=e.split(","),a=t[2].slice(-5),r=t[2].slice(1,3),s={address1:t[0],address2:"",zip:a,state:r,city:t[1],password:this.state.formValues.password,confirmPassword:this.state.formValues.confirmPassword,name:this.state.formValues.name,email:this.state.formValues.email};this.setState({selected:!0,formValues:s,address:t[0]})}},{key:"confirmPasswordMatch",value:function(){var e=this;return this.checkEmailAvail(),this.setState({checking:!0},function(){var t=e.state.formValues;return t.password!==t.confirmPassword&&"Passwords must match exactly"})}},{key:"checkEmailAvail",value:function(){function e(){return t.apply(this,arguments)}var t=r(l.a.mark(function e(){var t,a;return l.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t=this.state.formValues,a=t.email,Object(f.isUndefined)(a)){e.next=5;break}return e.next=5,this.props.confirmUniqueUser(a);case 5:case"end":return e.stop()}},e,this)}));return e}()},{key:"checkEmailError",value:function(){this.props.emailUnq?this.setState({emailReady:!0}):this.setState({formErrors:{email:"This email already associated with an existing account"}})}},{key:"render",value:function(){var e=this.state.selected,t=this.props.prefill;return m.a.createElement("section",{className:"register-form page-section-ptb"},m.a.createElement("div",{className:"container"},!t&&m.a.createElement("div",{className:"row justify-content-center"},m.a.createElement("div",{className:"col-md-10"},m.a.createElement("div",{className:"section-title"},m.a.createElement("span",null,"Welcome to "),m.a.createElement("h2",null,"Parts Detect"),m.a.createElement("div",{className:"separator"})))),m.a.createElement("div",{className:"row justify-content-center"},m.a.createElement("div",{className:"col-lg-8 col-md-12"},m.a.createElement("div",{className:"gray-form"},m.a.createElement(d.FormGroup,null,m.a.createElement("div",{className:"row"},m.a.createElement("div",{className:"form-group col-md-12"},m.a.createElement("label",null,"Name"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"text",className:"form-control",value:this.state.formValues.name,onChange:this.onFormChange.bind(this,"name"),valid:!this.state.formErrors.name,errorMessage:this.state.formErrors.name,onBlur:this.checkEmailAvail,placeholder:"Name",icon:"line-user"})))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Email (username) "),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"email",className:"form-control",value:this.state.formValues.email,onChange:this.onFormChange.bind(this,"email"),valid:!this.state.formErrors.email,errorMessage:this.state.formErrors.email,onBlur:this.checkEmailAvail,placeholder:"Email",icon:"ion-ios7-email"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Password "),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"password",value:this.state.formValues.password,onChange:this.onFormChange.bind(this,"password"),valid:!this.state.formErrors.password,errorMessage:this.state.formErrors.password,placeholder:"Password",icon:"lock2",className:"form-control"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Confirm Password"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"password",value:this.state.formValues.confirmPassword,onChange:this.onFormChange.bind(this,"confirmPassword"),valid:!this.state.formErrors.confirmPassword,errorMessage:this.state.formErrors.confirmPassword,placeholder:"Confirm Password",icon:"lock2",className:"form-control"})))),m.a.createElement(d.FormGroup,null,m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Address"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(v,{className:"form-control",selected:e,address1:this.state.formValues.address1,onSelectAddress:this.onSelectAddress}))),e&&m.a.createElement(m.a.Fragment,null,m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Address Line 1"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"text",value:this.state.formValues.address1,onChange:this.onFormChange.bind(this,"address1"),valid:!this.state.formErrors.address1,errorMessage:this.state.formErrors.address1,placeholder:"Address Line 1",icon:"home",className:"form-control"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Address Line 2"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"text",value:this.state.formValues.address2,onChange:this.onFormChange.bind(this,"address2"),valid:!this.state.formErrors.address2,errorMessage:this.state.formErrors.address2,placeholder:"Address Line 2",icon:"home",className:"form-control"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"City"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"text",className:"form-control",value:this.state.formValues.city,onChange:this.onFormChange.bind(this,"city"),valid:!this.state.formErrors.city,errorMessage:this.state.formErrors.city,placeholder:"City",icon:"office"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"State"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"text",className:"form-control",value:this.state.formValues.state,onChange:this.onFormChange.bind(this,"state"),valid:!this.state.formErrors.state,errorMessage:this.state.formErrors.state,placeholder:"State",icon:"earth"}))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"State"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"number",className:"form-control",value:this.state.formValues.zip,onChange:this.onFormChange.bind(this,"zip"),valid:!this.state.formErrors.zip,errorMessage:this.state.formErrors.zip,placeholder:"Zip",icon:"location"})))),m.a.createElement("div",{className:"form-group"},m.a.createElement("label",null,"Phone"),m.a.createElement("div",{className:"hybridInput-account"},m.a.createElement(d.Input,{type:"tel",placeholder:"Phone Number",iconUpload:"phone",className:"form-control",value:this.state.formValues.phone,onChange:this.onFormChange.bind(this,"phone"),valid:!this.state.formErrors.phone,errorMessage:this.state.formErrors.phone})))),!t&&m.a.createElement("div",{className:"form-group"},m.a.createElement("div",{className:"remember-checkbox"},m.a.createElement("input",{type:"checkbox",name:"one",id:"one"}),m.a.createElement("label",{htmlFor:"one"},"Accept our"," ",m.a.createElement("a",{href:"/#/tos"}," privacy policy")," ","and"," ",m.a.createElement("a",{href:"/#/customer-agreement"}," customer agreement")))),m.a.createElement(d.FormGroup,{className:"mbsc-btn-group-block"},m.a.createElement(d.Button,{onClick:this.validateAllFields,icon:"checkmark",style:{backgroundColor:"#f68b1e",color:"#FFF"}},t?"Update Account":"Register Account")),m.a.createElement("p",{className:"link"},"Already have an account? please",m.a.createElement("a",{href:"/#/login"}," login here ")))))))}}]),t}(c.Component),g=function(e){return{isLoggedIn:e.auth.isLoggedIn,loginError:e.auth.error,emailUnq:e.registration.emlUnique}},b=function(e){return{confirmUniqueUser:function(t){return e(Object(h.R)(t))},updateAccount:function(t){return e(Object(h._5)(t))}}},y=Object(u.b)(g,b)(E);t.default=y}});
//# sourceMappingURL=3.1dfabe21.chunk.js.map