"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[347],{4082:(e,n,t)=>{t.d(n,{A:()=>b});var r=t(65043),a=t(84709),c=t(22378),o=t(65173),i=t.n(o),l=t(25196),s=t(57823),d=t(94462),u=(0,r.createContext)({}),m=(0,r.forwardRef)((function(e,n){var t=e.children,a=e.activeIndex,o=void 0===a?0:a,i=e.className,m=e.controls,f=e.dark,v=e.indicators,p=e.interval,h=void 0===p?5e3:p,N=e.onSlid,b=e.onSlide,x=e.pause,C=void 0===x?"hover":x,E=e.touch,g=void 0===E||E,y=e.transition,T=e.wrap,S=void 0===T||T,w=(0,c.Tt)(e,["children","activeIndex","className","controls","dark","indicators","interval","onSlid","onSlide","pause","touch","transition","wrap"]),j=(0,r.useRef)(null),k=(0,d.E2)(n,j),A=(0,r.useRef)({}).current,R=(0,r.useState)(o),I=R[0],L=R[1],O=(0,r.useState)(!1),P=O[0],F=O[1],M=(0,r.useState)(),V=M[0],X=M[1],G=(0,r.useState)("next"),H=G[0],Q=G[1],W=(0,r.useState)(0),_=W[0],B=W[1],q=(0,r.useState)(null),z=q[0],D=q[1],J=(0,r.useState)(),K=J[0],U=J[1];(0,r.useEffect)((function(){B(r.Children.toArray(t).length)})),(0,r.useEffect)((function(){K&&Y()}),[K]),(0,r.useEffect)((function(){!P&&Y(),!P&&N&&N(I,H),P&&b&&b(I,H)}),[P]),(0,r.useEffect)((function(){return window.addEventListener("scroll",ne),function(){window.removeEventListener("scroll",ne)}}));var Y=function(){Z(),(S||I!==_-1)&&"number"===typeof h&&(A.timeout=setTimeout((function(){return $()}),"number"===typeof V?V:h))},Z=function(){return C&&A.timeout&&clearTimeout(A.timeout)},$=function(){if(!document.hidden&&j.current&&(0,s.A)(j.current)){if(P)return;ee("next")}},ee=function(e){P||(Q(e),L("next"===e?I===_-1?0:I+1:0===I?_-1:I-1))},ne=function(){!document.hidden&&j.current&&(0,s.A)(j.current)?U(!0):U(!1)};return r.createElement("div",(0,c.Cl)({className:(0,l.A)("carousel slide",{"carousel-fade":"crossfade"===y},i)},f&&{"data-coreui-theme":"dark"},{onMouseEnter:Z,onMouseLeave:Y},g&&{onTouchStart:function(e){var n=e.touches[0].clientX;D(n)},onTouchMove:function(e){if(null!==z){var n=z-e.touches[0].clientX;n>5&&ee("next"),n<-5&&ee("prev"),D(null)}}},w,{ref:k}),r.createElement(u.Provider,{value:{setAnimating:F,setCustomInterval:X}},v&&r.createElement("div",{className:"carousel-indicators"},Array.from({length:_},(function(e,n){return n})).map((function(e){return r.createElement("button",(0,c.Cl)({key:"indicator".concat(e),onClick:function(){!P&&function(e){if(I!==e)I<e?(Q("next"),L(e)):I>e&&(Q("prev"),L(e))}(e)},className:(0,l.A)({active:I===e}),"data-coreui-target":""},I===e&&{"aria-current":!0},{"aria-label":"Slide ".concat(e+1)}))}))),r.createElement("div",{className:"carousel-inner"},r.Children.map(t,(function(e,n){if(r.isValidElement(e))return r.cloneElement(e,{active:I===n,direction:H,key:n})}))),m&&r.createElement(r.Fragment,null,r.createElement("button",{className:"carousel-control-prev",onClick:function(){return ee("prev")}},r.createElement("span",{className:"carousel-control-prev-icon","aria-label":"prev"})),r.createElement("button",{className:"carousel-control-next",onClick:function(){return ee("next")}},r.createElement("span",{className:"carousel-control-next-icon","aria-label":"next"})))))}));m.propTypes={activeIndex:i().number,children:i().node,className:i().string,controls:i().bool,dark:i().bool,indicators:i().bool,interval:i().oneOfType([i().bool,i().number]),onSlid:i().func,onSlide:i().func,pause:i().oneOf([!1,"hover"]),touch:i().bool,transition:i().oneOf(["slide","crossfade"]),wrap:i().bool},m.displayName="CCarousel";var f=(0,r.forwardRef)((function(e,n){var t=e.children,a=e.className,o=e.active,i=e.direction,s=e.interval,m=void 0!==s&&s,f=(0,c.Tt)(e,["children","className","active","direction","interval"]),v=(0,r.useContext)(u),p=v.setAnimating,h=v.setCustomInterval,N=(0,r.useRef)(null),b=(0,d.E2)(n,N),x=(0,r.useRef)(),C=(0,r.useState)(),E=C[0],g=C[1],y=(0,r.useState)(),T=y[0],S=y[1],w=(0,r.useState)(o&&"active"),j=w[0],k=w[1],A=(0,r.useState)(0),R=A[0],I=A[1];return(0,r.useEffect)((function(){o&&(h(m),0!==R&&S("carousel-item-".concat(i))),x.current&&!o&&k("active"),(o||x.current)&&setTimeout((function(){var e;0!==R&&(null===(e=N.current)||void 0===e||e.offsetHeight,g("carousel-item-".concat("next"===i?"start":"end")))}),0),x.current=o,0===R&&I(R+1)}),[o]),(0,r.useEffect)((function(){var e,n;return null===(e=N.current)||void 0===e||e.addEventListener("transitionstart",(function(){o&&p(!0)})),null===(n=N.current)||void 0===n||n.addEventListener("transitionend",(function(){o&&p(!1),g(""),S(""),o&&k("active"),o||k("")})),function(){var e,n;null===(e=N.current)||void 0===e||e.removeEventListener("transitionstart",(function(){o&&p(!0)})),null===(n=N.current)||void 0===n||n.removeEventListener("transitionend",(function(){o&&p(!1),g(""),S(""),o&&k("active"),o||k("")}))}})),r.createElement("div",(0,c.Cl)({className:(0,l.A)("carousel-item",j,E,T,a),ref:b},f),t)}));f.propTypes={active:i().bool,children:i().node,className:i().string,direction:i().string,interval:i().oneOfType([i().bool,i().number])},f.displayName="CCarouselItem";var v=t(52303);const p=t.p+"static/media/organigrama-canal-contorno.2df95cf78b21d3776289.jpeg",h=t.p+"static/media/organigrama-ruta-oriente.1d27a4c04f68cf4bcec2.jpeg";var N=t(70579);const b=()=>(0,N.jsxs)(N.Fragment,{children:[(0,N.jsx)(a.Q,{children:"Inicio seguro de SSO"}),(0,N.jsxs)(m,{controls:!0,indicators:!0,children:[(0,N.jsx)(f,{children:(0,N.jsx)(v.t,{className:"d-block w-100",src:p,alt:"slide 1"})}),(0,N.jsx)(f,{children:(0,N.jsx)(v.t,{className:"d-block w-100",src:h,alt:"slide 1"})})]}),(0,N.jsx)(a.Q,{children:"Subir Imagen"})]})},74712:(e,n,t)=>{t.r(n),t.d(n,{default:()=>s});t(65043);var r=t(4082),a=t(80861),c=t(25104),o=t(96105),i=t(23682),l=t(70579);const s=()=>(0,l.jsx)(l.Fragment,{children:(0,l.jsxs)(a.E,{children:[(0,l.jsx)(c.V,{children:"Panel Informativo"}),(0,l.jsx)(o.W,{children:(0,l.jsx)(i.d,{children:(0,l.jsx)(r.A,{})})})]})})},80861:(e,n,t)=>{t.d(n,{E:()=>s});var r=t(22378),a=t(65043),c=t(65173),o=t.n(c),i=t(25196),l=t(75232),s=(0,a.forwardRef)((function(e,n){var t,c=e.children,o=e.className,l=e.color,s=e.textColor,d=(0,r.Tt)(e,["children","className","color","textColor"]);return a.createElement("div",(0,r.Cl)({className:(0,i.A)("card",(t={},t["bg-".concat(l)]=l,t["text-".concat(s)]=s,t),o)},d,{ref:n}),c)}));s.propTypes={children:o().node,className:o().string,color:l.TX,textColor:o().string},s.displayName="CCard"},96105:(e,n,t)=>{t.d(n,{W:()=>l});var r=t(22378),a=t(65043),c=t(65173),o=t.n(c),i=t(25196),l=(0,a.forwardRef)((function(e,n){var t=e.children,c=e.className,o=(0,r.Tt)(e,["children","className"]);return a.createElement("div",(0,r.Cl)({className:(0,i.A)("card-body",c)},o,{ref:n}),t)}));l.propTypes={children:o().node,className:o().string},l.displayName="CCardBody"},25104:(e,n,t)=>{t.d(n,{V:()=>l});var r=t(22378),a=t(65043),c=t(65173),o=t.n(c),i=t(25196),l=(0,a.forwardRef)((function(e,n){var t=e.children,c=e.as,o=void 0===c?"div":c,l=e.className,s=(0,r.Tt)(e,["children","as","className"]);return a.createElement(o,(0,r.Cl)({className:(0,i.A)("card-header",l)},s,{ref:n}),t)}));l.propTypes={as:o().elementType,children:o().node,className:o().string},l.displayName="CCardHeader"},23682:(e,n,t)=>{t.d(n,{d:()=>l});var r=t(22378),a=t(65043),c=t(65173),o=t.n(c),i=t(25196),l=(0,a.forwardRef)((function(e,n){var t=e.children,c=e.as,o=void 0===c?"p":c,l=e.className,s=(0,r.Tt)(e,["children","as","className"]);return a.createElement(o,(0,r.Cl)({className:(0,i.A)("card-text",l)},s,{ref:n}),t)}));l.propTypes={as:o().elementType,children:o().node,className:o().string},l.displayName="CCardText"},52303:(e,n,t)=>{t.d(n,{t:()=>l});var r=t(22378),a=t(65043),c=t(65173),o=t.n(c),i=t(25196),l=(0,a.forwardRef)((function(e,n){var t,c=e.align,o=e.className,l=e.fluid,s=e.rounded,d=e.thumbnail,u=(0,r.Tt)(e,["align","className","fluid","rounded","thumbnail"]);return a.createElement("img",(0,r.Cl)({className:(0,i.A)((t={},t["float-".concat(c)]=c&&("start"===c||"end"===c),t["d-block mx-auto"]=c&&"center"===c,t["img-fluid"]=l,t.rounded=s,t["img-thumbnail"]=d,t),o)||void 0},u,{ref:n}))}));l.propTypes={align:o().oneOf(["start","center","end"]),className:o().string,fluid:o().bool,rounded:o().bool,thumbnail:o().bool},l.displayName="CImage"}}]);
//# sourceMappingURL=347.e8647c2f.chunk.js.map