import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const AdminHero = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">Admin</h1>
          <div className="d-flex">
            <LinkContainer to="/dashboard">
              <Button variant="primary" className="me-3">
                Go to Dashboard
              </Button>
            </LinkContainer>
          </div>
        </Card>
      </Container>
    </div>
  )
}

export default AdminHero