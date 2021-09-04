(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{12:function(e,t,n){},57:function(e,t,n){"use strict";n.r(t);var a=n(1),o=n.n(a),s=n(27),c=n.n(s),r=(n(12),n(6)),i=n(2),l=n(3),d="https://buzzerapp.us",u=n(0),b=n(4).default,j=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],o=(t[1],Object(a.useState)("")),s=Object(l.a)(o,2),c=s[0],j=(s[1],Object(a.useState)("")),m=Object(l.a)(j,2),z=m[0],A=m[1],g=Object(a.useState)(""),p=Object(l.a)(g,2),O=p[0],f=p[1],h=Object(a.useState)(""),w=Object(l.a)(h,2),x=w[0],Q=w[1],N=Object(a.useState)(""),B=Object(l.a)(N,2),v=B[0],C=B[1],E=Object(a.useState)(""),D=Object(l.a)(E,2),S=D[0],I=D[1],k=Object(i.f)();return Object(u.jsx)("div",{className:"signup-form",children:Object(u.jsxs)("form",{method:"POST",onSubmit:function(e){if(e.preventDefault(),n||c||z||O||x||v||S)console.log("cannot submit with errors");else{var t={username:document.getElementById("usernameInput").value,password:document.getElementById("passwordInput").value,firstName:document.getElementById("firstNameInput").value,lastName:document.getElementById("lastNameInput").value,bio:document.getElementById("bioInput").value,pfp_id:1,email:document.getElementById("emailInput").value,gender:document.getElementById("genderInput").value,birthdate:Date.parse(document.getElementById("birthdateInput").value)/1e3};b.post(d+"/api/signup",t).then((function(e){0==e.data.status_code&&(window.token=e.data.token,k.push("/"))})).catch((function(e){console.log(e)}))}},children:[Object(u.jsx)("input",{id:"firstNameInput",className:"login-form-text-input",type:"text",name:"firstName",placeholder:"First Name",maxLength:"20",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"firstNameErrorMsg",className:"form-error-message",children:n})}),Object(u.jsx)("input",{id:"lastNameInput",className:"login-form-text-input",type:"text",name:"lastName",placeholder:"Last Name",maxLength:"20",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"lastNameErrorMsg",className:"form-error-message",children:c})}),Object(u.jsx)("input",{id:"emailInput",onChange:function(e){var t;""!==e.target.value?(t=e.target.value,/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(t).toLowerCase())?A(""):A("Please enter a valid email")):A("")},className:"login-form-text-input",type:"text",name:"email",placeholder:"Email",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"emailErrorMsg",className:"form-error-message",children:z})}),Object(u.jsx)("input",{id:"usernameInput",onChange:function(e){""!==e.target.value?e.target.value.length<4?f("Username not long enough"):-1!==e.target.value.search(/^[a-zA-Z0-9-_]+$/)?f(""):f("Letters, numbers, and _ only"):f("")},className:"login-form-text-input",type:"text",name:"username",placeholder:"Username",maxLength:"20",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"usernameErrorMsg",className:"form-error-message",children:O})}),Object(u.jsx)("input",{id:"passwordInput",onChange:function(e){e.target.value.length<8&&""!==e.target.value?Q("Password must be 8 characters"):Q("")},className:"login-form-text-input",type:"password",name:"password",placeholder:"Password",maxLength:"20",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"passwordErrorMsg",className:"form-error-message",children:x})}),Object(u.jsx)("input",{id:"confirmPasswordInput",onChange:function(e){e.target.value!==document.getElementById("passwordInput").value&&""!==e.target.value?C("Passwords do not match"):C("")},className:"login-form-text-input",type:"password",name:"confirm-password",placeholder:"Re enter password",maxLength:"20",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"confirmPasswordErrorMsg",className:"form-error-message",children:v})}),Object(u.jsx)("textarea",{id:"bioInput",className:"bio-input",name:"bio",placeholder:"Bio",rows:"8",maxLength:"240"}),Object(u.jsxs)("select",{id:"genderInput",className:"login-form-text-input gender-dropdown",name:"gender",required:!0,children:[Object(u.jsx)("option",{value:"",disabled:!0,children:"Gender"}),Object(u.jsx)("option",{value:"M",children:"Male"}),Object(u.jsx)("option",{value:"F",children:"Female"}),Object(u.jsx)("option",{value:"O",children:"Other"}),Object(u.jsx)("option",{value:"N/A",children:"Choose not to say"})]}),Object(u.jsx)("p",{className:"signup-label",children:"Birthdate"}),Object(u.jsx)("input",{id:"birthdateInput",onChange:function(e){return Date.now()-Date.parse(e.target.value)>410240376e3?void I(""):void I("Must be 13+")},className:"login-form-text-input",type:"date",name:"birthdate",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"dateErrorMsg",className:"form-error-message",children:S})}),Object(u.jsx)("input",{className:"signup-btn",type:"submit",value:"Sign Up"}),Object(u.jsx)("div",{className:"login-link-container",children:Object(u.jsx)(r.b,{className:"signup-link",to:"/login",children:"Log In"})})]})})},m=function(){return Object(u.jsx)(j,{})},z=n(4),A=n.n(z),g=function(){var e=Object(a.useState)(""),t=Object(l.a)(e,2),n=t[0],o=t[1],s=Object(a.useState)(""),c=Object(l.a)(s,2),b=c[0],j=(c[1],Object(i.f)());return Object(u.jsxs)("div",{className:"login-form",children:[Object(u.jsxs)("form",{method:"POST",onSubmit:function(e){e.preventDefault();var t={username:document.getElementById("username").value,password:document.getElementById("password").value};A.a.post(d+"/api/login",t).then((function(e){0==e.data.status_code?(window.token=e.data.token,j.push("/")):o("Username or Password incorrect")})).catch((function(e){console.log(e)}))},children:[Object(u.jsx)("input",{id:"username",className:"login-form-text-input",type:"text",name:"username",placeholder:"Username",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"usernameErrorMsg",className:"form-error-message",children:n})}),Object(u.jsx)("input",{id:"password",className:"login-form-text-input",type:"password",name:"password",placeholder:"Password",required:!0}),Object(u.jsx)("div",{children:Object(u.jsx)("p",{id:"passwordErrorMsg",className:"form-error-message",children:b})}),Object(u.jsx)("br",{}),Object(u.jsx)("input",{className:"login-btn",type:"submit",value:"Login"})]}),Object(u.jsx)("div",{className:"signup-link-container",children:Object(u.jsx)(r.b,{className:"signup-link",to:"/signup",children:"Sign Up"})})]})},p=function(){return Object(u.jsx)(g,{})},O=function(){return Object(u.jsxs)("div",{className:"sidebar",children:[Object(u.jsx)("div",{className:"sidebar-option",children:Object(u.jsx)(r.b,{className:"sidebar-option-link",to:"/",children:Object(u.jsx)("h1",{children:"Home"})})}),Object(u.jsx)("div",{className:"sidebar-option",children:Object(u.jsx)(r.b,{className:"sidebar-option-link",to:"/search",children:Object(u.jsx)("h1",{children:"Search"})})}),Object(u.jsx)("div",{className:"sidebar-option",children:Object(u.jsx)(r.b,{className:"sidebar-option-link",to:"/profile",children:Object(u.jsx)("h1",{children:"Profile"})})}),Object(u.jsx)("div",{className:"sidebar-option",children:Object(u.jsx)(r.b,{className:"sidebar-option-link",to:"/login",onClick:function(){window.token=""},children:Object(u.jsx)("h1",{children:"Log Out"})})})]})},f="data:image/png;base64,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",h=function(e){var t=e.buzzId,n=e.author,o=e.content,s=(e.timestamp,e.liked),c=e.rebuzzed,i=e.numLikes,b=e.numRebuzzes,j=e.rebuzzedBy,m=Object(a.useState)(s),z=Object(l.a)(m,2),g=z[0],p=z[1],O=Object(a.useState)(c),h=Object(l.a)(O,2),w=h[0],x=h[1],Q=Object(a.useState)(i),N=Object(l.a)(Q,2),B=N[0],v=N[1],C=Object(a.useState)(b),E=Object(l.a)(C,2),D=E[0],S=E[1],I=Object(a.useState)(!0),k=Object(l.a)(I,2),y=k[0],L=k[1],X=Object(a.useState)(!0),F=Object(l.a)(X,2),P=F[0],V=F[1];Object(a.useEffect)((function(){y?L(!1):g?(v(B+1),A.a.post(d+"/api/likeBuzz",{token:window.token,buzz_id:t}).then((function(e){0!=e.data.status_code&&(L(!0),p(!g),v((function(e){return e-1})))})).catch((function(e){L(!0),p(!g),v((function(e){return e-1}))}))):(v((function(e){return e-1})),A.a.post(d+"/api/unlikeBuzz",{token:window.token,buzz_id:t}).then((function(e){0!=e.data.status_code&&(L(!0),p(!g),v((function(e){return e+1})))})).catch((function(e){L(!0),p(!g),v((function(e){return e+1}))})))}),[g]),Object(a.useEffect)((function(){P?V(!1):w?(S(D+1),A.a.post(d+"/api/rebuzzBuzz",{token:window.token,buzz_id:t}).then((function(e){0!=e.data.status_code&&(V(!0),x(!w),S((function(e){return e-1})))})).catch((function(e){V(!0),x(!w),S((function(e){return e-1}))}))):(S((function(e){return e-1})),A.a.post(d+"/api/unrebuzzBuzz",{token:window.token,buzz_id:t}).then((function(e){0!=e.data.status_code&&(V(!0),x(!w),S((function(e){return e+1})))})).catch((function(e){V(!0),x(!w),S((function(e){return e+1}))})))}),[w]);return Object(u.jsxs)("div",{className:"buzz-card",children:[Object(u.jsx)("div",{className:"buzz-card-pfp",children:Object(u.jsx)("img",{src:f})}),Object(u.jsxs)("div",{className:"buzz-card-author",children:[Object(u.jsx)(r.b,{to:"/user/"+n,children:"@"+n}),Object(u.jsxs)("p",{children:[j?"ReBuzzed by: ":"",Object(u.jsx)(r.b,{to:"/user/"+j,children:j?"@"+j:""})]})]}),Object(u.jsx)("div",{className:"buzz-card-content",children:o}),Object(u.jsx)("div",{className:"buzz-card-reactions",children:Object(u.jsxs)("div",{className:"buzz-card-reactions-middle",children:[Object(u.jsx)("img",{onClick:function(){p(!g)},className:"reaction-icon",src:g?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAJZElEQVR4Xt1bW4wbVxn+/rGzsLt2SrqhUIgSSgKtqioUNvZm20RYtpM0gYqLVNHAW3mpaGmfWgECRFVERXlBoRGqQDzRQrU8cEuXbmxnITSL99JCgahRiUhKkZq0tMna62121/OjM/bYM54Zn3Nm7C3CD6uV579+/+2cM8cEzc/lzPgOI2YeIOJb2cQNBN7GREkwTAJfZsIrbNJfYwadIjaODZVm/q2pwkVey46/n6n+ybqJcSLsJGALAxtBMIixyMDLZOBFZv5jnc1n3lVaOKujj1SIOZOJL8WWPsdM9xBhXIVH0DDABD5BZBwZKpR/TdZX8g8DVMulP8Uw72MYGQKU7GzqPEWEo8Obtj1FExN1mTap4GoudRsYR0D0IZmwbs9NxlyccP9QcXamG91iNnULQN83CKko+gCcAdN9iVJ5qpucQAD49tGhpRodAYwvBgoQ8STrjw9JI/7OR8xcB4xHEubgQzQ9veZkEllWjdUeAuMrRDA8AjV12fzM9KPEsnE/zcws+/nhC0Bl/y3XoL46SaCP+RoCXgHRgHKEOjAyQZPJ2PIdNPXCkpBxMZNJDMZqvyDggL/jypoaRdbhlQnM08DqoeTk8691SvIAIJyn+tofAFzvImYwExOpl6OPLwybnxkzifhb+wRRtf6OAoF2u/Uxg0haokHQMNq6mjRneGB1bycILgUi7as146Qz8i1BQZmuERyL1CXHPNZgNz7RSllheEfphC4HT+ZhPlkf2kvT02/ZMl0AVHO7fuyq+aYAHzR13e5MplYmdDwAkydybRLdIFhtyC2PgceTxdm7PQBY3R406YpEhHTXQUgALD5B5RU1AF5+3pcozhUaOkVWijlvLJ32HXW6qKt6bst1yvfT1Sv9Lj304vDI1pvEOsECoJpLfQGgn7Zs52gNSB2DZnoGOBk18p12OOUx6HCyWP65BUAll5rxdGFPw1J1S4NOFn2vB1rrjm6WENOzw6XyHhJr+1is/lI7+s452qv8CzLFuVjq0KULjlNFN7NbjR0cj2E7VXKpLxHoaPhWqxFxX9Jga6OWgIyfgLupmk8/CcZhy7Z+B1wVK3vLFHoZ5FDUrbGaeIIqufTzBNzcYPnfQIBhit2uKlxSOp8xaNU5g5+jajb9OggjUin/jwSM16iSTV8hgvrGpt9A9CsJfeQy44oEgH5ZY6MoafUht8CqMWLGiiiBKgjDvlNgXfxvzyXLBtH4dPWq0nvouEKLufQ5A9jmvw5QxTICncOoqM1PNva8yPI5kQEFEHKBU0AVXV0MOuX2So+SnCaRSQWq5nZ9FzAedE1BJSG6HnfQOyPf462HNBNaus1HqZpL5QE63s0dqUBNLBry7ILXZO4lucF54kzmnVWj9h8iDDmzwON0r7Kis/G7Gl+QEu8BqxSHLqIE+syoJcyhESsQi7mxpw3wQY9Qz/6ky2mN1CLRgrz82jvvHgVCHMxuLJYPNbfDY3cS+Ge2D8S8zESDjcWxj9O6RrB41dF8LRJwgq57+KRUlt6x19rqMvjOZHHuqcaJ0B03DlTfSJwn4L2B4zBwUxGAhnDa9kq2qWktBTQzTBoITwpbJjHwauLq6jaaOL3SMq2SHXuYiL/eXqMJZp9zOo3VmfsERtE5qVPuWlPKBM8AooeTxfI3XW24lhnbUjf4bHtf4Gg8mkZ5VnK+/P7RCSw7hR7TlcTOMsZKzKTtQ9PlVzxzaCmXeoxB9wROA43oOzPJ97S3S31q+6oRIAIfHS7O3dvqd05llYMffTetxM8ClJRNBKmRGkb5yorK7xDqeLmzBJN3JKbnXvUFQHzp6gW6ja/5Qlza0TWcU65xydy3Sovp28lS+RtOwD39+Y386FUDbJwB6D3SKPebwHZKCbDAaDWt5AsrZF5/dWHhclcAxMNqNn0YhCf70ZCUI+psREHrEVkAHJjY7wE6WQIn9GI+fcxgHOqwQ6ay+3OlSEYfc51GmISnNxZmWy9gpRkgCJbzo1tNjv2dgUQjE6IdVMoj3wUdrVKwM76xDhNr/ngcNw1Ozf7TLzpd12iVbPpeIvzAlQW6UVSll9DJAfRPPmZ8OVmafSwoNbsCIFbwS7n0rwDc7j8Wu7Re2Tv+sMWkAKgNlmnid8kTs2LD01jW+nxkq3SItQFWNvyFgGu1z+pUnVRwqp2FknnXKhe+CBMfcc78UABYUyGfPsCMSZ3raqq+96xrOi5DWP8SDiYKs8/I7JBmgC2gmkt9B6Cvhq3FIEO6ypON9kDv+JFEce5rMufFc2UA+FswKifHfmsdnKimrMyCUHJ8mJxfmVQY3rz1NpVLkloACOJLe/Zsig2szBPhg1EzQcofAhwTOI96fdfG6YXXZdjbz5UzoFUK+1I3c52e7TxDVFXYs+xpjfvGOYOY9xTjWxPH5/6sbItOCTiFVvKpz8KkCftGpxVNa+z1ZixKs8M2xt7jW2OOPi+uvOg4r10CTuHVfPoBMB5tfRciZX2NVZTjAonwYKIw+z1d5yMBIJgr+fQPidG6c6ccuQBLQ/L/JFGcDb7PLEFFuwc45fHo6IbKptgvW5sm62EPz/AlKSI2Ock365+mhYXVMNGPnAGWu+Pjg0uD9UkQPm773xquVjq7c9r/rZD4NviipMs5u+6bd43tC9dvGwBCsThE2cBGyfd2uStlJG1Xvf6fWyUz23m4EQaESCXgVLiYGd1sxIzfA3Sj36hTrW/pyhD8EsjYmyiWL4RxuJOnZwAIweL3PSavnYRB13mNUwxvl4UCm/hXnOJ7B0unzvfC+Z70gE5DLmVHt8codhLga6P8tqBTLjNfYubdG0/Mn+mV830BQAit5sZ2grkEYER9txHsFjFqTDSeKJZf6KXzfQOgDYJ5nAnXRMoE5jdBRqYfzvcVACF8cf/oDbRmFInofWKxbr0hln7a61sQX+AY55NT83+TsoUkULEopOgG22Iu/WECFwFsUckE+76AeIMLUC5ZLJ+OZICEue8ACP1WY0SsRMDWrj2hvch5uY56VvdXoGGAWhcAhGHLmd0fMOPmcZN5h/d+UHslSIR/GGvGvsHpP50L45Auz7oB0CyHEWL8JujntwxzAbGBQ8mpUxd1HQlLv64ACCN5/87hSn1wwnsniUtXBozPjEyWF8M6E4Zv3QGwQLB+jF17HMBdltEmnhjeXL1LXFkJ40QUnrcFAAsE66XLmHWIMVwsP6D6y/Iozvrx/hdFjMs3KhUMaAAAAABJRU5ErkJggg==":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAACLlBMVEUAAAD/AAD/fwD/VVX/Pz//MzP/VSr/SCT/Pz//ODj/TDP/RS7pPz/rOjrsSDbuRDPwPDzxQzXyPzPySDDzRTnzQjf0PzX1RDr1Qjj1Pzb2RDP2QTn3Pzf3RTb3QzTwQTPwPzjxRDfxQzXxQTTyRjPyRDfyQjbzRTTzRDjzQjf0RTX1RDX1QDf2QzXxQTTyRDfzQzfzQjbzQTbzRDXzQzT0QTb0RDX0QzX0QjT0RDb1Qzb1QjbyRDTzQzTzQjfzQTbzRDXzQzXzQjT0Qzb0QjX0QTf0Qzb1Qzf1QjbyQzTzQjbzQjbzQzX0Qzb0RDX0Qzb0QjX0QzX0Qjb0QjbzQzXzQjbzQjbzQzXzQjXzQjbzQzXzQjXzQzX0Qzb0Qjb0QjX0QzX0QzX0Qjb0Qjb0QzXzQzbzQzXzQjbzQzXzQjXzQzXzQjbzQzX0Qzb0Qjb0QzX0Qjb0Qzb0QzX0QjX0QjbzQzXzQzbzQjXzQzXzQzbzQjbzQjb0Qjb0Qjb0QzX0QzX0QjX0Qjb0Qzb0QjX0QjbzQzbzQjbzQjXzQzXzQzbzQjbzQjbzQzXzQzXzQjbzQjbzQzX0Qzb0QzX0Qjb0Qzb0Qjb0QjX0QzX0QzbzQjbzQjXzQzXzQzXzQjbzQjbzQzXzQzXzQjXzQjbzQzb0QzX0QjX0Qjb0Qzb0Qjb0QjX0QzX0Qjb0QjX0QzX0QzXzQjbzQjbzQzXzQjbzQjbzQzbzQzXzQjXzQjbzQzb0QzbVGvo7AAAAuXRSTlMAAQIDBAUGBwgJCgsMDQ4PERMUFRYXGBobHB4fICEiIyQlJicoKSosLS4wNDc5OjxAQUJDREZHSElLT1BSV1hZWltcXmBhYmZnamtsbXV4eXt8fn+BgoOFhoeJiouMjY6PkJGSlJeYmpydnqCio6SmqaqrrK2xsrS1tre4u7y9vr/AwcPExcbHyMnKy8zNzs/Q1NXX2Nna29zd3t/g4eLj5OXm5+jp6uvs7e7w8fLz9PX3+Pn6+/z9/tJhKz0AAANdSURBVHgBpcGJX5MFAMfh39xgwFCSDcUrVJCcRmEidpJXKZkdlkgodkglWWJFwooQSKGE0YWoIFjCiDJzMJP3+9/1aa65m71vz6NY619qG/797nzAf3p/qRKUHjg9PDN/d3a4rb5MKTl29/OA0f20TVG2Z84bPHBxl11Jdo6S4FKVIh67RIKRHYpXcIpk9xockuQ4ukCyD/MVw+MnzH+4utzlLNn26gBhPpdU+BVhF1+pLnG6yqvf8BM26FaUZwTA+KxCUd5PDYB+l2sAwDi7WVGbPjcARtyKKPADjD2qONt/AejoALixTXGqxgEG83TfKYCeYiXwDBLxnVsJ3H0AHyhsJ0BfrpIsHSJssFBJnN8A1EiSYxS4WqwUSiYBJkuUgnsM+NkuaTdgVCmlrXMwt1UpPQ5QJ2kAOKs09sCLSqMduCCtB9iodE6eVDqbAGOd6gG/0srJUVo/AAfUBrwmSw4DZ/Q98IQsqQH8mgU2yJJyYEYhoECWuIB5hYClsqQQCOkO4JEly4Hbug5UyJJKYFxfA3WyZBfQpSbgmCw5ATSpBvhRllwGtisvCJTLggogmCf5gDdlwVuAT1IdEHDKNGcAeE5S7hSwR6btA6ZyJakBuOyQSfYR4Ij+tSoE7JVJLwChVQprAa7lyZSCCaBF97lvA6/LlCPAnRWKaACCq2XCw3NAg/5TNA10KHu2LmC6SFHPA+xV1vYD1ClGJ/DHSmVpzS2gU7FW/wX02pUVxwUguE5xDgI0KCtNAAcVz3YOWNihLDxpAF/alMB9Ewis1KJKfwMCK5Sk1gB67VqEow8wapVCI8A7WkQLQKNSWeIDqFdGLwN02ZXSQ9eAe08pg9q/gevFSmNLELhVqbQ2/wkEtyitZxeAcY/SKL4KGHXK4BDAt4VKadkQwCFl9D5Ad55SyO8BaFVmOZ0A7XYlcXwB0JmjReT3AnxsUwJbK0C/S4sq8gOcUIL3APxFykLxTwDHFecowGiJslI6BnBcMRoBJtcoS2U3AZoV1QgwU66seWcBjinibYBZr0zwBgDetUnSkhaAgFemVPwK8IlDsn8EMP2ITNp4A+BcvrMdYKpSppVNAHT3AEyUyYK1V4i4slaWLO8nbMgji1w+gO5lsszRCmdy9T/YmpttyugfmOolbMxmOLkAAAAASUVORK5CYII="}),Object(u.jsxs)("p",{className:"buzz-card-likes-rebuzzes",children:[B," likes"]}),Object(u.jsx)("img",{onClick:function(){x(!w)},className:"repost-icon",src:w?"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAChElEQVR4Xu2av2oVQRSHv3QhFhIwhVYWStDiphFS+RIGH8FY+BLnJVJE38BCH8LGIimMqCAJpEoERRBEsFImuZf8m9k5s3t274Q9t7x75sz5fXvOmZndXWDkv4WR68cBeAaMnICXwMgTwJugl4CXwMgJeAl0SIBF4C5wo4OPNkN/AfuJgUvAnxKnbTLgIcKnkklMbYU1YO+KT+HfyX/CCvBDO2cpgKcIr7XOze1y4mcTFkAoAbCO8N5clNahVnwhBD2AWYppA7a0KxVfAEEL4D7CV0tNal9txSshaAHMp/aFCfAx2fC0FIXbwLeYuRbAM4SX0fmER9o4Cu2OgOPO4jOZoAWwibCdAKD1Uag/Yt61D0UyQRv8/AF0FX+WCRfK4XoAsBIfgVA/AGvxlyDUDaAv8ecg1AwgLIEvsp1T2Ew053fAl8z4vZoBZLWfGKSyRHgOiaX7nGcHoMPM/JfBVKCeAdPnAJcBeQl4D/Am6KuAL4O+D4g/w/CN0BkB3wlODxzh4NH0e4DwOHHoyKYZsBV9maHchjaaGewElxF+WsSS9CE9fodgACDE3R+EPsUbnwbtIfQt3hiAbSYMIb4HADYQhhLfE4Dg9hbC91aNMS4+PIq+08pfbpCwk1idwqOyV7nhTfuA8p4QFx+W0M+5QMyvCxvAm5zf3EZInwlx8ROED7kgerku3AMOcr5zAHTlUJv4096g0aYzauwJdYoPL2x3c3c/XFdRmjq6Wg51in8CvNWILwVwsRzqFL8KZR9ylGTADGrTp2ih8dzU0jey+w0cAn/b+GsDoM081Y5xANXemoEC8wwYCHS103gGVHtrBgrMM2Ag0NVO4xlQ7a0ZKLDRZ8B/mFnOxB/XQm0AAAAASUVORK5CYII=":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAACn0lEQVR4Xu2asW4UMRCG/zRWBIUVCwqoKEBRUoQGiYqXAOURCAXPQ0HyBimSh0iTIikIAiQEEhVESmTJEkLCDZGTnHS5rG9mdr17RjtXnu2Z+T+Px/buLmHkv6WR64cC0AwYOQFdAiNPAC2CugR0CYycgC6BDgmwDOARgLsdbLQZGgB8ywy8A+CPxGibDFgP0X+SOCnZ1xr3FMDJrM0Q/b/0nzXuPoBzrk8pgM0Q/S7XeOl+lPiJPwkECYDnIfrD0qK49rjipRDYACYpxg24ZD+peAkELoAnIfqvJUVxbbUVz4XABbCQtW+N2wDwMVfwBBAfADht6s8F8DpEv91kwBr3jBuIsN9PAL+6iqcygQtgK0T/PgOAa0Oo/3b3rnXIGncrE7jBLxxAV/FTmXADwn8BoJT4JgjVAygtfhZC1QD6Ej8NoWYAaQt8S1XOEP1WpjgfAPhCjD+pGQCl/bI9lyXWuDcAGrfuacMKgIUZWPg2mItTM+D6OcAsIF0CWgO0COouoNugngP0IKQnQeqgl47C6cKRLh7zfmsh+heZSwdJGcC7ppcZVHCc9hInwZUQvec4a9vHGse9c4hdlACQnPYGoU/xpW+DxSH0Lb40gKKZMIT4PgAUgTCU+L4AJLv3QvRn4op09Xq6qeClR9EP29ijxoTojzK7U3pUtkONn1edxTUhIz5toZ+pQEq3W+NeAdij7FLbEzsTMuI3QvQfqCD6aLfGPQbwnbJNAWAth9rEp6C5dYgDYC6ESsWnF7bH1Oyndi6ARgiVin8JYJ8jXgrgBoRKxa8CEH3IIcmACdR5n6KlwmO59Av1+w3gB4C/bey1AdDGT7VjFEC1UzNQYJoBA4Gu1o1mQLVTM1BgmgEDga7WjWZAtVMzUGCjz4ALKDpm09h39MAAAAAASUVORK5CYII="}),Object(u.jsxs)("p",{className:"buzz-card-likes-rebuzzes",children:[D," rebuzzes"]})]})})]})},w=function(e){var t=e.update;return Object(u.jsxs)("div",{className:"buzz-post-form",children:[Object(u.jsx)("div",{className:"buzz-post-form-content",children:Object(u.jsx)("textarea",{id:"content",className:"buzz-post-form-content-input",placeholder:"Say something here...",rows:"8",maxLength:"240"})}),Object(u.jsx)("div",{className:"buzz-post-form-footer",children:Object(u.jsx)("button",{className:"buzz-post-form-button",type:"button",onClick:function(e){A.a.post(d+"/api/postBuzz",{token:window.token,content:document.getElementById("content").value}).then((function(e){0!=e.data.status_code?alert("Failed to post buzz"):(document.getElementById("content").value="",t())})).catch((function(e){alert("Failed to post buzz")}))},children:"Post"})})]})},x=function(){var e=Object(i.f)(),t=Object(a.useState)(Object(u.jsx)(h,{author:"loading...",content:"loading..."})),n=Object(l.a)(t,2),o=n[0],s=n[1],c=Object(a.useState)([]),r=Object(l.a)(c,2),b=r[0],j=r[1];window.token||(e.push("/login"),window.location.reload()),0==b.length&&(console.log("loading feed"),A.a.post(d+"/api/feed",{token:window.token}).then((function(t){0==t.data.status_code?t.data.buzzes.length>0?(j(t.data.buzzes.reverse()),s(null)):(j([{_id:-1,content:"Welcome to Buzzer! When you follow users, their buzzes and rebuzzes will show up here!",author:"Buzzer",timestamp:-1,likes:0,rebuzzes:0,liked:!1,rebuzzed:!1}]),s(null)):(e.push("/login"),window.location.reload())})).catch((function(t){e.push("/login"),window.location.reload()})));return Object(u.jsxs)("div",{className:"feed",children:[Object(u.jsx)(w,{update:function(){A.a.post(d+"/api/feed",{token:window.token}).then((function(t){0==t.data.status_code?t.data.buzzes.length>0?j(t.data.buzzes.reverse()):(s(null),j([{_id:-1,content:"Welcome to Buzzer! When you follow users, their buzzes and rebuzzes will show up here!",author:"Buzzer",timestamp:-1,likes:0,rebuzzes:0,liked:!1,rebuzzed:!1}])):(e.push("/login"),window.location.reload())})).catch((function(t){e.push("/login"),window.location.reload()}))}}),o,b.map((function(e){return Object(u.jsx)(h,{buzzId:e._id,author:e.author,content:e.content,timestamp:e.timestamp,liked:e.liked,rebuzzed:e.rebuzzed,numLikes:e.likes,numRebuzzes:e.rebuzzes,rebuzzedBy:!!e.rebuzzedBy&&e.rebuzzedBy},e._id)})),Object(u.jsx)("div",{className:"load-more-button-container",children:Object(u.jsx)("button",{type:"button",className:"load-more-button",onClick:function(e){var t=b[b.length-1].timestamp;A.a.post(d+"/api/feedFrom",{token:window.token,timestamp:t}).then((function(e){console.log(e.data),j(b.concat(e.data.buzzes.reverse()))})).catch((function(e){alert("Error fetching more buzzes")}))},children:"Load More"})})]})},Q=function(){return Object(u.jsx)("div",{className:"aside"})},N=function(){var e=Object(i.f)();return window.token||(e.push("/login"),window.location.reload()),Object(u.jsxs)("div",{className:"root-grid-container",children:[Object(u.jsx)(O,{}),Object(u.jsx)(x,{}),Object(u.jsx)(Q,{})]})},B=function(e){var t=e.stateInfo,n=e.setStateInfo,a=e.reLoad,o=e.userId,s=e.username,c=e.firstName,r=e.lastName,i=e.bio,l=e.numFollowers,b=e.numFollowing,j=e.following,m=e.followsBack;t.loaded||A.a.post(d+"/api/usersBuzzes",{token:window.token,username:s}).then((function(e){0==e.data.status_code&&n({loaded:!0,buzzes:e.data.buzzes})})).catch((function(e){console.log(e)}));return Object(u.jsxs)("div",{className:"feed",children:[Object(u.jsxs)("div",{className:"profile-container",children:[Object(u.jsx)("div",{className:"pfp-container",children:Object(u.jsx)("img",{alt:"",src:f})}),Object(u.jsx)("h1",{children:c+" "+r}),Object(u.jsx)("h2",{children:"@"+s}),Object(u.jsx)("p",{children:l+" followers \u2022 "+b+" following"}),Object(u.jsx)("div",{children:Object(u.jsx)("button",{onClick:function(){j?A.a.post(d+"/api/unfollow",{token:window.token,userToUnfollow:o}).then((function(e){0==e.data.status_code&&a()})):A.a.post(d+"/api/follow",{token:window.token,userToFollow:o}).then((function(e){0==e.data.status_code&&a()}))},className:j?"unfollow-btn":"follow-btn",children:j?"Unfollow":"Follow"})}),m?Object(u.jsx)("span",{className:"follows-you-span",children:"-Follows You-"}):"",Object(u.jsx)("p",{className:"user-profile-bio-text",children:i})]}),t.buzzes.map((function(e){return Object(u.jsx)(h,{buzzId:e._id,author:e.author,content:e.content,timestamp:e.timestamp,liked:e.liked,rebuzzed:e.rebuzzed,numLikes:e.likes,numRebuzzes:e.rebuzzes,rebuzzedBy:!!e.rebuzzedBy&&e.rebuzzedBy},e._id)})),Object(u.jsx)("div",{className:"load-more-button-container",children:Object(u.jsx)("button",{type:"button",className:"load-more-button",onClick:function(){if(0==t.buzzes.length)alert("not loaded yet");else{var e=t.buzzes[t.buzzes.length-1].timestamp;A.a.post(d+"/api/usersBuzzesFrom",{token:window.token,username:s,timestamp:e}).then((function(e){0==e.data.status_code&&n({loaded:t.loaded,buzzes:t.buzzes.concat(e.data.buzzes)})})).catch((function(e){alert("Error loading more buzzes")}))}},children:"Load More"})})]})},v=function(){var e=Object(i.f)(),t=Object(a.useState)({loaded:!1,buzzes:[]}),n=Object(l.a)(t,2),o=n[0],s=n[1],c=Object(a.useState)({loaded:!1,username:"loading...",firstName:"loading...",lastName:"loading...",bio:"loading...",numFollowers:"",numFollowing:"",following:!1,followsBack:!1}),r=Object(l.a)(c,2),b=r[0],j=r[1];return window.token||(e.push("/login"),window.location.reload()),b.loaded||A.a.post(d+"/api/profile",{token:window.token}).then((function(e){j({loaded:!0,userId:e.data.profileData.userId,username:e.data.profileData.username,firstName:e.data.profileData.firstName,lastName:e.data.profileData.lastName,bio:e.data.profileData.bio,numFollowers:e.data.profileData.numFollowers,numFollowing:e.data.profileData.numFollowing,following:e.data.profileData.following,followsBack:e.data.profileData.followsBack})})).catch((function(e){console.log(e)})),Object(u.jsxs)("div",{className:"root-grid-container",children:[Object(u.jsx)(O,{}),Object(u.jsx)(B,{stateInfo:o,setStateInfo:s,username:b.username,firstName:b.firstName,lastName:b.lastName,bio:b.bio,numFollowers:b.numFollowers,numFollowing:b.numFollowing,following:b.following,followsBack:b.followsBack}),Object(u.jsx)(Q,{})]})},C=function(e){var t=e.username,n=e.firstName,a=e.lastName,o=e.bio,s=Object(i.f)();return Object(u.jsx)("div",{className:"user-search-result-container",children:Object(u.jsxs)("div",{className:"user-search-result",onClick:function(){s.push("/user/"+t)},children:[Object(u.jsxs)("div",{className:"user-search-result-top-left",children:[Object(u.jsx)("p",{className:"user-search-result-name-text",children:n+" "+a}),Object(u.jsx)("p",{children:"@"+t})]}),Object(u.jsx)("div",{className:"user-search-result-bottom-right",children:o}),Object(u.jsx)("div",{className:"user-search-result-bottom-left",children:Object(u.jsx)("img",{alt:"",src:f})})]})})},E=function(){var e=Object(a.useState)([]),t=Object(l.a)(e,2),n=t[0],o=t[1],s=Object(a.useState)(!0),c=Object(l.a)(s,2),r=c[0],i=c[1];return Object(u.jsxs)("div",{children:[Object(u.jsx)("div",{className:"search-bar-container",children:Object(u.jsx)("input",{id:"searchInput",onChange:function(e){if(r){var t=document.getElementById("searchInput").value;0!=t.length?(i(!1),A.a.post(d+"/api/searchUser",{query:t}).then((function(e){i(!0),0==e.data.status_code&&o(e.data.users)})).catch((function(e){o([]),i(!0)}))):o([])}},className:"search-bar",placeholder:"Enter a username here",autoComplete:"off"})}),n.map((function(e){return Object(u.jsx)(C,{username:e.username,firstName:e.firstName,lastName:e.lastName,bio:e.bio},e.username)}))]})},D=function(){var e=Object(i.f)();return window.token||(e.push("/login"),window.location.reload()),Object(u.jsxs)("div",{className:"root-grid-container",children:[Object(u.jsx)(O,{}),Object(u.jsx)(E,{}),Object(u.jsx)(Q,{})]})},S=function(){var e=Object(i.f)(),t=Object(i.g)().username,n=Object(a.useState)(t),o=Object(l.a)(n,2),s=o[0],c=o[1],r=Object(a.useState)({loaded:!1,buzzes:[]}),b=Object(l.a)(r,2),j=b[0],m=b[1],z=Object(a.useState)({loaded:!1,username:"loading...",firstName:"loading...",lastName:"loading...",bio:"loading...",numFollowers:"",numFollowing:"",following:!1,followsBack:!1}),g=Object(l.a)(z,2),p=g[0],f=g[1];window.token||(e.push("/login"),window.location.reload()),p.loaded||A.a.post(d+"/api/user",{token:window.token,username:t}).then((function(e){f({loaded:!0,userId:e.data.userData.userId,username:e.data.userData.username,firstName:e.data.userData.firstName,lastName:e.data.userData.lastName,bio:e.data.userData.bio,numFollowers:e.data.userData.numFollowers,numFollowing:e.data.userData.numFollowing,following:e.data.userData.following,followsBack:e.data.userData.followsBack})})).catch((function(e){console.log(e)}));var h=function(){f({loaded:!1,username:"loading...",firstName:"loading...",lastName:"loading...",bio:"loading...",numFollowers:"",numFollowing:"",following:!1,followsBack:!1})};return t!=s&&(c(t),h(),m({loaded:!1,buzzes:[]})),Object(u.jsxs)("div",{className:"root-grid-container",children:[Object(u.jsx)(O,{}),Object(u.jsx)(B,{reLoad:h,stateInfo:j,setStateInfo:m,userId:p.userId,username:p.username,firstName:p.firstName,lastName:p.lastName,bio:p.bio,numFollowers:p.numFollowers,numFollowing:p.numFollowing,following:p.following,followsBack:p.followsBack}),Object(u.jsx)(Q,{})]})};var I=function(){return Object(u.jsx)(r.a,{children:Object(u.jsxs)(i.c,{children:[Object(u.jsx)(i.a,{path:"/",exact:!0,children:Object(u.jsx)(N,{})}),Object(u.jsx)(i.a,{path:"/login",children:Object(u.jsx)(p,{})}),Object(u.jsx)(i.a,{path:"/signup",children:Object(u.jsx)(m,{})}),Object(u.jsx)(i.a,{path:"/search",children:Object(u.jsx)(D,{})}),Object(u.jsx)(i.a,{path:"/profile",children:Object(u.jsx)(v,{})}),Object(u.jsx)(i.a,{path:"/user/:username",children:Object(u.jsx)(S,{})})]})})},k=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,58)).then((function(t){var n=t.getCLS,a=t.getFID,o=t.getFCP,s=t.getLCP,c=t.getTTFB;n(e),a(e),o(e),s(e),c(e)}))};c.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(I,{})}),document.getElementById("root")),k()}},[[57,1,2]]]);
//# sourceMappingURL=main.e4fe2c7e.chunk.js.map