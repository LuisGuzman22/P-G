import { React, useEffect, useState } from 'react'
import { CCard, CCardBody, CButton } from '@coreui/react'
import Skeleton from 'react-loading-skeleton'
import './css.scss'
import useWeather from 'src/hooks/useWeather'
import WeatherList from './WeatherList'
import ModalAddWeather from './ModalAddWeather'
import ModalRestoreWeather from './ModalRestoreWeather'
import { useNavigate } from 'react-router-dom'
import { usePermissions } from 'src/providers/PermissionsProvider'

const WeatherMaintainer = () => {
  const { isLoading, refetch, isRefetching } = useWeather()
  let navigate = useNavigate()

  const [visibleWeather, setVisibleWeather] = useState(false)
  const [visibleRestoreWeather, setVisibleRestoreWeather] = useState(false)

  const { hasPermission } = usePermissions()

  const redirectTo = (url) => {
    navigate(url)
  }

  useEffect(() => {
    if (!hasPermission('weather_create')) {
      redirectTo('/inicio')
    }
  }, [])

  return (
    <div className="weather-maintainer">
      <h2 className="title">Administrar Clima</h2>
      {visibleWeather && (
        <ModalAddWeather
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleWeather(data)
            await refetch()
          }}
        />
      )}

      {visibleRestoreWeather && (
        <ModalRestoreWeather
          visible={true}
          sendDataToParent={async (data) => {
            setVisibleRestoreWeather(data)
            await refetch()
          }}
        />
      )}
      {hasPermission('weather_create') && (
        <CCard className="action-buttons">
          <CCardBody>
            <CButton className="btn-modal" onClick={() => setVisibleWeather(!visibleWeather)}>
              Añadir Clima
            </CButton>
            <CButton
              className="btn-modal"
              onClick={() => setVisibleRestoreWeather(!visibleRestoreWeather)}
            >
              Ver eliminados
            </CButton>
          </CCardBody>
        </CCard>
      )}
      <CCard>
        <CCardBody>
          {isLoading || isRefetching ? <Skeleton count={5} /> : <WeatherList />}
        </CCardBody>
      </CCard>
    </div>
  )
}

export default WeatherMaintainer
