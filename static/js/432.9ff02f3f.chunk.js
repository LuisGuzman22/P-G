"use strict";(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[432],{81432:(e,i,s)=>{s.r(i),s.d(i,{default:()=>I});var r=s(65043),a=s(54101),c=s(6122),t=s(72717),n=s(13127),o=s(84709),l=s(25762),d=s(8270),h=s(56627),j=s(31148),x=(s(35411),s(34974)),m=(s(18024),s(89756)),u=s(31486),y=s(54823),p=s(42566),N=s(26460),b=(s(68094),s(49957)),L=s(17564),R=(s(87921),s(90761)),f=s(43357),A=s(84998),F=s(85930),M=s(44619),S=s(63171),K=s(81925),k=s(56732),v=s(73216),B=s(33245),D=s(50286),W=s(84793),g=s(54451),q=s(49634),E=s(27304),P=(s(55316),s(70579));const C=()=>{const e=(0,v.zy)().pathname.includes("/view"),[i,s]=(0,r.useState)(!1),{company:C,indirectCompanyTurnList:z,indirectWorkForceList:w,totalIndirectWorkForce:T,directWorkForceList:I,totalDirectWorkForce:O,asarcoMachineryList:U,machineryList:G,equipmentList:Q,equipmentPlateList:V,vehicleList:_,vehiclePlateList:X,activityList:Z,aljibeList:H,comment:J,incident:Y,directDotationWorkForceList:$,machineryWorkForceList:ee,equipmentWorkForceList:ie,graphList:se,photoList:re}=(0,g.A)(),[ae,ce]=(0,r.useState)(!1),[te,ne]=(0,r.useState)(),[oe,le]=(0,r.useState)(),[de,he]=(0,r.useState)(0),[je,xe]=(0,r.useState)(0);(0,r.useEffect)((()=>{he(O.directSubtotalOfferedNumber),xe(O.directSubtotalWorkNumber)}),[O]);const[me,ue]=(0,r.useState)(0),[ye,pe]=(0,r.useState)(0),[Ne,be]=(0,r.useState)(0),[Le,Re]=(0,r.useState)(0),[fe,Ae]=(0,r.useState)(0),[Fe,Me]=(0,r.useState)(0),[Se,Ke]=(0,r.useState)(0),[ke,ve]=(0,r.useState)(0),[Be,De]=(0,r.useState)(!1);(0,r.useEffect)((()=>{for(let e of U)De(!0),ve(ke+Number(e.asarcoMachineryEffectiveTime)+Number(e.asarcoMachineryScheduleMaintenance)+Number(e.asarcoMachineryScheduleDelay)+Number(e.asarcoMachineryOpperationalLoss)+Number(e.asarcoMachineryUnscheduleMaintenance)+Number(e.asarcoMachineryUnscheduleDelay)+Number(e.asarcoMachineryReserves)),ue(me+Number(e.asarcoMachineryEffectiveTime)),pe(ye+Number(e.asarcoMachineryScheduleMaintenance)),be(Ne+Number(e.asarcoMachineryScheduleDelay)),Re(Le+Number(e.asarcoMachineryOpperationalLoss)),Ae(fe+Number(e.asarcoMachineryUnscheduleMaintenance)),Me(Fe+Number(e.asarcoMachineryUnscheduleDelay)),Ke(Se+Number(e.asarcoMachineryReserves))}),[U]),(0,r.useEffect)((()=>{C.dailyReportDate||window.location.reload()}),[C]);const{getData:We}=(0,q.A)(),ge=We("basics"),{registerData:qe}=(0,A.A)();return(0,P.jsxs)("div",{className:"dailyReport",children:[i&&(0,P.jsx)(B.A,{visible:!0,sendDataToParent:async e=>{s(e)}}),(0,P.jsx)("div",{children:(0,P.jsx)(D.XP,{document:(0,P.jsx)(W.default,{company:C,indirectCompanyTurnList:z,indirectWorkForceList:w,basicQuery:ge,totalIndirectWorkForce:T,directWorkForceList:I,totalDirectWorkForce:O,asarcoMachineryList:U,machineryList:G,equipmentList:Q,equipmentPlateList:V,vehiclePlateList:X,vehicleList:_,activityList:Z,aljibeList:H,comment:J,incident:Y,directDotationWorkForceList:$,machineryWorkForceList:ee,equipmentWorkForceList:ie,graphList:se,photoList:re}),fileName:"Reporte 1.pdf",children:e=>{let{blob:i,url:s,loading:r,error:a}=e;return ce(r),ne(i),le(s),r?"Generando documento...":"Descargar PDF"}})}),!ae&&oe&&te?(0,P.jsxs)(P.Fragment,{children:[(0,P.jsxs)(a.E,{className:"dailyReport-accordion",activeItemKey:1,children:[(0,P.jsxs)(c.l,{itemKey:1,children:[(0,P.jsx)(t.B,{children:"1) Empresa"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(l.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:2,children:[(0,P.jsx)(t.B,{children:"2) Fuerza de trabajo personal indirecto"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(d.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:3,children:[(0,P.jsx)(t.B,{children:"3) Fuerza laboral total personal indirecto"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(h.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:4,children:[(0,P.jsx)(t.B,{children:"4) Fuerza laboral contratista personal directo"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(f.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:5,children:[(0,P.jsx)(t.B,{children:"5) Fuerza laboral total personal directo"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(j.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:6,children:[(0,P.jsx)(t.B,{children:"6) Dotaci\xf3n por frente de trabajo personal directo"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(x.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:7,children:[(0,P.jsx)(t.B,{children:"7) Maquinarias contratistas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(m.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:8,children:[(0,P.jsx)(t.B,{children:"8) Maquinarias por frente de trabajo"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(u.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:9,children:[(0,P.jsx)(t.B,{children:"9) ASARCO Maquinarias"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(F.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:10,children:[(0,P.jsx)(t.B,{children:"10) Equipos contratistas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(y.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:11,children:[(0,P.jsx)(t.B,{children:"11) Equipos con patentes contratistas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(M.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:12,children:[(0,P.jsx)(t.B,{children:"12) Equipos por frente de trabajo"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(p.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:13,children:[(0,P.jsx)(t.B,{children:"13) Veh\xedculos menores contratistas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(N.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:14,children:[(0,P.jsx)(t.B,{children:"14) Veh\xedculos con patente menores contratistas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(S.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:15,children:[(0,P.jsx)(t.B,{children:"15) Descripci\xf3n de actividades desarrolladas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(b.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:16,children:[(0,P.jsx)(t.B,{children:"16) Control de aguas industriales utilizadas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(K.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:17,children:[(0,P.jsx)(t.B,{children:"17) Comentarios y alertas en general"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(L.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:18,children:[(0,P.jsx)(t.B,{children:"18) Registro fotogr\xe1fico diario"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(k.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:19,children:[(0,P.jsx)(t.B,{children:"19) Incidentes, lesiones o eventos"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(R.A,{})})]}),(0,P.jsxs)(c.l,{itemKey:20,children:[(0,P.jsx)(t.B,{children:"20) Firmas"}),(0,P.jsx)(n.i,{className:"dailyReport-accordion",children:(0,P.jsx)(P.Fragment,{})})]})]}),(0,P.jsx)(o.Q,{className:"btn-project-action",onClick:()=>{e?s(!i):qe()},children:"Registrar informe diario"})]}):(0,P.jsx)(P.Fragment,{children:(0,P.jsx)(E.A,{})})]})};var z=s(80861),w=s(96105),T=s(23682);const I=()=>{let e=(0,v.Zp)();const{getData:i}=(0,q.A)(),s=i("basics");return(0,r.useEffect)((()=>{s||e("/dashboard")}),[s]),(0,P.jsx)("div",{className:"daily-report",children:(0,P.jsx)(z.E,{children:(0,P.jsx)(w.W,{children:(0,P.jsx)(T.d,{children:(0,P.jsx)(C,{})})})})})}}}]);
//# sourceMappingURL=432.9ff02f3f.chunk.js.map