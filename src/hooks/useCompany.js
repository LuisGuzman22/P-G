import { useFetchCompany, useFetchContract } from './useFetch'
import { useEffect, useState } from 'react'
import axios, { HttpStatusCode } from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const useCompany = () => {
  const { data, isLoading, error, refetch, isRefetching } = useFetchCompany()

  return {
    data,
    isLoading,
    error,
    refetch,
    isRefetching,
  }
}

export default useCompany
