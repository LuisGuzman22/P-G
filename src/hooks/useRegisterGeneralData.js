import { useEffect, useState } from 'react'

const useRegisterGeneralData = () => {
  const saveProject = (data) => {
    localStorage.setItem('project', JSON.stringify(data))
  }
  const saveContract = (data) => {
    localStorage.setItem('contract', JSON.stringify(data))
  }

  const getProject = () => {
    return localStorage.getItem('project')
  }
  const getContract = (data) => {
    return localStorage.getItem('contract')
  }

  return { saveProject, saveContract, getProject, getContract }
}

export default useRegisterGeneralData
