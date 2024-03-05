import { useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
import {Form,Button,Row,Col} from 'react-bootstrap'
import { useDispatch,useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import React from 'react'



const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
      if (userInfo) {
          navigate('/');
      }
  }, [navigate, userInfo]);

  const [errors, setErrors] = useState({});

  const validateFields = () => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const errors = {};

      if (!email) {
          errors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
          errors.email = 'Enter a valid email address';
      }

      if (!password) {
          errors.password = 'Password is required';
      }

      return errors;
  };

  const submitHandler = async (e) => {
      e.preventDefault();

      // Validate fields before submitting
      const validationErrors = validateFields();
      if (Object.keys(validationErrors).length > 0) {
          setErrors(validationErrors);
          toast.error('Invalid input. Please check the errors.');
          return;
      }

      // Clear previous errors
      setErrors({});

      try {
          const res = await login({ email, password }).unwrap();
          dispatch(setCredentials({ ...res }));
          navigate('/');
      } catch (err) {
          toast.error(err?.data?.message || err.error);
      }
  };

  return (
      <div>
          <FormContainer>
              <h1> Sign In </h1>
              <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="email">
                      <Form.Label>Email Address</Form.Label>
                      <Form.Control
                          type="email"
                          placeholder="Enter Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                  </Form.Group>

                  <Form.Group className="my-2" controlId="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="Enter Password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                  </Form.Group>

                  {isLoading && <Loader />}

                  <Button type="submit" variant="primary" className="mt-3">
                      Sign In
                  </Button>
                  <Row className="py-3">
                      <Col>
                          New Customer? <Link to="/register">Register</Link>
                      </Col>
                  </Row>
              </Form>
          </FormContainer>
      </div>
  );
};

export default LoginScreen;

