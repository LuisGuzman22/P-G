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

  const { company, indirectWorkForceList, totalIndirectWorkForce, basicQuery } = props
  const { indirectPersonal } = basicQuery

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
      </body>
    </html>
  )

  const html = ReactDOMServer.renderToStaticMarkup(element)

  console.log('props', props)
  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <Html>{html}</Html>
      </Page>
    </Document>
  )
}

export default Pdf
