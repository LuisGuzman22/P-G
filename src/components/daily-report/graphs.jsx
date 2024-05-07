/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { getStyle } from '@coreui/utils'
import { Chart } from 'react-google-charts'
import { toPng } from 'html-to-image'

const Graphs = (props) => {
  const columnChartElement = useRef(null)
  const pieChartElement = useRef(null)

  const { isOpen } = props

  const {
    asarcoMachineryList: asarcoMachineryListContext,
    totalDirectWorkForce: totalDirectWorkForceContext,
    storeGraphs,
  } = useRegisterDailyReportCompany()

  const [imagenColumnChart, setImagenColumnChart] = useState()
  const [imagenPieChart, setImagenPieChart] = useState()

  const [effectiveTime, setEffectiveTime] = useState(0)
  const [scheduleMaintimeTime, setScheduleMaintimeTime] = useState(0)
  const [scheduleDelay, setScheduleDelay] = useState(0)
  const [opperationalLoss, setOpperationalLoss] = useState(0)
  const [unscheduleMaintimeTime, setUnscheduleMaintimeTime] = useState(0)
  const [unscheduleDelay, setUnscheduleDelay] = useState(0)
  const [reserves, setReserves] = useState(0)
  const [totals, setTotals] = useState(0)
  const [totalPlanedDotation, setTotalPlanedDotation] = useState(0)
  const [totalWorkDotation, setTotalWorkDotation] = useState(0)
  useEffect(() => {
    for (let asarcoData of asarcoMachineryListContext) {
      setTotals(
        totals +
          Number(asarcoData.asarcoMachineryEffectiveTime) +
          Number(asarcoData.asarcoMachineryScheduleMaintenance) +
          Number(asarcoData.asarcoMachineryScheduleDelay) +
          Number(asarcoData.asarcoMachineryOpperationalLoss) +
          Number(asarcoData.asarcoMachineryUnscheduleMaintenance) +
          Number(asarcoData.asarcoMachineryUnscheduleDelay) +
          Number(asarcoData.asarcoMachineryReserves),
      )
      setEffectiveTime(effectiveTime + Number(asarcoData.asarcoMachineryEffectiveTime))
      setScheduleMaintimeTime(
        scheduleMaintimeTime + Number(asarcoData.asarcoMachineryScheduleMaintenance),
      )
      setScheduleDelay(scheduleDelay + Number(asarcoData.asarcoMachineryScheduleDelay))
      setOpperationalLoss(opperationalLoss + Number(asarcoData.asarcoMachineryOpperationalLoss))
      setUnscheduleMaintimeTime(
        unscheduleMaintimeTime + Number(asarcoData.asarcoMachineryUnscheduleMaintenance),
      )
      setUnscheduleDelay(unscheduleDelay + Number(asarcoData.asarcoMachineryUnscheduleDelay))
      setReserves(reserves + Number(asarcoData.asarcoMachineryReserves))
    }
  }, [asarcoMachineryListContext])

  useEffect(() => {
    setTotalPlanedDotation(totalDirectWorkForceContext.directSubtotalOfferedNumber)
    setTotalWorkDotation(totalDirectWorkForceContext.directSubtotalWorkNumber)
  }, [totalDirectWorkForceContext])

  useEffect(() => {
    if (isOpen) {
      setImagenColumnChart()
      setImagenPieChart()
    }
  }, [isOpen])

  const convertAsarcoChart = () => {
    setImagenPieChart()
    toPng(pieChartElement.current, { cacheBust: false })
      .then((dataUrl) => {
        setImagenPieChart(dataUrl)
        // storeGraphs({ asarcoChart: dataUrl })
      })
      .catch((err) => {
        // console.log('ERROR', err)
      })
  }

  const convertDotationChart = () => {
    setImagenColumnChart()
    toPng(columnChartElement.current, { cacheBust: false })
      .then((dataUrl) => {
        setImagenColumnChart(dataUrl)
        // storeGraphs({ dotationChart: dataUrl })
      })
      .catch((err) => {})
  }

  useEffect(() => {
    storeGraphs({ dotationChart: imagenColumnChart, asarcoChart: imagenPieChart })
  }, [imagenColumnChart, imagenPieChart])
  useEffect(() => {
    if (isOpen) {
      if (imagenColumnChart === 'data:,' || imagenColumnChart === undefined) {
        // VALIDAR EL CAMBIO DE DATOS DEL GRAFICO POST CREACION
        convertDotationChart()
      }
    }
  }, [isOpen, imagenColumnChart])

  useEffect(() => {
    if (isOpen) {
      if (imagenPieChart === 'data:,' || imagenPieChart === undefined) {
        convertAsarcoChart()
      }
    }
  }, [isOpen, imagenPieChart])

  const barGraphData = [
    ['Dotación', 'Dotación', { role: 'style' }],
    ['Dotación Planeada Directos Total', totalPlanedDotation, '#b87333'], // RGB value
    ['Dotación Directos Obra Total', totalWorkDotation, 'silver'], // English color name
  ]
  const piechartData = [
    ['Task', 'Hours per Day'],
    ['Tiempo Efectivo (Hrs)', effectiveTime],
    ['Mantención Programada (Hrs)', scheduleMaintimeTime],
    ['Demora Programada (Hrs)', scheduleDelay],
    ['Perdida Operacional (Hrs)', opperationalLoss],
    ['Mantención No Programada (Hrs)', unscheduleMaintimeTime],
    ['Demora No Programada (Hrs)', unscheduleDelay],
    ['Reservas (Hrs)', reserves],
  ]

  return (
    <div className="work-force-report">
      {asarcoMachineryListContext && asarcoMachineryListContext.length > 0 && (
        <div ref={pieChartElement}>
          <Chart chartType="PieChart" data={piechartData} width={'100%'} height={'300px'} />
        </div>
      )}
      {totalDirectWorkForceContext.directSubtotalOfferedNumber && (
        <div ref={columnChartElement}>
          <Chart chartType="ColumnChart" width="100%" height="300px" data={barGraphData} />
        </div>
      )}
    </div>
  )
}

export default Graphs
