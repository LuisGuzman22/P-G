"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[196],{36566:(a,e,s)=>{s.d(e,{MS:()=>i,OZ:()=>c,XU:()=>d,b:()=>n,ny:()=>l});var r=s(92535),t=s(77154);localStorage.getItem("USER_TYPE");const n=a=>(0,r.I)({queryKey:["projects"],refetchType:"all",refetchOnWindowFocus:!0,queryFn:async()=>(async a=>(await t.A.get("https://pyg-production.up.railway.app/api/v1/projects")).data.data)()}),c=a=>(0,r.I)({queryKey:["contracts"],refetchType:"all",queryFn:async()=>(async a=>(await t.A.get("https://2b3570b8072a44e09ce5b5a80a4c8012.api.mockbin.io/")).data.data)()}),i=a=>(0,r.I)({queryKey:["basics"],staleTime:0,gcTime:2147483647,refetchType:"all",queryFn:async()=>(async a=>(await t.A.get("https://ad66ae1fb4124d5d84a95b384d69a128.api.mockbin.io/")).data.data)()}),d=()=>(0,r.I)({queryKey:["users"],refetchType:"all",queryFn:async()=>(async()=>(await t.A.get("https://b4b07e25f42d4135b6fc3791a6e1d1f8.api.mockbin.io/")).data.data)()}),l=()=>(0,r.I)({queryKey:["reports"],staleTime:0,gcTime:2147483647,refetchType:"all",queryFn:async()=>(async()=>(await t.A.get("https://pyg-production.up.railway.app/api/v1/reports")).data.data)()})},59196:(a,e,s)=>{s.r(e),s.d(e,{default:()=>g});var r=s(65043),t=s(4082),n=s(80861),c=s(25104),i=s(96105),d=s(23682),l=s(44101),o=s(84709),h=s(44227),j=s(73216),p=s(322),x=s(35761),y=s(36566),m=s(49634);const b=a=>{const{data:e,isLoading:s,error:r}=(0,y.MS)(a);return{data:e,isLoading:s,error:r}};var u=s(70579);const g=()=>{let a=(0,j.Zp)();const{getProject:e,getContract:s}=(0,x.A)(),g=JSON.parse(e()),f=JSON.parse(s()),{data:T,isLoading:k,error:A}=b(f.id),{getData:q}=(0,m.A)();(0,y.ny)();const v=q("reports");(0,r.useEffect)((()=>{g&&f||a("/project_selector")}),[g,f]);const w=e=>{a(e)};return(0,u.jsxs)("div",{className:"dashboard",children:[(0,u.jsxs)(n.E,{children:[(0,u.jsx)(c.V,{children:"Panel Informativo"}),(0,u.jsx)(i.W,{children:(0,u.jsx)(d.d,{children:(0,u.jsx)(t.A,{})})})]}),"admin"===localStorage.getItem("USER_TYPE")&&v&&v.length>0&&(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)("br",{}),(0,u.jsx)(n.E,{children:(0,u.jsx)(i.W,{children:(0,u.jsx)(d.d,{children:(0,u.jsxs)(u.Fragment,{children:[(0,u.jsxs)("span",{children:["Tienes ",v.length," informes diarios por firmar."]}),v.map((a=>(0,u.jsx)(u.Fragment,{children:(0,u.jsx)(l.s,{children:(0,u.jsx)(o.Q,{className:"dashboard-button",onClick:()=>{localStorage.setItem("daily_report",a.id),w("/informe-diario/edit")},children:a.id})})})))]})})})})]}),(0,u.jsx)("br",{}),(0,u.jsx)(n.E,{children:(0,u.jsx)(i.W,{children:(0,u.jsx)(d.d,{children:(0,u.jsx)(p.A,{})})})}),(0,u.jsx)("br",{}),(0,u.jsx)(n.E,{children:(0,u.jsx)(i.W,{children:(0,u.jsx)(d.d,{children:(0,u.jsxs)("div",{children:[(0,u.jsxs)(l.s,{children:[(0,u.jsx)(h.U,{sm:4,children:(0,u.jsx)(o.Q,{className:"dashboard-button",onClick:()=>{w("/informe-diario")},children:"Informe Diario"})}),(0,u.jsx)(h.U,{sm:4,children:(0,u.jsx)(o.Q,{className:"dashboard-button",onClick:()=>{w("/trisemanal")},children:"Trisemanal"})}),(0,u.jsx)(h.U,{sm:4,children:(0,u.jsx)(o.Q,{className:"dashboard-button",onClick:()=>{w("/carta-gantt")},children:"Carta Gantt"})})]}),(0,u.jsxs)(l.s,{children:[(0,u.jsx)(h.U,{sm:4,children:(0,u.jsx)(o.Q,{className:"dashboard-button",onClick:()=>{w("/avance")},children:"Avance"})}),(0,u.jsx)(h.U,{sm:4,children:(0,u.jsx)(o.Q,{className:"dashboard-button",children:"TOP NO+PAPEL"})}),(0,u.jsx)(h.U,{sm:4})]})]})})})})]})}}}]);
//# sourceMappingURL=196.2430b7c6.chunk.js.map