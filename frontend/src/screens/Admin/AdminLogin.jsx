import { useState,useEffect} from 'react';
import { Form, Button} from 'react-bootstrap';
import FormContainer from '../../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector} from 'react-redux';
import { useAdminloginMutation } from '../../slices/Admin/adminApiSlice';
import { setAdminCredentials } from '../../slices/Admin/authSlice';
import Loader from '../../components/Loader';
import {toast} from "react-toastify"
import { validate } from '../../validations/userLogin';

const AdminLogin = () => {
  const initialValues={email:'',password:''}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState('')

    const dispatch=useDispatch()
    const navigate=useNavigate()

    const {adminInfo}=useSelector((state)=>state.adminauth)

    const handleChange=(e)=>{
      
      const {name,value}=e.target
      setFormValues({...formValues,[name]:value})
    }

    const [adminLogin,{isLoading}]=useAdminloginMutation();

    const submitHandler = async (e) => {
      e.preventDefault();
      const errors=validate(formValues)
      setFormErrors(errors)

      if(Object.keys(errors).length===0){
        try {
          const res = await adminLogin(formValues).unwrap();

          dispatch(setAdminCredentials({ ...res }));
          
          toast.success("Successfully logged in");

          navigate('/admin/dashboard');

        } catch (err) {
          console.error(err);

            toast.error(err?.data?.message || err?.error);
          
        }
      }};

    useEffect(() => {
        if (adminInfo) {
          navigate('/admin/dashboard');
        }
      }, [navigate, adminInfo]);

  return (
    <FormContainer>
    <h2 className='text-center'>Admin Login</h2>

    <Form onSubmit={submitHandler}>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={formValues.email}
          onChange={handleChange}
        ></Form.Control>
        <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
      </Form.Group>

      <Form.Group className='my-2' controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          placeholder='Enter password'
          value={formValues.password}
          onChange={handleChange}
        ></Form.Control>
        <p style={{color:'red', fontSize: '12px'}}>{formErrors.password}</p>
      </Form.Group>

      {isLoading&&<Loader/>}
      <Button
        type='submit'
        variant='primary'
        className='mt-3 mx-auto d-block'
      >
        Sign In
      </Button>
    </Form>
  </FormContainer>
  )
}

export default AdminLogin
