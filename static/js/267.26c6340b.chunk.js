(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[267],{33577:(e,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>t});n(65043);var l=n(50286),a=n(76880),s=n(66885),o=n(70579);const t=()=>{const e=(0,o.jsx)("html",{children:(0,o.jsxs)("body",{children:[(0,o.jsx)("style",{children:"\n        .heading4 {\n          color: white;\n        }\n        pre {\n          background-color: #eee;\n          padding: 10px;\n        }\n        table, th, td {\n            border: 1px solid black;\n        }\n        td {\n          font-size: 14;\n          padding: 5px;\n          text-align: center;\n        }\n        .td-workers-label {\n          background-color: #028080;\n          color: white;\n        }\n        .td-machinery-label {\n          background-color: #c2f0c8;\n        }\n        .td-workers-name {\n          text-align: left;\n        }\n        .td-green-label {\n          background-color: #3c7d23;\n          color: white;\n        }\n        .td-total-label{\n          background-color: #ffcc66;\n        }\n        .td-label {\n          background-color: #006666;\n          color: white;\n        }"}),(0,o.jsx)("table",{border:1,children:(0,o.jsxs)("tbody",{children:[(0,o.jsx)("tr",{children:(0,o.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"COMENTARIOS Y ALERTAS EN GENERAL"})}),(0,o.jsx)("tr",{})]})})]})}),r=s.renderToStaticMarkup(e);return(0,o.jsx)(l.yo,{children:(0,o.jsx)(l.YW,{size:"A1",orientation:"landscape",children:(0,o.jsx)(a.Ed,{children:r})})})}},73532:(e,r,n)=>{"use strict";n.r(r),n.d(r,{default:()=>H});var l=n(65043),a=n(54101),s=n(6122),o=n(72717),t=n(13127),i=n(84709),c=n(25762),d=n(8270),m=n(56627),u=n(31148),h=n(54451),x=n(70579);var p=n(34974);var j=n(89756),y=n(31486),f=n(54823),b=n(42566),v=n(26460);var g=n(49957),N=n(17564),E=n(87921),C=n(90761),R=n(43357),A=n(84998),k=n(85930),T=n(44619),w=n(63171),L=n(81925),B=n(56732),K=n(73216),z=n(4398),F=n(11418),O=n(16323),P=n(81917),S=n(44101),D=n(44227),M=n(64231),q=n(85968);const W=e=>{const[r,n]=(0,l.useState)(""),[a,s]=(0,l.useState)(!1);return(0,x.jsxs)(z.z,{scrollable:!0,visible:e.visible,onClose:()=>e.sendDataToParent(!1),"aria-labelledby":"ScrollingLongContentExampleLabel2",size:"xl",className:"project-creation-modal",children:[(0,x.jsx)(F.E,{}),(0,x.jsx)(O.T,{children:(0,x.jsx)(P.q,{children:(0,x.jsx)(S.s,{children:(0,x.jsx)(D.U,{sm:12,children:(0,x.jsx)(M.I,{id:"rejectCommentary",label:"Comentario",value:r||"",rows:3,invalid:a,text:a&&"Debe agregar un comentario para rechazar el informe diario.",onChange:e=>{(e=>{n(e.target.value)})(e)}})})})})}),(0,x.jsxs)(q.I,{children:[(0,x.jsx)(i.Q,{color:"danger",onClick:()=>(s(!1),void(""!==r?e.sendDataToParent(!1):s(!0))),children:"Rechazar"}),(0,x.jsx)(i.Q,{color:"primary",onClick:()=>{e.sendDataToParent(!1)},children:"Aprobar"})]})]})};var I=n(50286),G=n(33577),V=n(49634);const Y=()=>{const e=(0,K.zy)().pathname.includes("/edit"),[r,n]=((0,K.Zp)(),(0,l.useState)(!1)),{company:z,indirectWorkForceList:F,totalIndirectWorkForce:O,directWorkForceList:P,totalDirectWorkForce:S,asarcoMachineryList:D,machineryList:M,equipmentList:q,equipmentPlateList:Y,vehicleList:Q,vehiclePlateList:Z,activityList:_,aljibeList:H,comment:U,incident:X,directDotationWorkForceList:J,machineryWorkForceList:$,equipmentWorkForceList:ee}=(0,h.A)();console.log("company",z);const[re,ne]=(0,l.useState)(!1),[le,ae]=(0,l.useState)(),[se,oe]=(0,l.useState)(),{getData:te}=(0,V.A)(),{registerData:ie}=(te("basics"),(0,A.A)());return(0,x.jsxs)("div",{className:"dailyReport",children:[r&&(0,x.jsx)(W,{visible:!0,sendDataToParent:async e=>{n(e)}}),(0,x.jsxs)("div",{children:["asd",(0,x.jsx)(I.XP,{document:(0,x.jsx)(G.default,{}),fileName:"Reporte 1.pdf",children:e=>{let{blob:r,url:n,loading:l,error:a}=e;return console.log("blob",r),console.log("url",n),console.log("loading",l),console.log("error",a),ne(l),ae(r),oe(n),l?"Loading document...":"Descargar PDF!"}})]}),!re&&se&&le?(0,x.jsxs)(x.Fragment,{children:[" ",(0,x.jsxs)(a.E,{className:"dailyReport-accordion",activeItemKey:1,children:[(0,x.jsxs)(s.l,{itemKey:1,children:[(0,x.jsx)(o.B,{children:"1) Empresa"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(c.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:2,children:[(0,x.jsx)(o.B,{children:"2) Fuerza de trabajo personal indirecto"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(d.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:3,children:[(0,x.jsx)(o.B,{children:"3) Fuerza laboral total personal indirecto"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(m.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:4,children:[(0,x.jsx)(o.B,{children:"4) Fuerza laboral contratista personal directo"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(R.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:5,children:[(0,x.jsx)(o.B,{children:"5) Fuerza laboral total personal directo"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(u.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:6,children:[(0,x.jsx)(o.B,{children:"6) Dotaci\xf3n por frente de trabajo personal directo"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(p.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:7,children:[(0,x.jsx)(o.B,{children:"7) Maquinarias contratistas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(j.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:8,children:[(0,x.jsx)(o.B,{children:"8) Maquinarias por frente de trabajo"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(y.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:9,children:[(0,x.jsx)(o.B,{children:"9) ASARCO Maquinarias"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(k.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:10,children:[(0,x.jsx)(o.B,{children:"10) Equipos contratistas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(f.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:11,children:[(0,x.jsx)(o.B,{children:"11) Equipos con patentes contratistas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(T.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:12,children:[(0,x.jsx)(o.B,{children:"12) Equipos por frente de trabajo"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(b.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:13,children:[(0,x.jsx)(o.B,{children:"13) Veh\xedculos menores contratistas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(v.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:14,children:[(0,x.jsx)(o.B,{children:"14) Veh\xedculos con patente menores contratistas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(w.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:15,children:[(0,x.jsx)(o.B,{children:"15) Descripci\xf3n de actividades desarrolladas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(g.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:16,children:[(0,x.jsx)(o.B,{children:"16) Control de aguas industriales utilizadas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(L.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:17,children:[(0,x.jsx)(o.B,{children:"17) Comentarios y alertas en general"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(N.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:19,children:[(0,x.jsx)(o.B,{children:"19) Registro fotogr\xe1fico diario"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(B.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:20,children:[(0,x.jsx)(o.B,{children:"20) Graficos del d\xeda"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(E.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:21,children:[(0,x.jsx)(o.B,{children:"21) Incidentes, lesiones o eventos"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(C.A,{})})]}),(0,x.jsxs)(s.l,{itemKey:22,children:[(0,x.jsx)(o.B,{children:"22) Firmas"}),(0,x.jsx)(t.i,{className:"dailyReport-accordion",children:(0,x.jsx)(x.Fragment,{})})]})]}),(0,x.jsx)(i.Q,{className:"btn-project-action",onClick:()=>{e?n(!r):ie()},children:"Registrar informe diario"})]}):(0,x.jsx)(x.Fragment,{children:"cargando"})]})};var Q=n(80861),Z=n(96105),_=n(23682);const H=()=>{let e=(0,K.Zp)();const{getData:r}=(0,V.A)(),n=r("basics");return(0,l.useEffect)((()=>{n||e("/dashboard")}),[n]),(0,x.jsx)("div",{className:"daily-report",children:(0,x.jsx)(Q.E,{children:(0,x.jsx)(Z.W,{children:(0,x.jsx)(_.d,{children:(0,x.jsx)(Y,{})})})})})}},23682:(e,r,n)=>{"use strict";n.d(r,{d:()=>i});var l=n(22378),a=n(65043),s=n(65173),o=n.n(s),t=n(25196),i=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.as,o=void 0===s?"p":s,i=e.className,c=(0,l.Tt)(e,["children","as","className"]);return a.createElement(o,(0,l.Cl)({className:(0,t.A)("card-text",i)},c,{ref:r}),n)}));i.propTypes={as:o().elementType,children:o().node,className:o().string},i.displayName="CCardText"},4398:(e,r,n)=>{"use strict";n.d(r,{z:()=>p,m:()=>x});var l=n(22378),a=n(65043),s=n(65173),o=n.n(s),t=n(25196),i=n(46125),c=n(372),d=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.className,o=(0,l.Tt)(e,["children","className"]);return a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal-content",s)},o,{ref:r}),n)}));d.propTypes={children:o().node,className:o().string},d.displayName="CModalContent";var m=(0,a.forwardRef)((function(e,r){var n,s=e.children,o=e.alignment,i=e.className,c=e.fullscreen,d=e.scrollable,m=e.size,u=(0,l.Tt)(e,["children","alignment","className","fullscreen","scrollable","size"]);return a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal-dialog",(n={"modal-dialog-centered":"center"===o},n["boolean"===typeof c?"modal-fullscreen":"modal-fullscreen-".concat(c,"-down")]=c,n["modal-dialog-scrollable"]=d,n["modal-".concat(m)]=m,n),i)},u,{ref:r}),s)}));m.propTypes={alignment:o().oneOf(["top","center"]),children:o().node,className:o().string,fullscreen:o().oneOfType([o().bool,o().oneOf(["sm","md","lg","xl","xxl"])]),scrollable:o().bool,size:o().oneOf(["sm","lg","xl"])},m.displayName="CModalDialog";var u=n(94462),h=n(80413),x=(0,a.createContext)({}),p=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.alignment,o=e.backdrop,p=void 0===o||o,j=e.className,y=e.duration,f=void 0===y?150:y,b=e.focus,v=void 0===b||b,g=e.fullscreen,N=e.keyboard,E=void 0===N||N,C=e.onClose,R=e.onClosePrevented,A=e.onShow,k=e.portal,T=void 0===k||k,w=e.scrollable,L=e.size,B=e.transition,K=void 0===B||B,z=e.unmountOnClose,F=void 0===z||z,O=e.visible,P=(0,l.Tt)(e,["children","alignment","backdrop","className","duration","focus","fullscreen","keyboard","onClose","onClosePrevented","onShow","portal","scrollable","size","transition","unmountOnClose","visible"]),S=(0,a.useRef)(null),D=(0,a.useRef)(null),M=(0,a.useRef)(null),q=(0,u.E2)(r,D),W=(0,a.useState)(O),I=W[0],G=W[1],V=(0,a.useState)(!1),Y=V[0],Q=V[1],Z={visible:I,setVisible:G};(0,a.useEffect)((function(){G(O)}),[O]),(0,a.useEffect)((function(){var e;return I?(S.current=document.activeElement,document.addEventListener("mouseup",H),document.addEventListener("keydown",U)):null===(e=S.current)||void 0===e||e.focus(),function(){document.removeEventListener("mouseup",H),document.removeEventListener("keydown",U)}}),[I]);var _=function(){return"static"===p?Q(!0):(G(!1),C&&C())};(0,a.useLayoutEffect)((function(){R&&R(),setTimeout((function(){return Q(!1)}),f)}),[Y]),(0,a.useLayoutEffect)((function(){return I?(document.body.classList.add("modal-open"),p&&(document.body.style.overflow="hidden",document.body.style.paddingRight="0px"),setTimeout((function(){var e;v&&(null===(e=D.current)||void 0===e||e.focus())}),K?f:0)):(document.body.classList.remove("modal-open"),p&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))),function(){document.body.classList.remove("modal-open"),p&&(document.body.style.removeProperty("overflow"),document.body.style.removeProperty("padding-right"))}}),[I]);var H=function(e){D.current&&D.current==e.target&&_()},U=function(e){"Escape"===e.key&&E&&_()};return a.createElement(a.Fragment,null,a.createElement(h.Ay,{in:I,mountOnEnter:!0,nodeRef:D,onEnter:A,onExit:C,unmountOnExit:F,timeout:K?f:0},(function(e){return a.createElement(c.Y,{portal:T},a.createElement(x.Provider,{value:Z},a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal",{"modal-static":Y,fade:K,show:"entered"===e},j),tabIndex:-1},I?{"aria-modal":!0,role:"dialog"}:{"aria-hidden":"true"},{style:(0,l.Cl)({},"exited"!==e&&{display:"block"})},P,{ref:q}),a.createElement(m,{alignment:s,fullscreen:g,scrollable:w,size:L},a.createElement(d,{ref:M},n)))))})),p&&a.createElement(c.Y,{portal:T},a.createElement(i.W,{visible:I})))}));p.propTypes={alignment:o().oneOf(["top","center"]),backdrop:o().oneOfType([o().bool,o().oneOf(["static"])]),children:o().node,className:o().string,duration:o().number,focus:o().bool,fullscreen:o().oneOfType([o().bool,o().oneOf(["sm","md","lg","xl","xxl"])]),keyboard:o().bool,onClose:o().func,onClosePrevented:o().func,onShow:o().func,portal:o().bool,scrollable:o().bool,size:o().oneOf(["sm","lg","xl"]),transition:o().bool,unmountOnClose:o().bool,visible:o().bool},p.displayName="CModal"},16323:(e,r,n)=>{"use strict";n.d(r,{T:()=>i});var l=n(22378),a=n(65043),s=n(65173),o=n.n(s),t=n(25196),i=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.className,o=(0,l.Tt)(e,["children","className"]);return a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal-body",s)},o,{ref:r}),n)}));i.propTypes={children:o().node,className:o().string},i.displayName="CModalBody"},85968:(e,r,n)=>{"use strict";n.d(r,{I:()=>i});var l=n(22378),a=n(65043),s=n(65173),o=n.n(s),t=n(25196),i=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.className,o=(0,l.Tt)(e,["children","className"]);return a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal-footer",s)},o,{ref:r}),n)}));i.propTypes={children:o().node,className:o().string},i.displayName="CModalFooter"},11418:(e,r,n)=>{"use strict";n.d(r,{E:()=>d});var l=n(22378),a=n(65043),s=n(65173),o=n.n(s),t=n(25196),i=(0,a.forwardRef)((function(e,r){var n=e.className,s=e.dark,o=e.disabled,i=e.white,c=(0,l.Tt)(e,["className","dark","disabled","white"]);return a.createElement("button",(0,l.Cl)({type:"button",className:(0,t.A)("btn","btn-close",{"btn-close-white":i},o,n),"aria-label":"Close",disabled:o},s&&{"data-coreui-theme":"dark"},c,{ref:r}))}));i.propTypes={className:o().string,dark:o().bool,disabled:o().bool,white:o().bool},i.displayName="CCloseButton";var c=n(4398),d=(0,a.forwardRef)((function(e,r){var n=e.children,s=e.className,o=e.closeButton,d=void 0===o||o,m=(0,l.Tt)(e,["children","className","closeButton"]),u=(0,a.useContext)(c.m).setVisible;return a.createElement("div",(0,l.Cl)({className:(0,t.A)("modal-header",s)},m,{ref:r}),n,d&&a.createElement(i,{onClick:function(){return u(!1)}}))}));d.propTypes={children:o().node,className:o().string,closeButton:o().bool},d.displayName="CModalHeader"},50477:()=>{}}]);
//# sourceMappingURL=267.26c6340b.chunk.js.map