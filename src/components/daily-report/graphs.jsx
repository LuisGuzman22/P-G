import React, { useEffect, useState } from 'react'
import { CChart } from '@coreui/react-chartjs'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { getStyle } from '@coreui/utils'

const Graphs = () => {
  const {
    asarcoMachineryList: asarcoMachineryListContext,
    totalDirectWorkForce: totalDirectWorkForceContext,
  } = useRegisterDailyReportCompany()

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

  return (
    <div className="work-force-report">
      {asarcoMachineryListContext && asarcoMachineryListContext.length > 0 && (
        <>
          <CChart
            type="pie"
            data={{
              labels: [
                'Tiempo Efectivo (Hrs)',
                'Mantención Programada (Hrs)',
                'Demora Programada (Hrs)',
                'Perdida Operacional (Hrs)',
                'Mantención No Programada (Hrs)',
                'Demora No Programada (Hrs)',
                'Reservas (Hrs)',
              ],
              datasets: [
                {
                  labels: [
                    'Tiempo Efectivo (Hrs)',
                    'Mantención Programada (Hrs)',
                    'Demora Programada (Hrs)',
                    'Perdida Operacional (Hrs)',
                    'Mantención No Programada (Hrs)',
                    'Demora No Programada (Hrs)',
                    'Reservas (Hrs)',
                  ],
                  hoverOffset: 4,
                  backgroundColor: [
                    '#41B883',
                    '#E46651',
                    '#00D8FF',
                    '#DD1B16',
                    '#F41203',
                    '#002312',
                    '#A12942',
                  ],
                  data: [
                    // 1, 2, 3, 4, 5, 6, 7,
                    ((effectiveTime / totals) * 100).toFixed(2),
                    ((scheduleMaintimeTime / totals) * 100).toFixed(2),
                    ((scheduleDelay / totals) * 100).toFixed(2),
                    ((opperationalLoss / totals) * 100).toFixed(2),
                    ((unscheduleMaintimeTime / totals) * 100).toFixed(2),
                    ((unscheduleDelay / totals) * 100).toFixed(2),
                    ((reserves / totals) * 100).toFixed(2),
                  ],
                },
              ],
            }}
            options={{
              showAllTooltips: true,
              interaction: {
                intersect: false,
                mode: 'index',
              },
              plugins: {
                title: {
                  display: true,
                  // text: (ctx) => 'Tooltip position mode: ' + ctx.chart.options.plugins.tooltip.position,
                },
              },

              //   plugins: {
              //     legend: {
              //       labels: {
              //         color: getStyle('--cui-body-color'),
              //       },
              //     },
              //   },
            }}
          />
        </>
      )}
      {totalDirectWorkForceContext && (
        <>
          <CChart
            type="bar"
            data={{
              labels: ['Dotación Planeada Directos Total', 'Dotación Directos Obra Total'],
              datasets: [
                {
                  label: 'Dotación Directa Total',
                  backgroundColor: ['rgba(0,103,102,255)', 'rgba(239,132,60,255)'],
                  borderColor: 'rgb(255, 99, 132)',
                  data: [totalPlanedDotation, totalWorkDotation],
                },
              ],
            }}
            labels="Dotación Directa Total"
            options={{
              plugins: {
                legend: {
                  labels: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
              scales: {
                x: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
                y: {
                  grid: {
                    color: getStyle('--cui-border-color-translucent'),
                  },
                  ticks: {
                    color: getStyle('--cui-body-color'),
                  },
                },
              },
            }}
          />
        </>
      )}
    </div>
  )
}

export default Graphs
