import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/layout"
import Login from "./pages/login"
import Register from "./pages/register"
import Index from "./pages"
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
