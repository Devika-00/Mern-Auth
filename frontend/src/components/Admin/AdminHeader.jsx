import { Navbar, Nav, Container, NavDropdown} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch,useSelector } from "react-redux";
import { logout } from "../../slices/Admin/authSlice";
import { useNavigate } from "react-router-dom";
import {useAdminlogoutMutation} from '../../slices/Admin/adminApiSlice'

const AdminHeader = () => {
    const {adminInfo}=useSelector((state)=>state.adminauth)
    const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [logoutApiCall] = useAdminlogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/admin');
    } catch (err) {
      console.error(err);
    }
  };
   return (
    <header>
    <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>MERN Admin Auth</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
              {adminInfo?<NavDropdown title="Admin">
                  <LinkContainer to="/admin/dashboard">
                    <NavDropdown.Item>Dashboard</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>:<Nav.Item>Admin</Nav.Item>}     
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </header>
  )
}

export default AdminHeader