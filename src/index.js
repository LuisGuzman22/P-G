import 'react-app-polyfill/stable'
import 'core-js'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './store'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { DailyReportProvider } from './context/DailyReportContext'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createSyncStoragePersister } from '@tanstack/query-sync-storage-persister'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
      retry: 3,
      retryDelay: 1000,
      cacheTime: 60000 * 60 * 24,
      cacheTime: 60000 * 60 * 24,
      refetchInterval: 60000 * 60,
      staleTime: 60000 * 60,
      refetchType: 'all',
    },
  },
})

const persister = createSyncStoragePersister({
  storage: window.localStorage,
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <DailyReportProvider>
        <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
          <App />
        </PersistQueryClientProvider>
        ,
      </DailyReportProvider>
    </QueryClientProvider>
  </Provider>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
