import { RouterProvider } from "react-router-dom"
import Router from "./routes/routes"
function App() {
  return (
    <div className="p-2 bg-emerald-300 h-screen">
    <RouterProvider router={Router} />
    </div>
  )
}

export default App
