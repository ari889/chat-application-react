import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import useAuthCheck from "./hooks/useAuthcheck"
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const authChecked = useAuthCheck();

  return !authChecked ? (
    <div>Checking authenticatyion...</div>
  ) : (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/inbox" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/inbox/:id" element={<PrivateRoute><Index /></PrivateRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
