import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./layout/Layout"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Index from "./pages/Index"
import useAuthCheck from "./hooks/useAuthcheck"
import PublicRoute from "./components/PublicRoute"
import PrivateRoute from "./components/PrivateRoute"

function App() {
  const authChecked = useAuthCheck();

  // create socket
  const socket = io(import.meta.env.VITE_REACT_APP_API__URL, {
    reconnectionDelay: 200,
    reconnection: true,
    reconnectionAttempts: 10,
    transports: ["websocket"],
    agent: false,
    upgrade: false,
    rejectUnauthorized: false
  });

  socket.on("message", (data) => {
    console.log(data)
  });

  return !authChecked ? (
    <div>Checking authenticatyion...</div>
  ) : (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/inbox'>
            <Route index element={<PrivateRoute><Index /></PrivateRoute>} />
            <Route path=":id" element={<PrivateRoute><Index /></PrivateRoute>} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
