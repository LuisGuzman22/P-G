"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[834],{3181:(e,n,a)=>{a.d(n,{A:()=>v});var r=a(5043),c=a(4709),t=a(2378),i=a(5173),s=a.n(i),l=a(5196),o=a(7823),d=a(4462),u=(0,r.createContext)({}),m=(0,r.forwardRef)((function(e,n){var a=e.children,c=e.activeIndex,i=void 0===c?0:c,s=e.className,m=e.controls,h=e.dark,f=e.indicators,p=e.interval,v=void 0===p?5e3:p,x=e.onSlid,j=e.onSlide,b=e.pause,N=void 0===b?"hover":b,y=e.touch,g=void 0===y||y,C=e.transition,E=e.wrap,S=void 0===E||E,T=(0,t.Tt)(e,["children","activeIndex","className","controls","dark","indicators","interval","onSlid","onSlide","pause","touch","transition","wrap"]),k=(0,r.useRef)(null),w=(0,d.E2)(n,k),A=(0,r.useRef)({}).current,O=(0,r.useState)(i),I=O[0],B=O[1],P=(0,r.useState)(!1),R=P[0],D=P[1],H=(0,r.useState)(),L=H[0],K=H[1],M=(0,r.useState)("next"),Q=M[0],q=M[1],F=(0,r.useState)(0),U=F[0],W=F[1],G=(0,r.useState)(null),X=G[0],z=G[1],V=(0,r.useState)(),Y=V[0],Z=V[1];(0,r.useEffect)((function(){W(r.Children.toArray(a).length)})),(0,r.useEffect)((function(){Y&&_()}),[Y]),(0,r.useEffect)((function(){!R&&_(),!R&&x&&x(I,Q),R&&j&&j(I,Q)}),[R]),(0,r.useEffect)((function(){return window.addEventListener("scroll",ne),function(){window.removeEventListener("scroll",ne)}}));var _=function(){J(),(S||I!==U-1)&&"number"===typeof v&&(A.timeout=setTimeout((function(){return $()}),"number"===typeof L?L:v))},J=function(){return N&&A.timeout&&clearTimeout(A.timeout)},$=function(){if(!document.hidden&&k.current&&(0,o.A)(k.current)){if(R)return;ee("next")}},ee=function(e){R||(q(e),B("next"===e?I===U-1?0:I+1:0===I?U-1:I-1))},ne=function(){!document.hidden&&k.current&&(0,o.A)(k.current)?Z(!0):Z(!1)};return r.createElement("div",(0,t.Cl)({className:(0,l.A)("carousel slide",{"carousel-fade":"crossfade"===C},s)},h&&{"data-coreui-theme":"dark"},{onMouseEnter:J,onMouseLeave:_},g&&{onTouchStart:function(e){var n=e.touches[0].clientX;z(n)},onTouchMove:function(e){if(null!==X){var n=X-e.touches[0].clientX;n>5&&ee("next"),n<-5&&ee("prev"),z(null)}}},T,{ref:w}),r.createElement(u.Provider,{value:{setAnimating:D,setCustomInterval:K}},f&&r.createElement("div",{className:"carousel-indicators"},Array.from({length:U},(function(e,n){return n})).map((function(e){return r.createElement("button",(0,t.Cl)({key:"indicator".concat(e),onClick:function(){!R&&function(e){if(I!==e)I<e?(q("next"),B(e)):I>e&&(q("prev"),B(e))}(e)},className:(0,l.A)({active:I===e}),"data-coreui-target":""},I===e&&{"aria-current":!0},{"aria-label":"Slide ".concat(e+1)}))}))),r.createElement("div",{className:"carousel-inner"},r.Children.map(a,(function(e,n){if(r.isValidElement(e))return r.cloneElement(e,{active:I===n,direction:Q,key:n})}))),m&&r.createElement(r.Fragment,null,r.createElement("button",{className:"carousel-control-prev",onClick:function(){return ee("prev")}},r.createElement("span",{className:"carousel-control-prev-icon","aria-label":"prev"})),r.createElement("button",{className:"carousel-control-next",onClick:function(){return ee("next")}},r.createElement("span",{className:"carousel-control-next-icon","aria-label":"next"})))))}));m.propTypes={activeIndex:s().number,children:s().node,className:s().string,controls:s().bool,dark:s().bool,indicators:s().bool,interval:s().oneOfType([s().bool,s().number]),onSlid:s().func,onSlide:s().func,pause:s().oneOf([!1,"hover"]),touch:s().bool,transition:s().oneOf(["slide","crossfade"]),wrap:s().bool},m.displayName="CCarousel";var h=(0,r.forwardRef)((function(e,n){var a=e.children,c=e.className,i=e.active,s=e.direction,o=e.interval,m=void 0!==o&&o,h=(0,t.Tt)(e,["children","className","active","direction","interval"]),f=(0,r.useContext)(u),p=f.setAnimating,v=f.setCustomInterval,x=(0,r.useRef)(null),j=(0,d.E2)(n,x),b=(0,r.useRef)(),N=(0,r.useState)(),y=N[0],g=N[1],C=(0,r.useState)(),E=C[0],S=C[1],T=(0,r.useState)(i&&"active"),k=T[0],w=T[1],A=(0,r.useState)(0),O=A[0],I=A[1];return(0,r.useEffect)((function(){i&&(v(m),0!==O&&S("carousel-item-".concat(s))),b.current&&!i&&w("active"),(i||b.current)&&setTimeout((function(){var e;0!==O&&(null===(e=x.current)||void 0===e||e.offsetHeight,g("carousel-item-".concat("next"===s?"start":"end")))}),0),b.current=i,0===O&&I(O+1)}),[i]),(0,r.useEffect)((function(){var e,n;return null===(e=x.current)||void 0===e||e.addEventListener("transitionstart",(function(){i&&p(!0)})),null===(n=x.current)||void 0===n||n.addEventListener("transitionend",(function(){i&&p(!1),g(""),S(""),i&&w("active"),i||w("")})),function(){var e,n;null===(e=x.current)||void 0===e||e.removeEventListener("transitionstart",(function(){i&&p(!0)})),null===(n=x.current)||void 0===n||n.removeEventListener("transitionend",(function(){i&&p(!1),g(""),S(""),i&&w("active"),i||w("")}))}})),r.createElement("div",(0,t.Cl)({className:(0,l.A)("carousel-item",k,y,E,c),ref:j},h),a)}));h.propTypes={active:s().bool,children:s().node,className:s().string,direction:s().string,interval:s().oneOfType([s().bool,s().number])},h.displayName="CCarouselItem";var f=a(2303),p=a(579);const v=()=>(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(c.Q,{children:"Inicio seguro de SSO"}),(0,p.jsxs)(m,{controls:!0,indicators:!0,children:[(0,p.jsx)(h,{children:(0,p.jsx)(f.t,{className:"d-block w-100",src:"https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg",alt:"slide 1"})}),(0,p.jsx)(h,{children:(0,p.jsx)(f.t,{className:"d-block w-100",src:"https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg",alt:"slide 2"})}),(0,p.jsx)(h,{children:(0,p.jsx)(f.t,{className:"d-block w-100",src:"https://coreui.io/react/docs/static/angular-2f3764e2ec8b0b47ebe68f2f80260ef1.jpg",alt:"slide 3"})})]}),(0,p.jsx)(c.Q,{children:"Subir Imagen"})]})},8228:(e,n,a)=>{a(5043),a(3181),a(6339),a(5817),a(579)},6339:(e,n,a)=>{a.d(n,{A:()=>H});var r=a(5043),c=a(2378),t=a(5173),i=a.n(t),s=a(5196),l=(0,r.forwardRef)((function(e,n){var a,t=e.children,i=e.as,l=void 0===i?"ul":i,o=e.className,d=e.layout,u=e.variant,m=(0,c.Tt)(e,["children","as","className","layout","variant"]);return r.createElement(l,(0,c.Cl)({className:(0,s.A)("nav",(a={},a["nav-".concat(d)]=d,a["nav-".concat(u)]=u,a),o),role:"navigation"},m,{ref:n}),t)}));l.propTypes={as:i().elementType,children:i().node,className:i().string,layout:i().oneOf(["fill","justified"]),variant:i().oneOf(["pills","tabs","underline","underline-border"])},l.displayName="CNav";var o=a(7483),d=(0,r.forwardRef)((function(e,n){var a=e.children,t=e.className,i=(0,c.Tt)(e,["children","className"]);return r.createElement("div",(0,c.Cl)({className:(0,s.A)("tab-content",t)},i,{ref:n}),a)}));d.propTypes={children:i().node,className:i().string},d.displayName="CTabContent";var u=a(4462),m=a(413),h=(0,r.forwardRef)((function(e,n){var a=e.children,t=e.className,i=e.onHide,l=e.onShow,o=e.visible,d=(0,c.Tt)(e,["children","className","onHide","onShow","visible"]),h=(0,r.useRef)(),f=(0,u.E2)(n,h);return r.createElement(m.Ay,{in:o,nodeRef:h,onEnter:l,onExit:i,timeout:150},(function(e){return r.createElement("div",(0,c.Cl)({className:(0,s.A)("tab-pane","fade",{active:o,show:"entered"===e},t)},d,{ref:f}),a)}))}));h.propTypes={children:i().node,className:i().string,onHide:i().func,onShow:i().func,visible:i().bool},h.displayName="CTabPane";a(8228);var f=a(579);const p=()=>(0,f.jsx)(f.Fragment,{children:"DashboardPanel "});a(7481);var v=a(2303),x=a(5232),j=(0,r.forwardRef)((function(e,n){var a,t=e.children,i=e.className,l=e.color,o=(0,c.Tt)(e,["children","className","color"]);return r.createElement("div",(0,c.Cl)({className:(0,s.A)("callout",(a={},a["callout-".concat(l)]=l,a),i)},o,{ref:n}),t)}));j.propTypes={children:i().node,className:i().string,color:x.TX},j.displayName="CCallout";const b=()=>(0,f.jsxs)("div",{className:"project-description",children:[(0,f.jsx)("h2",{children:"Descripci\xf3n del proyecto"}),(0,f.jsx)("div",{className:"project-img-container",children:(0,f.jsx)(v.t,{fluid:!0,src:"https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg"})}),(0,f.jsx)(j,{color:"danger",children:"Las estaciones de Bombeo EB-01, EB-02 y EB-03 incorporaci\xf3n de medidas de tensi\xf3n para el sistema de informaci\xf3n en tiempo real (SITR), obteniendo valores de potencia activa, potencia reactiva y frecuencia, datos que deben ser enviados al coordinador El\xe9ctrico Nacional (CEN) e incorporar un esquema de medida con fines de facturaci\xf3n para clientes internos de MCEN y conectarlos a la red Ethernet existente. Las capacidades actuales de los TT/CC de MCEN se encuentran copadas, no permitiendo su uso para los requerimientos de este proyecto, adem\xe1s la clase de medida actual (0,6), no permite una medici\xf3n confiable de los par\xe1metros del sistema como exige la Norma, la soluci\xf3n a este inconveniente se traduce en la instalaci\xf3n de transformadores combinados de corriente y tensi\xf3n."})]});var N=a(4709);const y=()=>(0,f.jsx)("div",{className:"skynav",children:(0,f.jsx)(N.Q,{children:"Ir a SKYNAV"})});var g=a(4101),C=a(4227),E=a(861),S=a(6105),T=a(3682),k=a(6482),w=a(6122),A=a(2717),O=a(3127),I=(0,r.forwardRef)((function(e,n){var a=e.children,t=e.as,i=void 0===t?"h5":t,l=e.className,o=(0,c.Tt)(e,["children","as","className"]);return r.createElement(i,(0,c.Cl)({className:(0,s.A)("card-title",l)},o,{ref:n}),a)}));I.propTypes={as:i().elementType,children:i().node,className:i().string},I.displayName="CCardTitle";const B=()=>(0,f.jsxs)("div",{className:"technicalDocumentation",children:[(0,f.jsx)("h2",{children:"Documentaci\xf3n t\xe9cnica"}),(0,f.jsxs)(g.s,{children:[(0,f.jsx)(C.U,{sm:8,children:(0,f.jsx)(E.E,{children:(0,f.jsx)(S.W,{children:(0,f.jsx)(T.d,{children:(0,f.jsxs)(k.E,{activeItemKey:1,children:[(0,f.jsxs)(w.l,{itemKey:1,children:[(0,f.jsx)(A.B,{children:"Ingenier\xeda"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]}),(0,f.jsxs)(w.l,{itemKey:2,children:[(0,f.jsx)(A.B,{children:"Planificaci\xf3n y control"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]}),(0,f.jsxs)(w.l,{itemKey:3,children:[(0,f.jsx)(A.B,{children:"Contratos"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]})]})})})})}),(0,f.jsx)(C.U,{sm:4,children:(0,f.jsx)(E.E,{className:"actions-card",children:(0,f.jsxs)(S.W,{children:[(0,f.jsx)(I,{children:"Acciones"}),(0,f.jsxs)(T.d,{children:[(0,f.jsx)(g.s,{children:(0,f.jsx)(N.Q,{children:"Cargar adjunto"})}),(0,f.jsx)(g.s,{children:(0,f.jsx)(N.Q,{children:"Ir a ACONEX"})})]})]})})})]})]}),P=()=>(0,f.jsxs)("div",{className:"turnOverPackage",children:[(0,f.jsx)("h2",{children:"Turn Over Package"}),(0,f.jsxs)(g.s,{children:[(0,f.jsx)(C.U,{sm:8,children:(0,f.jsx)(E.E,{children:(0,f.jsx)(S.W,{children:(0,f.jsx)(T.d,{children:(0,f.jsxs)(k.E,{activeItemKey:1,children:[(0,f.jsxs)(w.l,{itemKey:1,children:[(0,f.jsx)(A.B,{children:"Ingenier\xeda"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]}),(0,f.jsxs)(w.l,{itemKey:2,children:[(0,f.jsx)(A.B,{children:"Planificaci\xf3n y control"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]}),(0,f.jsxs)(w.l,{itemKey:3,children:[(0,f.jsx)(A.B,{children:"Contratos"}),(0,f.jsx)(O.i,{children:"- Protocolo de Comunicaci\xf3n EB-01.jpeg (Documentaci\xf3n SSO)"})]})]})})})})}),(0,f.jsx)(C.U,{sm:4,children:(0,f.jsx)(E.E,{className:"actions-card",children:(0,f.jsxs)(S.W,{children:[(0,f.jsx)(I,{children:"Acciones"}),(0,f.jsxs)(T.d,{children:[(0,f.jsx)(g.s,{children:(0,f.jsx)(N.Q,{children:"Cargar adjunto"})}),(0,f.jsx)(g.s,{children:(0,f.jsx)(N.Q,{children:"Exportar adjunto"})})]})]})})})]})]}),R=()=>(0,f.jsx)("div",{className:"teamChat",children:(0,f.jsx)("h2",{children:"Chat de equipo"})}),D=()=>(0,f.jsx)(f.Fragment,{children:"P.I.E. "}),H=()=>{const[e,n]=(0,r.useState)(1);return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsxs)(l,{variant:"tabs",children:[(0,f.jsx)(o.H,{active:1===e,"aria-selected":1===e,onClick:()=>{n(1)},children:"Dashboard"}),(0,f.jsx)(o.H,{active:2===e,"aria-selected":2===e,onClick:()=>{n(2)},children:"Descripci\xf3n del proyecto"}),(0,f.jsx)(o.H,{active:3===e,"aria-selected":3===e,onClick:()=>{n(3)},children:"SKYNAV"}),(0,f.jsx)(o.H,{active:4===e,"aria-selected":4===e,onClick:()=>{n(4)},children:"Documentaci\xf3n t\xe9cnica"}),(0,f.jsx)(o.H,{active:5===e,"aria-selected":5===e,onClick:()=>{n(5)},children:"Cumplimiento P.I.E."}),(0,f.jsx)(o.H,{active:6===e,"aria-selected":6===e,onClick:()=>{n(6)},children:"Turn Over Package"}),(0,f.jsx)(o.H,{active:7===e,"aria-selected":7===e,onClick:()=>{n(7)},children:"Chat de equipo"})]}),(0,f.jsxs)(d,{children:[(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"home-tab-pane",visible:1===e,children:(0,f.jsx)(p,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"profile-tab-pane",visible:2===e,children:(0,f.jsx)(b,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"contact-tab-pane",visible:3===e,children:(0,f.jsx)(y,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"contact-tab-pane",visible:4===e,children:(0,f.jsx)(B,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"contact-tab-pane",visible:5===e,children:(0,f.jsx)(D,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"contact-tab-pane",visible:6===e,children:(0,f.jsx)(P,{})}),(0,f.jsx)(h,{role:"tabpanel","aria-labelledby":"contact-tab-pane",visible:7===e,children:(0,f.jsx)(R,{})})]})]})}},7481:(e,n,a)=>{a.r(n),a.d(n,{default:()=>h});a(5043);var r=a(3526),c=a(4101),t=a(4227),i=a(5504),s=a(347),l=a(825),o=a(4709),d=a(6145),u=a(1369),m=a(579);const h=()=>(0,m.jsx)("div",{className:"bg-body-tertiary min-vh-100 d-flex flex-row align-items-center",children:(0,m.jsx)(r.T,{children:(0,m.jsx)(c.s,{className:"justify-content-center",children:(0,m.jsxs)(t.U,{md:6,children:[(0,m.jsxs)("div",{className:"clearfix",children:[(0,m.jsx)("h1",{className:"float-start display-3 me-4",children:"404"}),(0,m.jsxs)("h4",{className:"pt-3",children:["Oops! You","'","re lost."]}),(0,m.jsx)("p",{className:"text-body-secondary float-start",children:"The page you are looking for was not found."})]}),(0,m.jsxs)(i.B,{className:"input-prepend",children:[(0,m.jsx)(s.s,{children:(0,m.jsx)(d.A,{icon:u.S})}),(0,m.jsx)(l.O,{type:"text",placeholder:"What are you looking for?"}),(0,m.jsx)(o.Q,{color:"info",children:"Search"})]})]})})})})},1369:(e,n,a)=>{a.d(n,{S:()=>r});var r=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z' class='ci-primary'/>"]},5504:(e,n,a)=>{a.d(n,{B:()=>l});var r=a(2378),c=a(5043),t=a(5173),i=a.n(t),s=a(5196),l=(0,c.forwardRef)((function(e,n){var a,t=e.children,i=e.className,l=e.size,o=(0,r.Tt)(e,["children","className","size"]);return c.createElement("div",(0,r.Cl)({className:(0,s.A)("input-group",(a={},a["input-group-".concat(l)]=l,a),i)},o,{ref:n}),t)}));l.propTypes={children:i().node,className:i().string,size:i().oneOf(["sm","lg"])},l.displayName="CInputGroup"},347:(e,n,a)=>{a.d(n,{s:()=>l});var r=a(2378),c=a(5043),t=a(5173),i=a.n(t),s=a(5196),l=(0,c.forwardRef)((function(e,n){var a=e.children,t=e.as,i=void 0===t?"span":t,l=e.className,o=(0,r.Tt)(e,["children","as","className"]);return c.createElement(i,(0,r.Cl)({className:(0,s.A)("input-group-text",l)},o,{ref:n}),a)}));l.propTypes={as:i().elementType,children:i().node,className:i().string},l.displayName="CInputGroupText"},2303:(e,n,a)=>{a.d(n,{t:()=>l});var r=a(2378),c=a(5043),t=a(5173),i=a.n(t),s=a(5196),l=(0,c.forwardRef)((function(e,n){var a,t=e.align,i=e.className,l=e.fluid,o=e.rounded,d=e.thumbnail,u=(0,r.Tt)(e,["align","className","fluid","rounded","thumbnail"]);return c.createElement("img",(0,r.Cl)({className:(0,s.A)((a={},a["float-".concat(t)]=t&&("start"===t||"end"===t),a["d-block mx-auto"]=t&&"center"===t,a["img-fluid"]=l,a.rounded=o,a["img-thumbnail"]=d,a),i)||void 0},u,{ref:n}))}));l.propTypes={align:i().oneOf(["start","center","end"]),className:i().string,fluid:i().bool,rounded:i().bool,thumbnail:i().bool},l.displayName="CImage"}}]);
//# sourceMappingURL=834.dcec22bc.chunk.js.map