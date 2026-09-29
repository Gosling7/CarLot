import { RouterProvider } from "react-router";
import QueryProvider from "@/app/providers/QueryProvider";
import { router } from "@/app/router";

export default function App() {
  return (
    <QueryProvider>
      <RouterProvider router={router} />
    </QueryProvider>
  )
}
