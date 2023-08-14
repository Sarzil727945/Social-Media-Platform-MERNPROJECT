import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/Routers';

import AuthProvider, { AuthContext } from './AuthProvider/AuthProvider';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { DataProvider } from './DataProvider/DataProvider';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <DataProvider>
          <div>
            <RouterProvider router={router} />
          </div>
        </DataProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
