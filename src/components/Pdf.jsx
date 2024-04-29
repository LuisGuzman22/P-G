/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import useRegisterGeneralData from 'src/hooks/useRegisterGeneralData'
import useGetCachedQueryData from 'src/hooks/useGetCachedQueryData'
import { Html } from 'react-pdf-html'
import ReactDOMServer from 'react-dom/server'
// import ChartJsImage from 'chartjs-to-image'

/**
 * 
 * @returns         <View>
          <Image
            style={styles.image}
            src="https://images.pexels.com/photos/20066389/pexels-photo-20066389/free-photo-of-a-bubble-is-floating-in-the-sky-over-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </View>
 */
const Pdf = () => {
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
          background-color: #3c7d23;
          color: white;
        }
        .td-total-label{
          background-color: #ffcc66;
        }
        .td-label {
          background-color: #006666;
          color: white;
        }`}
        </style>

        <table border={1}>
          <tbody>
            <tr>
              <td className="td-label" style={{ textAlign: 'center' }}>
                COMENTARIOS Y ALERTAS EN GENERAL
              </td>
            </tr>
            <tr></tr>
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
