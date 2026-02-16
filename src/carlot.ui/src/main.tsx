import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DashboardPage from "./pages/DashboardPage.tsx"
import ListingDetailsPage from "./pages/ListingDetailsPage.tsx"
import HomePage from "./pages/HomePage.tsx"
import QueryProvider from "./providers/QueryProvider.tsx"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryProvider>
      <DashboardPage />
      {/* <ListingDetailsPage /> */}
      {/* <HomePage /> */}
    </QueryProvider>
  </StrictMode>
)
