(self.webpackChunkP_G=self.webpackChunkP_G||[]).push([[77],{33577:(e,a,l)=>{"use strict";l.r(a),l.d(a,{default:()=>n});var t=l(65043),s=l(50286),r=l(35761),d=l(66885),c=l(76880),i=l(70579);const n=e=>{const{getProject:a,getContract:l}=(0,r.A)(),n=(JSON.parse(a()),JSON.parse(l())),{company:m,indirectWorkForceList:o,totalIndirectWorkForce:h,directWorkForceList:N,totalDirectWorkForce:x,asarcoMachineryList:j,basicQuery:b,machineryList:u,equipmentPlateList:y,equipmentList:v,vehiclePlateList:p,vehicleList:S,activityList:f,aljibeList:k,comment:A,incident:g,directDotationWorkForceList:H,machineryWorkForceList:O,equipmentWorkForceList:E}=e,{indirectPersonal:M,directPersonal:C,machinery:T,equipment:w,vehicles:F,aljibe:I,workFront:P}=b,[R,q]=(0,t.useState)(0),[D,L]=(0,t.useState)(0),[W,U]=(0,t.useState)(0),[Q,B]=(0,t.useState)(0),[V,J]=(0,t.useState)(0),[G,z]=(0,t.useState)(0),[Y,Z]=(0,t.useState)(0),[_,K]=(0,t.useState)(0),[X,$]=(0,t.useState)(0),[ee,ae]=(0,t.useState)(0),[le,te]=(0,t.useState)(0);(0,t.useEffect)((()=>{let e=0,a=0,l=0,t=0,s=0,r=0,d=0,c=0,i=0,n=0,m=0;u.map((o=>{e+=Number(o.actions.machineryOfferedNumber),a+=Number(o.actions.machineryCertifiedNumber),l+=Number(o.actions.machineryWorkNumber);const h=j.find((e=>e.machinery===o.machinery));t+=Number(h.asarcoMachineryEffectiveTime),s+=Number(h.asarcoMachineryUnscheduleMaintenance),r+=Number(h.asarcoMachineryScheduleMaintenance),d+=Number(h.asarcoMachineryUnscheduleDelay),c+=Number(h.asarcoMachineryScheduleDelay),i+=Number(h.asarcoMachineryReserves),n+=Number(h.asarcoMachineryOpperationalLoss),m+=Number(h.asarcoMachineryHorometer)})),q(e),L(a),U(l),B(t),J(s),z(r),Z(d),K(c),$(i),ae(n),te(m)}),[u]);const[se,re]=(0,t.useState)(0),[de,ce]=(0,t.useState)(0),[ie,ne]=(0,t.useState)(0),[me,oe]=(0,t.useState)(0),[he,Ne]=(0,t.useState)(0),[xe,je]=(0,t.useState)(0),[be,ue]=(0,t.useState)(0),[ye,ve]=(0,t.useState)(0),[pe,Se]=(0,t.useState)(0),[fe,ke]=(0,t.useState)(0),[Ae,ge]=(0,t.useState)(0);(0,t.useEffect)((()=>{let e=0,a=0,l=0,t=0,s=0,r=0,d=0,c=0,i=0,n=0,m=0;v.map((o=>{e+=Number(o.actions.equipmentOfferedNumber),a+=Number(o.actions.equipmentCertifiedNumber),l+=Number(o.actions.equipmentWorkNumber);const h=y.find((e=>e.equipment===o.equipment));t+=Number(h.equipmentEffectiveTime),s+=Number(h.equipmentCorrectiveMaintenance),r+=Number(h.equipmentPreventiveMaintenance),d+=Number(h.equipmentOutOfService),c+=Number(h.equipmentWaiting),i+=Number(h.equipmentNoOperator),n+=Number(h.equipmentInitialHorometer),m+=Number(h.equipmentFinalHorometer)})),re(e),ce(a),ne(l),oe(t),Ne(s),je(r),ue(d),ve(c),Se(i),ke(n),ge(m)}),[v]);const[He,Oe]=(0,t.useState)(0),[Ee,Me]=(0,t.useState)(0),[Ce,Te]=(0,t.useState)(0),[we,Fe]=(0,t.useState)(0),[Ie,Pe]=(0,t.useState)(0),[Re,qe]=(0,t.useState)(0),[De,Le]=(0,t.useState)(0),[We,Ue]=(0,t.useState)(0),[Qe,Be]=(0,t.useState)(0),[Ve,Je]=(0,t.useState)(0),[Ge,ze]=(0,t.useState)(0);(0,t.useEffect)((()=>{let e=0,a=0,l=0,t=0,s=0,r=0,d=0,c=0,i=0,n=0,m=0;S.map((o=>{e+=Number(o.actions.vehicleOfferedNumber),a+=Number(o.actions.vehicleCertifiedNumber),l+=Number(o.actions.vehicleWorkNumber);const h=p.find((e=>e.vehicle===o.vehicle));t+=Number(h.vehicleEffectiveTime),s+=Number(h.vehicleCorrectiveMaintenance),r+=Number(h.vehiclePreventiveMaintenance),d+=Number(h.vehicleOutOfService),c+=Number(h.vehicleWaiting),i+=Number(h.vehicleNoOperator),n+=Number(h.vehicleInitialHorometer),m+=Number(h.vehicleFinalHorometer)})),Oe(e),Me(a),Te(l),Fe(t),Pe(s),qe(r),Le(d),Ue(c),Be(i),Je(n),ze(m)}),[S]);const Ye=(0,i.jsx)("html",{children:(0,i.jsxs)("body",{children:[(0,i.jsx)("style",{children:"\n        .heading4 {\n          color: white;\n        }\n        pre {\n          background-color: #eee;\n          padding: 10px;\n        }\n        table, th, td {\n            border: 1px solid black;\n        }\n        td {\n          font-size: 14;\n          padding: 5px;\n          text-align: center;\n        }\n        .td-workers-label {\n          background-color: #028080;\n          color: white;\n        }\n        .td-machinery-label {\n          background-color: #c2f0c8;\n        }\n        .td-workers-name {\n          text-align: left;\n        }\n        .td-green-label {\n          background-color: #3c7d23;\n          color: white;\n        }\n        .td-total-label{\n          background-color: #ffcc66;\n        }\n        .td-label {\n          background-color: #006666;\n          color: white;\n        }"}),"zxc",(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",children:"Informe diario N\xb0"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportNumber}),(0,i.jsx)("td",{className:"td-label",children:"Clima"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportWeather}),(0,i.jsx)("td",{className:"td-label",children:"Fecha"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportDate})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",children:"Nombre de contratista"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportContratistName}),(0,i.jsx)("td",{className:"td-label",colSpan:"2",children:"Personal Directo"}),(0,i.jsx)("td",{className:"td-label"}),(0,i.jsx)("td",{className:"td-label",colSpan:2,children:"Personal Indirecto"}),(0,i.jsx)("td",{className:"td-label"})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",children:"N\xb0 de Contrato"}),(0,i.jsx)("td",{children:n.id}),(0,i.jsx)("td",{className:"td-label",children:"Turno"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportDirectPersonalShift}),(0,i.jsx)("td",{className:"td-label",children:"Turno"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportIndirectPersonalShift})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",children:"Nombre de Contrato"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportContractName}),(0,i.jsx)("td",{className:"td-label",children:"Horas Turno"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportDirectPersonalHours}),(0,i.jsx)("td",{className:"td-label",children:"Horas Turno"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportIndirectPersonalHours})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",children:"Nombre del Administrador de Contrato"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportContractManagerName}),(0,i.jsx)("td",{className:"td-label",children:"Jornada"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportDirectPersonalJourney}),(0,i.jsx)("td",{className:"td-label",children:"Jornada"}),(0,i.jsx)("td",{children:null===m||void 0===m?void 0:m.dailyReportIndirectPersonalJourney})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsx)("tbody",{children:(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"FUERZA LABORAL CONTRATISTA"})})})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"INDIRECTOS"}),(0,i.jsx)("td",{className:"td-green-label",children:"N\xb0 Ofertado"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Contratados"}),(0,i.jsx)("td",{className:"td-workers-label",children:"Acreditados"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Descanso"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Obra"}),(0,i.jsx)("td",{className:"td-workers-label",children:"HH (turno)"})]}),o.length>0&&(0,i.jsx)(i.Fragment,{children:o.map((e=>{const a=M.find((a=>a.id===e.id));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-name",children:a.name}),(0,i.jsx)("td",{className:"td-green-label",children:e.offeredNumber}),(0,i.jsx)("td",{className:"",children:e.contractedNumber}),(0,i.jsx)("td",{className:"",children:e.certified}),(0,i.jsx)("td",{className:"",children:e.breakNumber}),(0,i.jsx)("td",{className:"",children:e.workNumber}),(0,i.jsx)("td",{className:"",children:e.hh})]},e.id)}))}),h&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Subtotal Indirectos"}),(0,i.jsx)("td",{className:"td-green-label",children:h.indirectSubtotalOfferedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectSubtotalContractedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectSubtotalCertifiedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectSubtotalBreakNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectSubtotalWorkNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectSubstotalHHNumber})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Total HH Indirectos Acumulado Anterior"}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectPreviusAccumulated})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Total HH Indirectos Acumulado Actual"}),(0,i.jsx)("td",{className:"td-workers-label",children:h.indirectCurrentAccumulated})]})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Directos"}),(0,i.jsx)("td",{className:"td-green-label",children:"N\xb0 Ofertado"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Contratados"}),(0,i.jsx)("td",{className:"td-workers-label",children:"Acreditados"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Descanso"}),(0,i.jsx)("td",{className:"td-workers-label",children:"N\xb0 Obra"}),(0,i.jsx)("td",{className:"td-workers-label",children:"HH (turno)"}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"td-machinery-label",children:e.name})})))]}),N.length>0&&(0,i.jsx)(i.Fragment,{children:N.map((e=>{const a=C.find((a=>a.id===e.id));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-name",children:a.name}),(0,i.jsx)("td",{className:"td-green-label",children:e.offeredNumber}),(0,i.jsx)("td",{className:"",children:e.contractedNumber}),(0,i.jsx)("td",{className:"",children:e.certified}),(0,i.jsx)("td",{className:"",children:e.breakNumber}),(0,i.jsx)("td",{className:"",children:e.workNumber}),(0,i.jsx)("td",{className:"",children:e.hh}),P.sort(((e,a)=>e.id-a.id)).map((e=>{const a=H.find((a=>a.directWorkFront===e.id));return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"",children:(null===a||void 0===a?void 0:a.directWorkFrontQuantity)||""})})}))]},e.id)}))}),x&&(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Subtotal Indirectos"}),(0,i.jsx)("td",{className:"td-green-label",children:x.directSubtotalOfferedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directSubtotalContractedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directSubtotalCertifiedNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directSubtotalBreakNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directSubtotalWorkNumber}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directSubstotalHHNumber}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:""})})))]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Total HH Directos Acumulado Anterior"}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directPreviusAccumulated})]}),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-workers-label",children:"Total HH Directos Acumulado Actual"}),(0,i.jsx)("td",{className:"td-workers-label",children:x.directCurrentAccumulated})]})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsx)("tbody",{children:(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"EQUIPOS Y MAQUINARIAS CONTRATISTA"})})})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-machinery-label",children:"MAQUINARIA (NOMBRE)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"PATENTE"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Maq oferta"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Maq Acreditados"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Maq en Obra"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Tiempo Efectivo (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n No Programada (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n Programada (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Demora No Programada (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Demora Programada (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Reservas (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Perdida Operacional (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Horometro"}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"td-machinery-label",children:e.name})})))]}),u.length>0&&(0,i.jsxs)(i.Fragment,{children:[u.map((e=>{const a=j.find((a=>a.machinery===e.machinery));if(a){var l,t;const s=T.find((e=>e.id===a.machinery)),r=s.plate.find((e=>e.id===a.machineryPlate));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"",children:null!==(l=s.name)&&void 0!==l?l:""}),(0,i.jsx)("td",{className:"",children:null!==(t=r.label)&&void 0!==t?t:""}),(0,i.jsx)("td",{className:"",children:e.actions.machineryOfferedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.machineryCertifiedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.machineryWorkNumber}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryEffectiveTime}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryUnscheduleMaintenance}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryScheduleMaintenance}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryUnscheduleDelay}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryScheduleDelay}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryReserves}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryOpperationalLoss}),(0,i.jsx)("td",{className:"",children:a.asarcoMachineryHorometer}),P.sort(((e,a)=>e.id-a.id)).map((e=>{const a=O.find((a=>a.machineryWorkForce===e.id));return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"",children:(null===a||void 0===a?void 0:a.machineryWorkFrontQuantity)||""})})}))]},e.id)}})),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-total-label",children:"Total"}),(0,i.jsx)("td",{className:"td-total-label"}),(0,i.jsx)("td",{className:"td-total-label",children:R}),(0,i.jsx)("td",{className:"td-total-label",children:D}),(0,i.jsx)("td",{className:"td-total-label",children:W}),(0,i.jsx)("td",{className:"td-total-label",children:Q}),(0,i.jsx)("td",{className:"td-total-label",children:V}),(0,i.jsx)("td",{className:"td-total-label",children:G}),(0,i.jsx)("td",{className:"td-total-label",children:Y}),(0,i.jsx)("td",{className:"td-total-label",children:_}),(0,i.jsx)("td",{className:"td-total-label",children:X}),(0,i.jsx)("td",{className:"td-total-label",children:ee}),(0,i.jsx)("td",{className:"td-total-label",children:le}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"td-total-label"})})))]})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-machinery-label",children:"EQUIPO (NOMBRE)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"PATENTE"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Equipos oferta"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Equipos Acreditados"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Equipos en Obra"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Operativos (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n Correctiva (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n Preventiva (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Fuera de Servicio (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"En espera (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Sin Operador (hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Horometro Inicial"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Horometro Final"}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"td-machinery-label",children:e.name})})))]}),v.length>0&&(0,i.jsxs)(i.Fragment,{children:[v.map((e=>{const a=y.find((a=>a.equipment===e.equipment));if(a){var l,t;const s=w.find((e=>e.id===a.equipment)),r=s.plate.find((e=>e.id===a.equipmentPlate));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"",children:null!==(l=s.name)&&void 0!==l?l:""}),(0,i.jsx)("td",{className:"",children:null!==(t=r.label)&&void 0!==t?t:""}),(0,i.jsx)("td",{className:"",children:e.actions.equipmentOfferedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.equipmentCertifiedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.equipmentWorkNumber}),(0,i.jsx)("td",{className:"",children:a.equipmentEffectiveTime}),(0,i.jsx)("td",{className:"",children:a.equipmentCorrectiveMaintenance}),(0,i.jsx)("td",{className:"",children:a.equipmentPreventiveMaintenance}),(0,i.jsx)("td",{className:"",children:a.equipmentOutOfService}),(0,i.jsx)("td",{className:"",children:a.equipmentWaiting}),(0,i.jsx)("td",{className:"",children:a.equipmentNoOperator}),(0,i.jsx)("td",{className:"",children:a.equipmentInitialHorometer}),(0,i.jsx)("td",{className:"",children:a.equipmentFinalHorometer}),P.sort(((e,a)=>e.id-a.id)).map((e=>{const a=E.find((a=>a.equipmentWorkForce===e.id));return(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"",children:(null===a||void 0===a?void 0:a.equipmentWorkFrontQuantity)||""})})}))]},e.id)}})),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-total-label",children:"Total"}),(0,i.jsx)("td",{className:"td-total-label"}),(0,i.jsx)("td",{className:"td-total-label",children:se}),(0,i.jsx)("td",{className:"td-total-label",children:de}),(0,i.jsx)("td",{className:"td-total-label",children:ie}),(0,i.jsx)("td",{className:"td-total-label",children:me}),(0,i.jsx)("td",{className:"td-total-label",children:he}),(0,i.jsx)("td",{className:"td-total-label",children:xe}),(0,i.jsx)("td",{className:"td-total-label",children:be}),(0,i.jsx)("td",{className:"td-total-label",children:ye}),(0,i.jsx)("td",{className:"td-total-label",children:pe}),(0,i.jsx)("td",{className:"td-total-label",children:fe}),(0,i.jsx)("td",{className:"td-total-label",children:Ae}),P.sort(((e,a)=>e.id-a.id)).map((e=>(0,i.jsx)(i.Fragment,{children:(0,i.jsx)("td",{className:"td-total-label"})})))]})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-machinery-label",children:"VEHICULOS MENORES (NOMBRE)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"PATENTE"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Veh\xedculos oferta"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Veh\xedculos Acreditados"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"N\xb0 Veh\xedculos en Obra"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Operativos (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n Correctiva (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Mantenci\xf3n Preventiva (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Fuera de Servicio (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"En espera (Hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Sin Operador (hrs)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Horometro Inicial"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Horometro Final"})]}),S.length>0&&(0,i.jsxs)(i.Fragment,{children:[S.map((e=>{const a=p.find((a=>a.vehicle===e.vehicle));if(a){var l,t;const s=F.find((e=>e.id===a.vehicle)),r=s.plate.find((e=>e.id===a.vehiclePlate));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"",children:null!==(l=s.name)&&void 0!==l?l:""}),(0,i.jsx)("td",{className:"",children:null!==(t=r.label)&&void 0!==t?t:""}),(0,i.jsx)("td",{className:"",children:e.actions.vehicleOfferedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.vehicleCertifiedNumber}),(0,i.jsx)("td",{className:"",children:e.actions.vehicleWorkNumber}),(0,i.jsx)("td",{className:"",children:a.vehicleEffectiveTime}),(0,i.jsx)("td",{className:"",children:a.vehicleCorrectiveMaintenance}),(0,i.jsx)("td",{className:"",children:a.vehiclePreventiveMaintenance}),(0,i.jsx)("td",{className:"",children:a.vehicleOutOfService}),(0,i.jsx)("td",{className:"",children:a.vehicleWaiting}),(0,i.jsx)("td",{className:"",children:a.vehicleNoOperator}),(0,i.jsx)("td",{className:"",children:a.vehicleInitialHorometer}),(0,i.jsx)("td",{className:"",children:a.vehicleFinalHorometer})]},e.id)}})),(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-total-label",children:"Total"}),(0,i.jsx)("td",{className:"td-total-label"}),(0,i.jsx)("td",{className:"td-total-label",children:He}),(0,i.jsx)("td",{className:"td-total-label",children:Ee}),(0,i.jsx)("td",{className:"td-total-label",children:Ce}),(0,i.jsx)("td",{className:"td-total-label",children:we}),(0,i.jsx)("td",{className:"td-total-label",children:Ie}),(0,i.jsx)("td",{className:"td-total-label",children:Re}),(0,i.jsx)("td",{className:"td-total-label",children:De}),(0,i.jsx)("td",{className:"td-total-label",children:We}),(0,i.jsx)("td",{className:"td-total-label",children:Qe}),(0,i.jsx)("td",{className:"td-total-label",children:Ve}),(0,i.jsx)("td",{className:"td-total-label",children:Ge})]})]})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsx)("tbody",{children:(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"DESCRIPCI\xd3N DE LAS ACTIVIDADES DESARROLLADAS"})})})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-machinery-label",children:"ID actividad Primavera"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Nombre de actividad"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Disciplina"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Cantidad Total"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Cantidad Acum anterior"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Cantidad Real turno"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"% Avance Acumulado"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Unidad"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"HH gastada Anterior"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"HH gastada Real Turno"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"HH gastada Acumulada"})]}),f.length>0&&(0,i.jsx)(i.Fragment,{children:f.map((e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"",children:e.primaveraId}),(0,i.jsx)("td",{className:"",children:e.activityName}),(0,i.jsx)("td",{className:"",children:e.activityDiscipline}),(0,i.jsx)("td",{className:"",children:e.activityTotalAmount}),(0,i.jsx)("td",{className:"",children:e.activityPreviousAcumulatedAmount}),(0,i.jsx)("td",{className:"",children:e.activityActualShiftQuantity}),(0,i.jsx)("td",{className:"",children:e.activityAccumulatedAcvancePercent}),(0,i.jsx)("td",{className:"",children:e.activityUnit}),(0,i.jsx)("td",{className:"",children:e.activityHoursSpendPrevius}),(0,i.jsx)("td",{className:"",children:e.activityHoursSpendShift}),(0,i.jsx)("td",{className:"",children:e.activityHoursAccumulated})]},e.id)))})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsx)("tbody",{children:(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"CONTROL DE AGUAS INDUSTRIALES UTILIZAD"})})})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-machinery-label",children:"VEHICULOS MENORES (NOMBRE)"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"PATENTE"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"Nombre Cachimba"}),(0,i.jsx)("td",{className:"td-machinery-label",children:"m3"})]}),k.length>0&&(0,i.jsx)(i.Fragment,{children:k.map((e=>{const a=I.find((e=>e.aljibe===I.id)),l=a.plate.find((a=>a.id.toString()==e.aljibePlate.toString()));return(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"",children:null===a||void 0===a?void 0:a.name}),(0,i.jsx)("td",{className:"",children:null===l||void 0===l?void 0:l.label}),(0,i.jsx)("td",{className:"",children:e.aljibeCachimbaName}),(0,i.jsx)("td",{className:"",children:e.aljibeM3})]},e.id)}))})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"COMENTARIOS Y ALERTAS EN GENERAL"})}),(0,i.jsx)("tr",{children:(0,i.jsx)("td",{className:"",children:A.comment})})]})}),(0,i.jsx)("table",{border:1,children:(0,i.jsxs)("tbody",{children:[(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"INCIDENTES, LESIONES O EVENTOS"}),(0,i.jsx)("td",{className:"td-label",style:{textAlign:"center"},children:"NO CONFORMIDADES O INTERFERENCIAS"})]}),g.length>0&&(0,i.jsx)(i.Fragment,{children:g.map((e=>(0,i.jsxs)("tr",{children:[(0,i.jsx)("td",{children:e.incident}),(0,i.jsx)("td",{children:e.nonConformity})]},e.id)))})]})})]})}),Ze=d.renderToStaticMarkup(Ye);return(0,i.jsx)(s.yo,{children:(0,i.jsx)(s.YW,{size:"A1",orientation:"landscape",children:(0,i.jsx)(c.Ed,{children:Ze})})})}},50477:()=>{}}]);
//# sourceMappingURL=77.81cfcbfe.chunk.js.map