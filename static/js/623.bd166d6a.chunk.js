"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[623],{6333:(e,a,t)=>{t.r(a),t.d(a,{default:()=>f});var n=t(65043),r=t(45817),d=t(80861),l=t(96105),i=t(23682),o=t(49634),c=t(73216),s=t(70579);const f=()=>{let e=(0,c.Zp)();const{getData:a}=(0,o.A)(),t=a("basics");return(0,n.useEffect)((()=>{t||e("/dashboard")}),[t]),(0,s.jsx)("div",{className:"daily-report",children:(0,s.jsx)(d.E,{children:(0,s.jsx)(l.W,{children:(0,s.jsx)(i.d,{children:(0,s.jsx)(r.A,{})})})})})}},64231:(e,a,t)=>{t.d(a,{I:()=>c});var n=t(22378),r=t(65043),d=t(65173),l=t.n(d),i=t(25196),o=t(64557),c=(0,r.forwardRef)((function(e,a){var t=e.children,d=e.className,l=e.feedback,c=e.feedbackInvalid,s=e.feedbackValid,f=e.floatingClassName,p=e.floatingLabel,u=e.id,b=e.invalid,m=e.label,y=e.plainText,g=e.text,v=e.tooltipFeedback,k=e.valid,h=(0,n.Tt)(e,["children","className","feedback","feedbackInvalid","feedbackValid","floatingClassName","floatingLabel","id","invalid","label","plainText","text","tooltipFeedback","valid"]);return r.createElement(o.O,{describedby:h["aria-describedby"],feedback:l,feedbackInvalid:c,feedbackValid:s,floatingClassName:f,floatingLabel:p,id:u,invalid:b,label:m,text:g,tooltipFeedback:v,valid:k},r.createElement("textarea",(0,n.Cl)({className:(0,i.A)(y?"form-control-plaintext":"form-control",{"is-invalid":b,"is-valid":k},d),id:u},h,{ref:a}),t))}));c.propTypes=(0,n.Cl)({className:l().string,id:l().string,plainText:l().bool},o.O.propTypes),c.displayName="CFormTextarea"},92073:(e,a,t)=>{t.d(a,{A:()=>c});const n={randomUUID:"undefined"!==typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto)};let r;const d=new Uint8Array(16);function l(){if(!r&&(r="undefined"!==typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!r))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return r(d)}const i=[];for(let s=0;s<256;++s)i.push((s+256).toString(16).slice(1));function o(e){let a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0;return i[e[a+0]]+i[e[a+1]]+i[e[a+2]]+i[e[a+3]]+"-"+i[e[a+4]]+i[e[a+5]]+"-"+i[e[a+6]]+i[e[a+7]]+"-"+i[e[a+8]]+i[e[a+9]]+"-"+i[e[a+10]]+i[e[a+11]]+i[e[a+12]]+i[e[a+13]]+i[e[a+14]]+i[e[a+15]]}const c=function(e,a,t){if(n.randomUUID&&!a&&!e)return n.randomUUID();const r=(e=e||{}).random||(e.rng||l)();if(r[6]=15&r[6]|64,r[8]=63&r[8]|128,a){t=t||0;for(let e=0;e<16;++e)a[t+e]=r[e];return a}return o(r)}}}]);
//# sourceMappingURL=623.bd166d6a.chunk.js.map