import React from 'react'
import { CCallout, CImage } from '@coreui/react'
const ProjectDescription = () => {
  return (
    <div className="project-description">
      <h2>Descripción del proyecto</h2>
      <div className="project-img-container">
        <CImage fluid src="https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg" />
      </div>

      <CCallout color="danger">
        Las estaciones de Bombeo EB-01, EB-02 y EB-03 incorporación de medidas de tensión para el
        sistema de información en tiempo real (SITR), obteniendo valores de potencia activa,
        potencia reactiva y frecuencia, datos que deben ser enviados al coordinador Eléctrico
        Nacional (CEN) e incorporar un esquema de medida con fines de facturación para clientes
        internos de MCEN y conectarlos a la red Ethernet existente. Las capacidades actuales de los
        TT/CC de MCEN se encuentran copadas, no permitiendo su uso para los requerimientos de este
        proyecto, además la clase de medida actual (0,6), no permite una medición confiable de los
        parámetros del sistema como exige la Norma, la solución a este inconveniente se traduce en
        la instalación de transformadores combinados de corriente y tensión.
      </CCallout>
    </div>
  )
}

export default ProjectDescription
