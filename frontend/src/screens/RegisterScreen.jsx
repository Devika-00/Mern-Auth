import { useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { useRegisterMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

import React from 'react'


const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [register, { isLoading }] = useRegisterMutation();

  useEffect(() => {
      if (userInfo) {
          navigate('/');
      }
  }, [navigate, userInfo]);

  const validateFields = () => {
      const nameRegex = /^[a-zA-Z ]+$/;
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      const errors = {};

      if (!name) {
          errors.name = 'Name is required';
      } else if (!nameRegex.test(name)) {
          errors.name = 'Enter a valid name (only alphabets and spaces allowed)';
      }

      if (!email) {
          errors.email = 'Email is required';
      } else if (!emailRegex.test(email)) {
          errors.email = 'Enter a valid email address';
      }

      if (!password) {
          errors.password = 'Password is required';
      } else if (password.length < 6) {
          errors.password = 'Password should contain at least 6 characters';
      }

      if (!confirmPassword) {
          errors.confirmPassword = 'Confirm Password is required';
      } else if (confirmPassword.length < 6) {
          errors.confirmPassword = 'Password should contain at least 6 characters';
      } else if (password !== confirmPassword) {
          errors.confirmPassword = 'Passwords do not match';
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

      if (password !== confirmPassword) {
          toast.error('Passwords do not match');
      } else {
          try {
              const res = await register({ name, email, password }).unwrap();
              dispatch(setCredentials({ ...res }));
              navigate('/');
          } catch (error) {
              toast.error(error?.data?.message || error.error);
          }
      }
  };

  return (
      <div>
          <FormContainer>
              <h1> Sign Up </h1>
              <Form onSubmit={submitHandler}>
                  <Form.Group className="my-2" controlId="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                          type="text"
                          placeholder="Enter Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && <div className="text-danger">{errors.name}</div>}
                  </Form.Group>

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

                  <Form.Group className="my-2" controlId="confirmPassword">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                          type="password"
                          placeholder="Confirm Password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                      {errors.confirmPassword && <div className="text-danger">{errors.confirmPassword}</div>}
                  </Form.Group>

                  {isLoading && <Loader />}
                  <Button type="submit" variant="primary" className="mt-3">
                      Sign Up
                  </Button>
                  <Row className="py-3">
                      <Col>
                          Already have an account? <Link to="/login">Login</Link>
                      </Col>
                  </Row>
              </Form>
          </FormContainer>
      </div>
  );
};

export default RegisterScreen;
