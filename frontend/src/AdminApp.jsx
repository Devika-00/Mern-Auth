import { Outlet } from "react-router-dom"
import { Container } from "react-bootstrap"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import AdminHeader from "./components/Admin/AdminHeader"

function AdminApp() {
  // const [count, setCount] = useState(0)

  return (
    <>
    <AdminHeader/>
    <ToastContainer/>
    <Container className="my-2">
        <Outlet/>
    </Container>
    </>
  )
}

export default AdminApp