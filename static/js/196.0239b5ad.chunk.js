"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[196],{36566:(e,a,r)=>{r.d(a,{MS:()=>i,OZ:()=>c,XU:()=>d,b:()=>n,ny:()=>o});var s=r(92535),t=r(77154);localStorage.getItem("USER_TYPE");const n=e=>(0,s.I)({queryKey:["projects"],refetchType:"all",refetchOnWindowFocus:!0,queryFn:async()=>(async e=>(await t.A.get("https://pyg-production.up.railway.app/api/v1/projects",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})).data.data)()}),c=e=>(0,s.I)({queryKey:["contracts"],refetchType:"all",queryFn:async()=>(async e=>(await t.A.get("https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/")).data.data)()}),i=e=>(0,s.I)({queryKey:["basics"],staleTime:0,gcTime:2147483647,refetchType:"all",queryFn:async()=>(async e=>(await t.A.get("https://pyg-production.up.railway.app/api/v1/basicData",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})).data.data)()}),d=()=>(0,s.I)({queryKey:["users"],refetchType:"all",queryFn:async()=>(async()=>(await t.A.get("https://b4b07e25f42d4135b6fc3791a6e1d1f8.api.mockbin.io/")).data.data)()}),o=()=>(0,s.I)({queryKey:["reports"],staleTime:0,gcTime:2147483647,refetchType:"all",queryFn:async()=>(async()=>(await t.A.get("https://pyg-production.up.railway.app/api/v1/reports",{headers:{Authorization:"Bearer "+localStorage.getItem("token")}})).data.data)()})},59196:(e,a,r)=>{r.r(a),r.d(a,{default:()=>f});var s=r(65043),t=r(4082),n=r(80861),c=r(25104),i=r(96105),d=r(23682),o=r(44101),l=r(44227),h=r(84709),p=r(73216),j=r(322),x=r(35761),y=r(36566),m=r(49634);const u=e=>{const{data:a,isLoading:r,error:s}=(0,y.MS)(e);return{data:a,isLoading:r,error:s}};var g=r(84998),b=r(70579);const f=()=>{let e=(0,p.Zp)();const{getProject:a,getContract:r}=(0,x.A)(),{clearData:f}=(0,g.A)(),A=JSON.parse(a()),k=JSON.parse(r()),{data:I,isLoading:T,error:v}=u(k.id),{getData:w}=(0,m.A)();(0,y.ny)();const S=w("reports");(0,s.useEffect)((()=>{localStorage.removeItem("daily_report"),f()}),[]),(0,s.useEffect)((()=>{A&&k||e("/project_selector")}),[A,k]);const q=a=>{e(a)};return(0,b.jsxs)("div",{className:"dashboard",children:[(0,b.jsxs)(n.E,{children:[(0,b.jsx)(c.V,{children:"Panel Informativo"}),(0,b.jsx)(i.W,{children:(0,b.jsx)(d.d,{children:(0,b.jsx)(t.A,{})})})]}),S&&S.length>0&&(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("br",{}),(0,b.jsx)(n.E,{children:(0,b.jsx)(i.W,{children:(0,b.jsx)(d.d,{children:(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)("span",{children:["Tienes ",S.length," informes diarios generados."]}),(0,b.jsx)(o.s,{children:S.map((e=>(0,b.jsx)(b.Fragment,{children:(0,b.jsx)(l.U,{children:(0,b.jsx)(h.Q,{className:"dashboard-button",onClick:()=>{localStorage.setItem("daily_report",e.id),q("/informe-diario/edit")},children:e.id})})})))})]})})})})]}),(0,b.jsx)("br",{}),(0,b.jsx)(n.E,{children:(0,b.jsx)(i.W,{children:(0,b.jsx)(d.d,{children:(0,b.jsx)(j.A,{})})})}),(0,b.jsx)("br",{}),(0,b.jsx)(n.E,{children:(0,b.jsx)(i.W,{children:(0,b.jsx)(d.d,{children:(0,b.jsxs)("div",{children:[(0,b.jsxs)(o.s,{children:[(0,b.jsx)(l.U,{sm:4,children:(0,b.jsx)(h.Q,{className:"dashboard-button",onClick:()=>{q("/informe-diario")},children:"Informe Diario"})}),(0,b.jsx)(l.U,{sm:4,children:(0,b.jsx)(h.Q,{className:"dashboard-button",onClick:()=>{q("/trisemanal")},children:"Trisemanal"})}),(0,b.jsx)(l.U,{sm:4,children:(0,b.jsx)(h.Q,{className:"dashboard-button",onClick:()=>{q("/carta-gantt")},children:"Carta Gantt"})})]}),(0,b.jsxs)(o.s,{children:[(0,b.jsx)(l.U,{sm:4,children:(0,b.jsx)(h.Q,{className:"dashboard-button",onClick:()=>{q("/avance")},children:"Avance"})}),(0,b.jsx)(l.U,{sm:4,children:(0,b.jsx)(h.Q,{className:"dashboard-button",children:"TOP NO+PAPEL"})}),(0,b.jsx)(l.U,{sm:4})]})]})})})})]})}}}]);
//# sourceMappingURL=196.0239b5ad.chunk.js.map