/* eslint-disable react/prop-types */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { Html } from 'react-pdf-html'
import ReactDOMServer from 'react-dom/server'

/**
 * 
 * @returns         <View>
          <Image
            style={styles.image}
            src="https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </View>
 */
const Pdf = (props) => {
  const { getProject, getContract } = useRegisterGeneralData()
  const projectLS = JSON.parse(getProject())
  const contractLS = JSON.parse(getContract())

  // MAPPEAR CLIMA

  const {
    company,
    indirectWorkForceList,
    totalIndirectWorkForce,
    directWorkForceList,
    totalDirectWorkForce,
    asarcoMachineryList,
    basicQuery,
    machineryList,
    equipmentPlateList,
    equipmentList,
    vehiclePlateList,
    vehicleList,
    activityList,
    aljibeList,
    comment,
    incident,
  } = props
  const { indirectPersonal, directPersonal, machinery, equipment, vehicles, aljibe } = basicQuery
  console.log('props', props)

  const element = (
    <html>
      <body>
        <style>
          {`
        .heading4 {
          color: white;
        }
        pre {
          background-color: #eee;
          padding: 10px;
        }
        table, th, td {
            border: 1px solid black;
        }
        td {
          font-size: 14;
          padding: 5px;
          text-align: center;
        }
        .td-workers-label {
          background-color: #028080;
          color: white;
        }
        .td-machinery-label {
          background-color: #c2f0c8;
        }
        .td-workers-name {
          text-align: left;
        }
        .td-green-label {
          background-color: #3c7d23
;
          color: white;
        }
        .td-label {
          background-color: #006666;
          color: white;
        }`}
        </style>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label">Informe diario N°</td>
              <td>{company?.dailyReportNumber}</td>
              <td className="td-label">Clima</td>
              <td>{company?.dailyReportWeather}</td>
              <td className="td-label">Fecha</td>
              <td>{company?.dailyReportDate}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre de contratista</td>
              <td>{company?.dailyReportContratistName}</td>
              <td className="td-label" colSpan="2">
                Personal Directo
              </td>
              <td className="td-label"></td>

              <td className="td-label" colSpan={2}>
                Personal Indirecto
              </td>
              <td className="td-label"></td>
            </tr>
            <tr>
              <td className="td-label">N° de Contrato</td>
              <td>{contractLS.id}</td>
              <td className="td-label">Turno</td>
              <td>{company?.dailyReportDirectPersonalShift}</td>
              <td className="td-label">Turno</td>
              <td>{company?.dailyReportIndirectPersonalShift}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre de Contrato</td>
              <td>{company?.dailyReportContractName}</td>
              <td className="td-label">Horas Turno</td>
              <td>{company?.dailyReportDirectPersonalHours}</td>
              <td className="td-label">Horas Turno</td>
              <td>{company?.dailyReportIndirectPersonalHours}</td>
            </tr>
            <tr>
              <td className="td-label">Nombre del Administrador de Contrato</td>
              <td>{company?.dailyReportContractManagerName}</td>
              <td className="td-label">Jornada</td>
              <td>{company?.dailyReportDirectPersonalJourney}</td>
              <td className="td-label">Jornada</td>
              <td>{company?.dailyReportIndirectPersonalJourney}</td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                FUERZA LABORAL CONTRATISTA
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-workers-label">INDIRECTOS</td>
              <td className="td-green-label">N° Ofertado</td>
              <td className="td-workers-label">N° Contratados</td>
              <td className="td-workers-label">Acreditados</td>
              <td className="td-workers-label">N° Descanso</td>
              <td className="td-workers-label">N° Obra</td>
              <td className="td-workers-label">HH (turno)</td>
            </tr>
            {indirectWorkForceList.length > 0 && (
              <>
                {indirectWorkForceList.map((data) => {
                  const selectedIndirectPersonal = indirectPersonal.find((personal) => {
                    return personal.id === data.id
                  })
                  return (
                    <tr key={data.id}>
                      <td className="td-workers-name">{selectedIndirectPersonal.name}</td>
                      <td className="td-green-label">{data.offeredNumber}</td>
                      <td className="">{data.contractedNumber}</td>
                      <td className="">{data.certified}</td>
                      <td className="">{data.breakNumber}</td>
                      <td className="">{data.workNumber}</td>
                      <td className="">{data.hh}</td>
                    </tr>
                  )
                })}
              </>
            )}
            {totalIndirectWorkForce && (
              <>
                <tr>
                  <td className="td-workers-label">Subtotal Indirectos</td>
                  <td className="td-green-label">
                    {totalIndirectWorkForce.indirectSubtotalOfferedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalContractedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalCertifiedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalBreakNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubtotalWorkNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectSubstotalHHNumber}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Indirectos Acumulado Anterior</td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectPreviusAccumulated}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Indirectos Acumulado Actual</td>
                  <td className="td-workers-label">
                    {totalIndirectWorkForce.indirectCurrentAccumulated}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-workers-label">Directos</td>
              <td className="td-green-label">N° Ofertado</td>
              <td className="td-workers-label">N° Contratados</td>
              <td className="td-workers-label">Acreditados</td>
              <td className="td-workers-label">N° Descanso</td>
              <td className="td-workers-label">N° Obra</td>
              <td className="td-workers-label">HH (turno)</td>
            </tr>
            {directWorkForceList.length > 0 && (
              <>
                {directWorkForceList.map((data) => {
                  const selectedDirectPersonal = directPersonal.find((personal) => {
                    return personal.id === data.id
                  })
                  return (
                    <tr key={data.id}>
                      <td className="td-workers-name">{selectedDirectPersonal.name}</td>
                      <td className="td-green-label">{data.offeredNumber}</td>
                      <td className="">{data.contractedNumber}</td>
                      <td className="">{data.certified}</td>
                      <td className="">{data.breakNumber}</td>
                      <td className="">{data.workNumber}</td>
                      <td className="">{data.hh}</td>
                    </tr>
                  )
                })}
              </>
            )}
            {totalDirectWorkForce && (
              <>
                <tr>
                  <td className="td-workers-label">Subtotal Indirectos</td>
                  <td className="td-green-label">
                    {totalDirectWorkForce.directSubtotalOfferedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalContractedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalCertifiedNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalBreakNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubtotalWorkNumber}
                  </td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directSubstotalHHNumber}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Directos Acumulado Anterior</td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directPreviusAccumulated}
                  </td>
                </tr>
                <tr>
                  <td className="td-workers-label">Total HH Directos Acumulado Actual</td>
                  <td className="td-workers-label">
                    {totalDirectWorkForce.directCurrentAccumulated}
                  </td>
                </tr>
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                EQUIPOS Y MAQUINARIAS CONTRATISTA
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">MAQUINARIA (NOMBRE)</td>
              <td className="td-machinery-label">PATENTE</td>
              <td className="td-machinery-label">N° Maq oferta</td>
              <td className="td-machinery-label">N° Maq Acreditados</td>
              <td className="td-machinery-label">N° Maq en Obra</td>
              <td className="td-machinery-label">Tiempo Efectivo (Hrs)</td>
              <td className="td-machinery-label">Mantención No Programada (Hrs)</td>
              <td className="td-machinery-label">Mantención Programada (Hrs)</td>
              <td className="td-machinery-label">Demora No Programada (Hrs)</td>
              <td className="td-machinery-label">Demora Programada (Hrs)</td>
              <td className="td-machinery-label">Reservas (Hrs)</td>
              <td className="td-machinery-label">Perdida Operacional (Hrs)</td>
              <td className="td-machinery-label">Horometro</td>
            </tr>
            {machineryList.length > 0 && (
              <>
                {machineryList.map((data) => {
                  const selectedAsarco = asarcoMachineryList.find((asarco) => {
                    return asarco.machinery === data.machinery
                  })
                  if (selectedAsarco) {
                    const selectedMachinery = machinery.find((mac) => {
                      return mac.id === selectedAsarco.machinery
                    })

                    const selectedPlate = selectedMachinery.plate.find((plate) => {
                      return plate.id === selectedAsarco.machineryPlate
                    })
                    return (
                      <tr key={data.id}>
                        <td className="">{selectedMachinery.name ?? ''}</td>
                        <td className="">{selectedPlate.label ?? ''}</td>
                        <td className="">{data.actions.machineryOfferedNumber}</td>
                        <td className="">{data.actions.machineryCertifiedNumber}</td>
                        <td className="">{data.actions.machineryWorkNumber}</td>
                        <td className="">{selectedAsarco.asarcoMachineryEffectiveTime}</td>
                        <td className="">{selectedAsarco.asarcoMachineryUnscheduleMaintenance}</td>
                        <td className="">{selectedAsarco.asarcoMachineryScheduleMaintenance}</td>
                        <td className="">{selectedAsarco.asarcoMachineryUnscheduleDelay}</td>
                        <td className="">{selectedAsarco.asarcoMachineryScheduleDelay}</td>
                        <td className="">{selectedAsarco.asarcoMachineryReserves}</td>
                        <td className="">{selectedAsarco.asarcoMachineryOpperationalLoss}</td>
                        <td className="">{selectedAsarco.asarcoMachineryHorometer}</td>
                      </tr>
                    )
                  }
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">EQUIPO (NOMBRE)</td>
              <td className="td-machinery-label">PATENTE</td>
              <td className="td-machinery-label">N° Equipos oferta</td>
              <td className="td-machinery-label">N° Equipos Acreditados</td>
              <td className="td-machinery-label">N° Equipos en Obra</td>
              <td className="td-machinery-label">Operativos (Hrs)</td>
              <td className="td-machinery-label">Mantención Correctiva (Hrs)</td>
              <td className="td-machinery-label">Mantención Preventiva (Hrs)</td>
              <td className="td-machinery-label">Fuera de Servicio (Hrs)</td>
              <td className="td-machinery-label">En espera (Hrs)</td>
              <td className="td-machinery-label">Sin Operador (hrs)</td>
              <td className="td-machinery-label">Horometro Inicial</td>
              <td className="td-machinery-label">Horometro Final</td>
            </tr>
            {equipmentList.length > 0 && (
              <>
                {equipmentList.map((data) => {
                  const selectedEquipmentPlate = equipmentPlateList.find((equipPlate) => {
                    return equipPlate.equipment === data.equipment
                  })
                  if (selectedEquipmentPlate) {
                    const selectedEquipment = equipment.find((eq) => {
                      return eq.id === selectedEquipmentPlate.equipment
                    })

                    const selectedPlate = selectedEquipment.plate.find((plate) => {
                      return plate.id === selectedEquipmentPlate.equipmentPlate
                    })

                    return (
                      <tr key={data.id}>
                        <td className="">{selectedEquipment.name ?? ''}</td>
                        <td className="">{selectedPlate.label ?? ''}</td>
                        <td className="">{data.actions.equipmentOfferedNumber}</td>
                        <td className="">{data.actions.equipmentCertifiedNumber}</td>
                        <td className="">{data.actions.equipmentWorkNumber}</td>
                        <td className="">{selectedEquipmentPlate.equipmentEffectiveTime}</td>
                        <td className="">
                          {selectedEquipmentPlate.equipmentCorrectiveMaintenance}
                        </td>
                        <td className="">
                          {selectedEquipmentPlate.equipmentPreventiveMaintenance}
                        </td>
                        <td className="">{selectedEquipmentPlate.equipmentOutOfService}</td>
                        <td className="">{selectedEquipmentPlate.equipmentWaiting}</td>
                        <td className="">{selectedEquipmentPlate.equipmentNoOperator}</td>
                        <td className="">{selectedEquipmentPlate.equipmentInitialHorometer}</td>
                        <td className="">{selectedEquipmentPlate.equipmentFinalHorometer}</td>
                      </tr>
                    )
                  }
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">VEHICULOS MENORES (NOMBRE)</td>
              <td className="td-machinery-label">PATENTE</td>
              <td className="td-machinery-label">N° Vehículos oferta</td>
              <td className="td-machinery-label">N° Vehículos Acreditados</td>
              <td className="td-machinery-label">N° Vehículos en Obra</td>
              <td className="td-machinery-label">Operativos (Hrs)</td>
              <td className="td-machinery-label">Mantención Correctiva (Hrs)</td>
              <td className="td-machinery-label">Mantención Preventiva (Hrs)</td>
              <td className="td-machinery-label">Fuera de Servicio (Hrs)</td>
              <td className="td-machinery-label">En espera (Hrs)</td>
              <td className="td-machinery-label">Sin Operador (hrs)</td>
              <td className="td-machinery-label">Horometro Inicial</td>
              <td className="td-machinery-label">Horometro Final</td>
            </tr>
            {vehicleList.length > 0 && (
              <>
                {vehicleList.map((data) => {
                  const selectedVehiclePlate = vehiclePlateList.find((vehPlate) => {
                    return vehPlate.vehicle === data.vehicle
                  })
                  if (selectedVehiclePlate) {
                    const selectedVehicle = vehicles.find((veh) => {
                      return veh.id === selectedVehiclePlate.vehicle
                    })

                    const selectedPlate = selectedVehicle.plate.find((plate) => {
                      return plate.id === selectedVehiclePlate.vehiclePlate
                    })

                    return (
                      <tr key={data.id}>
                        <td className="">{selectedVehicle.name ?? ''}</td>
                        <td className="">{selectedPlate.label ?? ''}</td>
                        <td className="">{data.actions.vehicleOfferedNumber}</td>
                        <td className="">{data.actions.vehicleCertifiedNumber}</td>
                        <td className="">{data.actions.vehicleWorkNumber}</td>
                        <td className="">{selectedVehiclePlate.vehicleEffectiveTime}</td>
                        <td className="">{selectedVehiclePlate.vehicleCorrectiveMaintenance}</td>
                        <td className="">{selectedVehiclePlate.vehiclePreventiveMaintenance}</td>
                        <td className="">{selectedVehiclePlate.vehicleOutOfService}</td>
                        <td className="">{selectedVehiclePlate.vehicleWaiting}</td>
                        <td className="">{selectedVehiclePlate.vehicleNoOperator}</td>
                        <td className="">{selectedVehiclePlate.vehicleInitialHorometer}</td>
                        <td className="">{selectedVehiclePlate.vehicleFinalHorometer}</td>
                      </tr>
                    )
                  }
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                DESCRIPCIÓN DE LAS ACTIVIDADES DESARROLLADAS
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">ID actividad Primavera</td>
              <td className="td-machinery-label">Nombre de actividad</td>
              <td className="td-machinery-label">Disciplina</td>
              <td className="td-machinery-label">Cantidad Total</td>
              <td className="td-machinery-label">Cantidad Acum anterior</td>
              <td className="td-machinery-label">Cantidad Real turno</td>
              <td className="td-machinery-label">% Avance Acumulado</td>
              <td className="td-machinery-label">Unidad</td>
              <td className="td-machinery-label">HH gastada Anterior</td>
              <td className="td-machinery-label">HH gastada Real Turno</td>
              <td className="td-machinery-label">HH gastada Acumulada</td>
            </tr>
            {activityList.length > 0 && (
              <>
                {activityList.map((activity) => {
                  return (
                    <tr key={activity.id}>
                      <td className="">{activity.primaveraId}</td>
                      <td className="">{activity.activityName}</td>
                      <td className="">{activity.activityDiscipline}</td>
                      <td className="">{activity.activityTotalAmount}</td>
                      <td className="">{activity.activityPreviousAcumulatedAmount}</td>
                      <td className="">{activity.activityActualShiftQuantity}</td>
                      <td className="">{activity.activityAccumulatedAcvancePercent}</td>
                      <td className="">{activity.activityUnit}</td>
                      <td className="">{activity.activityHoursSpendPrevius}</td>
                      <td className="">{activity.activityHoursSpendShift}</td>
                      <td className="">{activity.activityHoursAccumulated}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                CONTROL DE AGUAS INDUSTRIALES UTILIZAD
              </td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-machinery-label">VEHICULOS MENORES (NOMBRE)</td>
              <td className="td-machinery-label">PATENTE</td>
              <td className="td-machinery-label">Nombre Cachimba</td>
              <td className="td-machinery-label">m3</td>
            </tr>
            {aljibeList.length > 0 && (
              <>
                {aljibeList.map((al) => {
                  const selectedAljibe = aljibe.find((alji) => {
                    return alji.aljibe === aljibe.id
                  })

                  const selectedPlate = selectedAljibe.plate.find((plate) => {
                    return plate.id.toString() == al.aljibePlate.toString()
                  })

                  return (
                    <tr key={al.id}>
                      <td className="">{selectedAljibe?.name}</td>
                      <td className="">{selectedPlate?.label}</td>
                      <td className="">{al.aljibeCachimbaName}</td>
                      <td className="">{al.aljibeM3}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                COMENTARIOS Y ALERTAS EN GENERAL
              </td>
            </tr>
            <tr>
              <td className="">{comment.comment}</td>
            </tr>
          </tbody>
        </table>
        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                INCIDENTES, LESIONES O EVENTOS
              </td>
              <td className="td-label" style={{ textAlign: 'center' }}>
                NO CONFORMIDADES O INTERFERENCIAS
              </td>
            </tr>
            {incident.length > 0 && (
              <>
                {incident.map((inci) => {
                  return (
                    <tr key={inci.id}>
                      <td>{inci.incident}</td>
                      <td>{inci.nonConformity}</td>
                    </tr>
                  )
                })}
              </>
            )}
          </tbody>
        </table>
      </body>
    </html>
  )

  const html = ReactDOMServer.renderToStaticMarkup(element)

  return (
    <Document>
      <Page size="A1" orientation="landscape">
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}

export default Pdf
