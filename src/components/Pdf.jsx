/* eslint-disable react/prop-types */
import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: 'white',
    // width: 2000,
  },
  section: {
    marginTop: 10,
    flexGrow: 1,
  },
  titleSection: {
    paddingLeft: 42,
    paddingRight: 42,
    flexGrow: 40,
    textAlign: 'center',
    marginTop: 5,
    title: {
      backgroundColor: '#006666',
      color: 'white',
      fontSize: 12,
    },
  },
  laboralWorkerSection: {
    // paddingLeft: 42,
    // paddingRight: 42,
    flexGrow: 2000,
    table: {
      paddingLeft: 42,
      paddingRight: 42,
      display: 'table',
      width: '100%',
      borderStyle: 'solid',
      // borderWidth: 1,
      // borderRightWidth: 0,
      // borderBottomWidth: 0,
    },
    tableRow: {
      margin: 'auto',
      flexDirection: 'row',
    },
    tableCol: {
      width: '13%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
    },
    tableColPrimary: {
      width: '22%',
      borderStyle: 'solid',
      borderWidth: 1,
      borderLeftWidth: 0,
      borderTopWidth: 0,
      backgroundColor: '#006666',
      color: 'white',
    },

    tableCell: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 10,
    },
    tableCellPrimary: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 10,
    },
    tableCellTwoColumns: {
      margin: 'auto',
      marginTop: 5,
      fontSize: 10,
      rowGap: 2,
    },
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    // borderWidth: 1,
    // borderRightWidth: 0,
    // borderBottomWidth: 0,
  },
  tableRow: {
    margin: 'auto',
    flexDirection: 'row',
  },
  tableCol: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColPrimary: {
    width: '15%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#006666',
    color: 'white',
  },

  tableCell: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  tableCellPrimary: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
  },
  tableCellTwoColumns: {
    margin: 'auto',
    marginTop: 5,
    fontSize: 10,
    rowGap: 2,
  },
  image: {
    width: 500,
    height: 500,
  },
})

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

  const { company, indirectWorkForceList, basicQuery } = props

  console.log('props', props)
  return (
    <Document>
      <Page size="A4" orientation="landscape">
        <View style={styles.section}>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Informe diario N°</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportNumber}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Clima</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportWeather}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Fecha</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportDate}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Nombre de contratista</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportContratistName}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Personal Directo</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Personal Indirecto</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>N° de Contrato</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{contractLS.id}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportDirectPersonalShift}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportIndirectPersonalShift}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Nombre de Contrato</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportContractName}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Horas Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportDirectPersonalHours}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Horas Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportIndirectPersonalHours}</Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Nombre del Administrador de Contrato</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportContractManagerName}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Jornada</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportDirectPersonalJourney}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Jornada</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportIndirectPersonalJourney}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.titleSection}>
          <Text style={styles.titleSection.title}>FUERZA LABORAL CONTRATISTA</Text>
        </View>
        <View style={styles.laboralWorkerSection}>
          <View style={styles.laboralWorkerSection.table}>
            <View style={styles.laboralWorkerSection.tableRow}>
              <View style={styles.laboralWorkerSection.tableColPrimary}>
                <Text style={styles.laboralWorkerSection.tableCell}>Indirectos</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}>N° Ofertado</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}>N° Contratados</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}>Acreditados</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}>N° Descanso</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}> N° Obra</Text>
              </View>
              <View style={styles.laboralWorkerSection.tableCol}>
                <Text style={styles.laboralWorkerSection.tableCell}>HH (turno) </Text>
              </View>
            </View>
            {/* <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Nombre de contratista</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportContratistName}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Personal Directo</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}></Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Personal Indirecto</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}></Text>
              </View>
            </View>
            <View style={styles.tableRow}>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>N° de Contrato</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{contractLS.id}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportDirectPersonalShift}</Text>
              </View>
              <View style={styles.tableColPrimary}>
                <Text style={styles.tableCell}>Turno</Text>
              </View>
              <View style={styles.tableCol}>
                <Text style={styles.tableCell}>{company?.dailyReportIndirectPersonalShift}</Text>
              </View>
            </View> */}
          </View>
        </View>
      </Page>
    </Document>
  )
}

export default Pdf
