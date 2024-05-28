import { React, useEffect, useState } from 'react'
import { CFormInput, CFormTextarea, CRow, CCol } from '@coreui/react'
import useRegisterDailyReportCompany from 'src/hooks/useRegisterDailyReportCompany'
import { useLocation } from 'react-router-dom'
import firma2 from 'src/assets/images/firma2.png'
import { v4 as uuidv4 } from 'uuid'

const PhotoRecord = () => {
  const MAX_IMAGES = 5
  const currentLocation = useLocation().pathname
  const isViewMode = currentLocation.includes('/view')
  const isCreatingMode = currentLocation === '/informe-diario'

  const { photoList: photoListContext, storePhoto, removePhoto } = useRegisterDailyReportCompany()

  const useFileState = (initialCount) => {
    const [items, setItems] = useState(
      Array.from({ length: initialCount }, () => ({ file: null, description: '', urlImg: '' })),
    )

    const setFileAndDescription = (index, file, description) => {
      setItems((prevItems) => {
        const newItems = [...prevItems]
        const blob = file || file !== null ? file.slice(0, file.size, file.type) : undefined
        const newFile = blob
          ? new File([blob], `${uuidv4().split('-')[0]}.png`, { type: 'image/png' })
          : undefined
        const urlImg = newFile ? URL.createObjectURL(newFile) : undefined
        newItems[index] = { file: newFile, description, urlImg }
        return newItems
      })
    }

    return [items, setFileAndDescription]
  }

  const [items, setFileAndDescription] = useFileState(5) // Adjust the number of files as needed

  useEffect(() => {
    if (!isViewMode) storePhoto(items)
  }, [items])

  const onChangeFile = (pos, e) => {
    if (pos >= 0 && pos < items.length) {
      const file = e.target.files[0]
      const description = items[pos].description // Retain the current description
      setFileAndDescription(pos, file, description)
    }
  }

  const onChangeDescription = (pos, e) => {
    if (pos >= 0 && pos < items.length) {
      const file = items[pos].file // Retain the current file
      const description = e.target.value
      setFileAndDescription(pos, file, description)
    }
  }

  return (
    <div className="work-force-report">
      <section>
        {Array.from({ length: MAX_IMAGES }, (_, i) => (
          <CRow key={i}>
            <CCol>
              <CFormInput
                type="text"
                id={`photoDescription-${i}`}
                label={'Descripción'}
                // value={equipmentPlate.equipmentCorrectiveMaintenance || ''}
                text=""
                onChange={(e) => onChangeDescription(i, e)}
              />
            </CCol>
            <CCol>
              <CFormInput
                type="file"
                id={`photo-${i}`}
                aria-describedby="inputGroupFileAddon03"
                onChange={(e) => {
                  onChangeFile(i, e)
                }}
                label="Fotografía"
                aria-label="Upload"
                accept="image/png, image/jpeg"
              />
            </CCol>
            <CCol>
              <img src={items[i].urlImg} style={{ width: '70%' }} />
            </CCol>
          </CRow>
        ))}
      </section>
    </div>
  )
}

export default PhotoRecord
