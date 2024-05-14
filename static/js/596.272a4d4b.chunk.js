"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[596],{99349:(e,l,n)=>{n.d(l,{A:()=>h});n(65043);var t=n(4398),o=n(11418),a=n(89689),r=n(16323),s=n(81917),c=n(44101),d=n(44227),i=n(10825),m=n(85968),u=n(84709),f=n(70579);const h=e=>{const l=()=>{e.sendDataToParent(!1)};return(0,f.jsxs)(t.z,{scrollable:!0,visible:e.visible,onClose:()=>l(),"aria-labelledby":"ScrollingLongContentExampleLabel2",size:"xl",className:"project-creation-modal",children:[(0,f.jsx)(o.E,{children:(0,f.jsx)(a.l,{id:"ScrollingLongContentExampleLabel2",children:"A\xf1adir Contrato"})}),(0,f.jsx)(r.T,{children:(0,f.jsxs)(s.q,{children:[(0,f.jsxs)(c.s,{children:[(0,f.jsx)(d.U,{sm:6,children:(0,f.jsx)(i.O,{type:"text",id:"contractName",label:"Nombre",placeholder:"Nombre",text:"",onChange:e=>{}})}),(0,f.jsx)(d.U,{sm:6,children:(0,f.jsx)(i.O,{type:"text",id:"contractDetail",label:"Detalle",placeholder:"Detalle",text:""})})]}),(0,f.jsxs)(c.s,{children:[(0,f.jsx)(d.U,{sm:6,children:(0,f.jsx)(i.O,{type:"text",id:"contractUrl",label:"URL",placeholder:"URL",text:""})}),(0,f.jsxs)(d.U,{sm:6,children:[(0,f.jsx)(i.O,{type:"text",id:"contractPhone",label:"Tel\xe9fono",placeholder:"Tel\xe9fono",text:""})," "]})]}),(0,f.jsx)(c.s,{children:(0,f.jsx)(d.U,{sm:6,children:(0,f.jsx)(i.O,{type:"text",id:"contractMail",label:"Email",placeholder:"Email",text:""})})})]})}),(0,f.jsxs)(m.I,{children:[(0,f.jsx)(u.Q,{color:"secondary",onClick:()=>l(),children:"Cerrar"}),(0,f.jsx)(u.Q,{className:"btn-add",children:"A\xf1adir contrato"})]})]})}},34596:(e,l,n)=>{n.r(l),n.d(l,{default:()=>v});var t=n(65043),o=n(80861),a=n(96105),r=n(84709),s=n(44101),c=n(44227),d=n(54101),i=n(6122),m=n(72717),u=n(13127),f=n(92535),h=n(77154),b=n(70579);const p=()=>{const{data:e,isLoading:l}=(0,f.I)({queryKey:["contracts"],queryFn:async()=>(async()=>(await h.A.get("https://run.mocky.io/v3/9b3c50eb-0ea0-40b8-bf42-a6221aeab3da")).data.data)()});return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(s.s,{children:[(0,b.jsx)(c.U,{children:"Nombre"}),(0,b.jsx)(c.U,{children:"Detalle"}),(0,b.jsx)(c.U,{children:"URL"}),(0,b.jsx)(c.U,{children:"Tel\xe9fono"}),(0,b.jsx)(c.U,{children:"Email"})]}),(0,b.jsx)(d.E,{className:"contract-list",children:!l&&(null===e||void 0===e?void 0:e.map(((e,l)=>(0,b.jsxs)(i.l,{itemKey:e.id,children:[(0,b.jsx)(m.B,{children:(0,b.jsxs)(s.s,{children:[(0,b.jsx)(c.U,{children:e.contractName}),(0,b.jsx)(c.U,{children:e.contractDetail}),(0,b.jsx)(c.U,{children:e.contractUrl}),(0,b.jsx)(c.U,{children:e.contractPhone}),(0,b.jsx)(c.U,{children:e.contractMail})]})}),(0,b.jsxs)(u.i,{children:[(0,b.jsx)(r.Q,{className:"btn-project-action",children:"Editar"}),(0,b.jsx)(r.Q,{className:"btn-project-action",children:"Curva S"})]})]},e.id))))})]})};var x=n(99349);const v=()=>{const[e,l]=(0,t.useState)(!1);return(0,b.jsxs)("div",{className:"contract-administration",children:[(0,b.jsx)("h2",{children:"Administrar Contratos"}),e&&(0,b.jsx)(x.A,{visible:!0,sendDataToParent:e=>{l(e)}}),(0,b.jsx)(o.E,{className:"action-buttons",children:(0,b.jsx)(a.W,{children:(0,b.jsx)(r.Q,{onClick:()=>l(!e),children:"A\xf1adir contrato"})})}),(0,b.jsx)(o.E,{children:(0,b.jsx)(a.W,{children:(0,b.jsx)(p,{})})})]})}},4398:(e,l,n)=>{n.d(l,{z:()=>b,m:()=>h});var t=n(22378),o=n(65043),a=n(65173),r=n.n(a),s=n(25196),c=n(46125),d=n(372),i=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.className,r=(0,t.Tt)(e,["children","className"]);return o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal-content",a)},r,{ref:l}),n)}));i.propTypes={children:r().node,className:r().string},i.displayName="CModalContent";var m=(0,o.forwardRef)((function(e,l){var n,a=e.children,r=e.alignment,c=e.className,d=e.fullscreen,i=e.scrollable,m=e.size,u=(0,t.Tt)(e,["children","alignment","className","fullscreen","scrollable","size"]);return o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal-dialog",(n={"modal-dialog-centered":"center"===r},n["boolean"===typeof d?"modal-fullscreen":"modal-fullscreen-".concat(d,"-down")]=d,n["modal-dialog-scrollable"]=i,n["modal-".concat(m)]=m,n),c)},u,{ref:l}),a)}));m.propTypes={alignment:r().oneOf(["top","center"]),children:r().node,className:r().string,fullscreen:r().oneOfType([r().bool,r().oneOf(["sm","md","lg","xl","xxl"])]),scrollable:r().bool,size:r().oneOf(["sm","lg","xl"])},m.displayName="CModalDialog";var u=n(94462),f=n(80413),h=(0,o.createContext)({}),b=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.alignment,r=e.backdrop,b=void 0===r||r,p=e.className,x=e.duration,v=void 0===x?150:x,y=e.focus,j=void 0===y||y,N=e.fullscreen,C=e.keyboard,E=void 0===C||C,g=e.onClose,T=e.onClosePrevented,w=e.onShow,k=e.portal,O=void 0===k||k,U=e.scrollable,L=e.size,A=e.transition,R=void 0===A||A,P=e.unmountOnClose,z=void 0===P||P,M=e.visible,S=(0,t.Tt)(e,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),D=(0,o.useRef)(null),B=(0,o.useRef)(null),Q=(0,o.useRef)(null),F=(0,u.E2)(l,B),I=(0,o.useState)(M),q=I[0],W=I[1],G=(0,o.useState)(!1),K=G[0],V=G[1],Y={visible:q,setVisible:W};(0,o.useEffect)((function(){W(M)}),[M]),(0,o.useEffect)((function(){var e;return q?(D.current=document.activeElement,document.addEventListener("mouseup",H),document.addEventListener("keydown",J)):null===(e=D.current)||void 0===e||e.focus(),function(){document.removeEventListener("mouseup",H),document.removeEventListener("keydown",J)}}),[q]);var _=function(){return"static"===b?V(!0):(W(!1),g&&g())};(0,o.useLayoutEffect)((function(){T&&T(),setTimeout((function(){return V(!1)}),v)}),[K]),(0,o.useLayoutEffect)((function(){return q?(document.body.classList.add("modal-open"),b&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout((function(){var e;j&&(null===(e=B.current)||void 0===e||e.focus())}),R?v:0)):(document.body.classList.remove("modal-open"),b&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),b&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}}),[q]);var H=function(e){B.current&&B.current==e.target&&_()},J=function(e){"Escape"===e.key&&E&&_()};return o.createElement(o.Fragment,null,o.createElement(f.Ay,{in:q,mountOnEnter:!0,nodeRef:B,onEnter:w,onExit:g,unmountOnExit:z,timeout:R?v:0},(function(e){return o.createElement(d.Y,{portal:O},o.createElement(h.Provider,{value:Y},o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal",{"modal-static":K,fade:R,show:"entered"===e},p),tabIndex:-1},q?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:(0,t.Cl)({},"exited"!==e&&{display:"block"})},S,{ref:F}),o.createElement(m,{alignment:a,fullscreen:N,scrollable:U,size:L},o.createElement(i,{ref:Q},n)))))})),b&&o.createElement(d.Y,{portal:O},o.createElement(c.W,{visible:q})))}));b.propTypes={alignment:r().oneOf(["top","center"]),backdrop:r().oneOfType([r().bool,r().oneOf(["static"])]),children:r().node,className:r().string,duration:r().number,focus:r().bool,fullscreen:r().oneOfType([r().bool,r().oneOf(["sm","md","lg","xl","xxl"])]),keyboard:r().bool,onClose:r().func,onClosePrevented:r().func,onShow:r().func,portal:r().bool,scrollable:r().bool,size:r().oneOf(["sm","lg","xl"]),transition:r().bool,unmountOnClose:r().bool,visible:r().bool},b.displayName="CModal"},16323:(e,l,n)=>{n.d(l,{T:()=>c});var t=n(22378),o=n(65043),a=n(65173),r=n.n(a),s=n(25196),c=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.className,r=(0,t.Tt)(e,["children","className"]);return o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal-body",a)},r,{ref:l}),n)}));c.propTypes={children:r().node,className:r().string},c.displayName="CModalBody"},85968:(e,l,n)=>{n.d(l,{I:()=>c});var t=n(22378),o=n(65043),a=n(65173),r=n.n(a),s=n(25196),c=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.className,r=(0,t.Tt)(e,["children","className"]);return o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal-footer",a)},r,{ref:l}),n)}));c.propTypes={children:r().node,className:r().string},c.displayName="CModalFooter"},11418:(e,l,n)=>{n.d(l,{E:()=>i});var t=n(22378),o=n(65043),a=n(65173),r=n.n(a),s=n(25196),c=(0,o.forwardRef)((function(e,l){var n=e.className,a=e.dark,r=e.disabled,c=e.white,d=(0,t.Tt)(e,["className","dark","disabled","white"]);return o.createElement("button",(0,t.Cl)({type:"button",className:(0,s.A)("btn","btn-close",{"btn-close-white":c},r,n),"aria-label":"Close",disabled:r},a&&{"data-coreui-theme":"dark"},d,{ref:l}))}));c.propTypes={className:r().string,dark:r().bool,disabled:r().bool,white:r().bool},c.displayName="CCloseButton";var d=n(4398),i=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.className,r=e.closeButton,i=void 0===r||r,m=(0,t.Tt)(e,["children","className","closeButton"]),u=(0,o.useContext)(d.m).setVisible;return o.createElement("div",(0,t.Cl)({className:(0,s.A)("modal-header",a)},m,{ref:l}),n,i&&o.createElement(c,{onClick:function(){return u(!1)}}))}));i.propTypes={children:r().node,className:r().string,closeButton:r().bool},i.displayName="CModalHeader"},89689:(e,l,n)=>{n.d(l,{l:()=>c});var t=n(22378),o=n(65043),a=n(65173),r=n.n(a),s=n(25196),c=(0,o.forwardRef)((function(e,l){var n=e.children,a=e.as,r=void 0===a?"h5":a,c=e.className,d=(0,t.Tt)(e,["children","as","className"]);return o.createElement(r,(0,t.Cl)({className:(0,s.A)("modal-title",c)},d,{ref:l}),n)}));c.propTypes={as:r().elementType,children:r().node,className:r().string},c.displayName="CModalTitle"}}]);
//# sourceMappingURL=596.272a4d4b.chunk.js.map