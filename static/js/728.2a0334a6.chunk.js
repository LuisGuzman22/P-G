"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[728],{99349:(e,s,t)=>{t.d(s,{A:()=>p});t(65043);var c=t(4398),a=t(11418),l=t(89689),r=t(16323),n=t(81917),o=t(44101),i=t(44227),d=t(10825),x=t(85968),h=t(84709),j=t(70579);const p=e=>{const s=()=>{e.sendDataToParent(!1)};return(0,j.jsxs)(c.z,{scrollable:!0,visible:e.visible,onClose:()=>s(),"aria-labelledby":"ScrollingLongContentExampleLabel2",size:"xl",className:"project-creation-modal",children:[(0,j.jsx)(a.E,{children:(0,j.jsx)(l.l,{id:"ScrollingLongContentExampleLabel2",children:"A\xf1adir Contrato"})}),(0,j.jsx)(r.T,{children:(0,j.jsxs)(n.q,{children:[(0,j.jsxs)(o.s,{children:[(0,j.jsx)(i.U,{sm:6,children:(0,j.jsx)(d.O,{type:"text",id:"contractName",label:"Nombre",placeholder:"Nombre",text:"",onChange:e=>{}})}),(0,j.jsx)(i.U,{sm:6,children:(0,j.jsx)(d.O,{type:"text",id:"contractDetail",label:"Detalle",placeholder:"Detalle",text:""})})]}),(0,j.jsxs)(o.s,{children:[(0,j.jsx)(i.U,{sm:6,children:(0,j.jsx)(d.O,{type:"text",id:"contractUrl",label:"URL",placeholder:"URL",text:""})}),(0,j.jsxs)(i.U,{sm:6,children:[(0,j.jsx)(d.O,{type:"text",id:"contractPhone",label:"Tel\xe9fono",placeholder:"Tel\xe9fono",text:""})," "]})]}),(0,j.jsx)(o.s,{children:(0,j.jsx)(i.U,{sm:6,children:(0,j.jsx)(d.O,{type:"text",id:"contractMail",label:"Email",placeholder:"Email",text:""})})})]})}),(0,j.jsxs)(x.I,{children:[(0,j.jsx)(h.Q,{color:"secondary",onClick:()=>s(),children:"Cerrar"}),(0,j.jsx)(h.Q,{className:"btn-add",children:"A\xf1adir contrato"})]})]})}},52347:(e,s,t)=>{t.r(s),t.d(s,{default:()=>N});var c=t(65043),a=t(73216),l=t(44227),r=t(80861),n=t(64907),o=t(96105),i=t(23682),d=t(44101),x=t(30529),h=t(3526),j=t(35761),p=t(6145),m=t(36566);const u=e=>{const{data:s,isLoading:t,error:c}=(0,m.OZ)(e);return{data:s,isLoading:t,error:c}};t(27304);var b=t(49634),g=t(99349),v=t(70579);const N=()=>{const e=(0,a.Zp)(),{getProject:s,saveContract:t}=(0,j.A)(),[m,N]=(0,c.useState)(),[f,C]=(0,c.useState)(),{getData:U}=(0,b.A)(),y=U("projects"),A=localStorage.getItem("USER_TYPE"),{data:E,isLoading:L,error:S}=u(1),T=JSON.parse(s()),[D,k]=(0,c.useState)(!1);return(0,c.useEffect)((()=>{if("admin"!==A)if(T&&y){const e=y.find((e=>e.id===T.id));N(e),C(e.contracts)}else e("/project_selector")}),[y,T]),(0,c.useEffect)((()=>{"admin"===A&&(null===E||void 0===E?void 0:E.contract)&&C(E.contract)}),[E]),(0,v.jsxs)(v.Fragment,{children:[D&&(0,v.jsx)(g.A,{visible:!0,sendDataToParent:e=>{k(e)}}),(0,v.jsx)(l.U,{sm:6,className:"contract-selector-container",children:(0,v.jsxs)(r.E,{children:[(0,v.jsx)(n.Q,{children:(0,v.jsx)("h3",{children:"Seleccion de Contrato"})}),(0,v.jsx)(o.W,{children:(0,v.jsxs)(i.d,{children:[void 0===f&&(0,v.jsx)("h3",{children:"No se encontraron contratos asociados"}),f&&(null===f||void 0===f?void 0:f.map(((s,c)=>(0,v.jsx)(d.s,{children:(0,v.jsx)(l.U,{children:(0,v.jsx)(x.$,{onClick:()=>{(s=>{if("admin"!==A){const c={name:s.name,id:s.id};t(c),e("/dashboard")}else{const c={name:s.name,id:s.id};t(c),e("/project_selector")}})(s)},className:"mb-3",icon:(0,v.jsx)(p.A,{className:"my-4 text-white",icon:"https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg",height:52}),chart:(0,v.jsx)(h.T,{className:"project-selector-container",children:(0,v.jsx)(d.s,{children:(0,v.jsx)("span",{className:"project-title",children:s.name})})}),style:{"--cui-card-cap-bg":"#1A4D55",cursor:"pointer"},values:[{title:"Trisemanales",value:s.trisemanal},{title:"Avance",value:s.progress}]})})},c)))),(0,v.jsx)(d.s,{children:(0,v.jsx)(l.U,{children:(0,v.jsx)(x.$,{onClick:()=>{k(!D)},className:"mb-3",icon:(0,v.jsx)(p.A,{className:"my-4 text-white",icon:"https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg",height:52}),chart:(0,v.jsx)(h.T,{className:"project-selector-container",children:(0,v.jsx)(d.s,{children:(0,v.jsx)("span",{className:"project-title",children:"Crear nuevo contrato"})})}),style:{"--cui-card-cap-bg":"#1A4D55",cursor:"pointer"}})})},0)]})})]})})]})}}}]);
//# sourceMappingURL=728.2a0334a6.chunk.js.map