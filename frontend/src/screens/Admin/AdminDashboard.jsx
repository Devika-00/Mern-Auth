import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useAdmindeleteuserMutation } from '../../slices/Admin/adminApiSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import { Col, Container, Form, Row, Card } from "react-bootstrap";


const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [search,setSearch]=useState('')

  const navigate=useNavigate()
  const [deleteUser]=useAdmindeleteuserMutation()

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/admin/dashboard');
        const data = await response.json();
        if (response.ok) {
          setUsers(data?.users);
        } else {
          console.error(data.message || 'Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const deleteHandler=async(userId)=>{
    try {
      await deleteUser({userId}).unwrap()
      toast.success("Deleted Successfully!");
      fetchUsers()
      navigate("/admin/dashboard")
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const editHandler=async(id)=>{
    try {
      navigate(`/admin/edituser?id=${id}`)
    } catch (err) {
      toast.error(err?.data?.message || err?.error);
    }
  }

  const handleSearch=async()=>{
    try {
      const response = await fetch(`/api/admin/dashboard?search=${search}`);
      const data = await response.json();
      if (response.ok) {
        setUsers(data?.users);
      } else {
        console.error(data.message || 'Failed to fetch users');
      }
    } catch (err) {
      console.error('Error searching users:', err.message);
    }
  }

  const handleAddUser=async()=>{
    try {
      navigate('/admin/addUser')
    } catch (err) {
      console.error('Error while Navigating:', err.message);
    }
  }

  return (
    <>
    <Container className="mt-5 mb-5">
      <Row>
        <Col className="text-center mb-3">
          <h2>Admin Dashboard</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Container className="mt-3">
            <Card bg="secondary">
              <Card.Body>
                <Row>
                  <Col sm={4}>
                    <Form className="d-flex">
                      <Form.Control
                        type="text"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                        }}
                      />
                      <Button onClick={handleSearch}>Search</Button>
                    </Form>
                  </Col>
                  <Col sm={8} className="text-end">
                    <Button onClick={handleAddUser}>Add User</Button>
                  </Col>
                </Row>
                <Table striped bordered hover className="mt-3">
                  <thead>
                    <tr>
                      <th>#ID</th>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((data) => (
                      <tr key={data._id}>
                        <td>{data._id}</td>
                        <td>{data.name}</td>
                        <td>{data.email}</td>
                        <td>
                          <Button variant="dark" size="sm" onClick={() => editHandler(data._id)} className='mx-2'>Edit</Button>
                          <Button variant="dark" size="sm" onClick={() => deleteHandler(data._id)}>Delete</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Container>
        </Col>
      </Row>
    </Container>
  </>
  );
};

export default AdminDashboard;