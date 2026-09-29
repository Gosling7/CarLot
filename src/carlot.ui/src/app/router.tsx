import { createBrowserRouter, Navigate } from "react-router";
import HomePage from "@/pages/HomePage";
import ListingDetailsPage from "@/pages/ListingDetailsPage";
import DashboardPage from "@/pages/DashboardPage";

export const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/listings/:listingId", element: <ListingDetailsPage /> },
  { path: "/dashboard", element: <DashboardPage /> },
  { path: "*", element: <Navigate to="/" replace /> },
]);
