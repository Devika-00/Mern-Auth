import { useState,useEffect } from "react";
import {Link,useNavigate} from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer';
import {toast} from 'react-toastify'
import Loader from '../components/Loader'
import { setCredentials } from "../slices/authSlice";
import { useUpdateUserMutation } from "../slices/usersApiSlice";


import React from 'react'



const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
      setName(userInfo.name);
      setEmail(userInfo.email);
  }, [userInfo.name, userInfo.email]);

  const [errors, setErrors] = useState({});

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

      if (password.length > 0 && password.length < 6) {
          errors.password = 'Password should contain at least 6 characters';
      }

      if (confirmPassword.length > 0 && confirmPassword.length < 6) {
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
              const res = await updateProfile({
                  _id: userInfo._id,
                  name,
                  email,
                  password,
              }).unwrap();
              dispatch(setCredentials(res));
              toast.success('Profile updated successfully');
          } catch (err) {
              toast.error(err?.data?.message || err.error);
          }
      }
  };

  return (
      <div>
          <FormContainer>
              <h1> Update Profile </h1>
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
                      {errors.confirmPassword && (
                          <div className="text-danger">{errors.confirmPassword}</div>
                      )}
                  </Form.Group>

                  {isLoading && <Loader />}

                  <Button type="submit" variant="primary" className="mt-3">
                      Update
                  </Button>
              </Form>
          </FormContainer>
      </div>
  );
};

export default ProfileScreen;
