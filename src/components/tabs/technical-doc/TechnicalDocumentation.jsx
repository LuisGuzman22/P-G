import React, { useEffect, useState } from 'react'
import {
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardTitle,
  CCardText,
  CButton,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from '@coreui/react'
import ModalAddTechnicalDoc from '../../maintainers/tech-doc/ModalAddTechnicalDoc'
import useTechnicalDoc from 'src/hooks/useTechnicalDoc'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

const TechnicalDocumentation = () => {
  const [visibleTechnicalDoc, setVisibleTechnicalDoc] = useState(false)
  const { data, isLoading, isRefetching } = useTechnicalDoc()
  const [categories, setCategories] = useState([])

  useEffect(() => {
    if (data)
      setCategories(
        data
          .map((item) => item.category)
          .filter((value, index, self) => self.indexOf(value) === index),
      )
  }, [data])

  return (
    <div className="technicalDocumentation">
      {visibleTechnicalDoc && (
        <ModalAddTechnicalDoc
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleTechnicalDoc(data)
            // await refetch()
          }}
        />
      )}

      {isLoading || isRefetching ? (
        <Skeleton count={5} />
      ) : (
        <CRow>
          <CCol sm={12}>
            <CCard>
              <CCardBody>
                <CCardText>
                  <CAccordion activeItemKey={1}>
                    {categories &&
                      categories.map((category) => (
                        <CAccordionItem itemKey={category} key={category}>
                          <CAccordionHeader>{category}</CAccordionHeader>
                          <CAccordionBody>
                            {data
                              .filter((item) => item.category === category)
                              .map((item, index) => {
                                return (
                                  <p key={index}>
                                    {/* <a href={item.url}>{item.url}</a> */}
                                    <Link
                                      to={`https://dev.pgproject.cl${item.url}`}
                                      target="_blank"
                                      download
                                    >
                                      {item.url.split('/')[4]}
                                    </Link>
                                  </p>
                                )
                              })}
                          </CAccordionBody>
                        </CAccordionItem>
                      ))}
                  </CAccordion>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
          {/* <CCol sm={4}>
            <CCard className="actions-card">
              <CCardBody>
                <CCardTitle>Acciones</CCardTitle>
                <CCardText>
                  <CRow>
                    <CButton>Ir a ACONEX</CButton>
                  </CRow>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol> */}
        </CRow>
      )}
    </div>
  )
}

export default TechnicalDocumentation
