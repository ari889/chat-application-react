import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import Login from "./pages/login"
import Register from "./pages/register"
import Index from "./pages"

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
