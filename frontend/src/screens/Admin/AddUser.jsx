import { useState} from "react";
import { Form, Button} from "react-bootstrap";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import {toast} from 'react-toastify'
import { useNavigate } from "react-router-dom";
import { useAdminadduserMutation } from "../../slices/Admin/adminApiSlice";
import { validate } from "../../validations/userRegisterVal";

const AddUser = () => {
    const initialValues={name:'',email:'',password:'',confirmPassword:''}
    const [formValues,setFormValues]=useState(initialValues)
    const [formErrors,setFormErrors]=useState('')
  
      const navigate=useNavigate()
      const [adduser,{isLoading}]=useAdminadduserMutation()
  
      const handleChange=(e)=>{
        const {name,value}=e.target
        setFormValues({...formValues,[name]:value})
      }
  
      const submitHndler = async (e) => {
        e.preventDefault();
        const errors=validate(formValues)
        setFormErrors(errors)
        if(Object.keys(errors).length===0){
        
            try {
              await adduser(formValues).unwrap();
              navigate("/admin/dashboard");
            } catch (err) {
              toast.error(err?.data?.message || err?.error);
            }
          
        }};
      
    return (
      <FormContainer>
        <h2 className="text-center">Add New User</h2>
        <Form onSubmit={submitHndler}>
          <Form.Group className="my-3" controlId="name">
            <Form.Control
              type="name"
              name="name"
              placeholder="Enter Name"
              value={formValues.name}
              onChange={handleChange}
            />
            <p style={{color:'red', fontSize: '12px'}}>{formErrors.name}</p>
          </Form.Group>
          <Form.Group className="my-3" controlId="email">
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formValues.email}
              onChange={handleChange}
            />
            <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
          </Form.Group>
          <Form.Group className="my-3" controlId="password">
            <Form.Control
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <p style={{color:'red', fontSize: '12px'}}>{formErrors.password}</p>
          </Form.Group>
          <Form.Group className="my-3" controlId="confirmPassword">
            <Form.Control
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              onChange={handleChange}
            />
            <p style={{color:'red', fontSize: '12px'}}>{formErrors.confirmPassword}</p>
          </Form.Group>
         
         
          {isLoading&& <Loader/>}
          <Button type="submit" variant="primary" className='mt-3 mx-auto d-block'>
            Add
          </Button>
        </Form>
      </FormContainer>
    )
  }
  
  export default AddUser