import React from 'react'
import { CCallout, CImage } from '@coreui/react'
const ProjectDescription = () => {
  return (
    <div className="project-description">
      <h2>Descripción del proyecto</h2>
      <div className="project-img-container">
        {/* <CImage fluid src="https://pgproject.cl/uploads/1705996608_a41c61e65ecf2a35c699.jpg" /> */}
      </div>

      <CCallout color="danger" style={{ textAlign: 'justify' }}>
        Minera Centinela, producto del crecimiento de su actividad, ha realizado un estudio de
        evaluación ambiental del proyecto &quot;Desarrollo Minera Centinela (DMC)&quot;, el cual
        señala que las Rutas B-229 y B-233 pasan por las futuras instalaciones, en una longitud de
        aproximadamente 24 km en la Ruta B-229 y de 17,5 km en la Ruta B-233, motivo por el cual se
        ha propuesto un nuevo trazado por el sector norte y oriente de las instalaciones mineras,
        que permita alcanzar los mismos destinos que las rutas actuales.
        <br />
        <br />
        Este nuevo trazado, que se ha denominado &quot;Ruta Oriente&quot;, el cual mejorará
        sustancialmente las características de las vías a reemplazar, tanto por condiciones
        geométricas como de infraestructura vial. Considerando que la variante proyectada tendrá una
        longitud aproximada de 51.218 Km, se ha contemplado mejorar significativamente el estándar
        general de la vía en la comuna de Sierra Gorda.
      </CCallout>
    </div>
  )
}

export default ProjectDescription
