import { useState,useEffect} from 'react';
import FormContainer from '../../components/FormContainer';
import { Form, Button} from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import {toast} from 'react-toastify'
import { useAdminupdateuserMutation } from '../../slices/Admin/adminApiSlice';
import { useNavigate } from 'react-router-dom';
import { validate } from '../../validations/userProfileVal';

const EditUser = () => {
  const initialValues={name:'',email:''}
  const [formValues,setFormValues]=useState(initialValues)
  const [formErrors,setFormErrors]=useState('')

    // eslint-disable-next-line no-unused-vars
    const [user, setUser] = useState(null);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');

    const handleChange=(e)=>{
      const {name,value}=e.target
      setFormValues({...formValues,[name]:value})
    }


    const [updateUser]=useAdminupdateuserMutation()
    const navigate=useNavigate()

    useEffect(()=>{
        const fetchUser = async () => {
            try {
              const response = await fetch(`/api/admin/editUser?id=${id}`);
              const data = await response.json();
              if (response.ok) {
                setUser(data.user)
                setFormValues({name:data.user.name,email:data.user.email})
              } else {
                console.error(data.message || 'Failed to fetch users');
              }
            } catch (error) {
              console.error('Error fetching users:', error.message);
            }
          };
      
          fetchUser();
    },[id])

    const submitHandler=async(e)=>{
      e.preventDefault();
      const errors=validate(formValues)
      setFormErrors(errors)
      if(Object.keys(errors).length===0){
        try {
            console.log()
            await updateUser({
                _id:id,
                ...formValues
            }).unwrap();
            navigate('/admin/dashboard')
          } catch (err) {
            toast.error(err?.data?.message || err.error)
          }
    }};

  return (
    <FormContainer>
    <h2 className='text-center'>Edit User</h2>

    <Form onSubmit={submitHandler}>
    <Form.Group className='my-2' controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='name'
          name='name'
          placeholder='Enter name'
          value={formValues.name}
          onChange={handleChange}
        ></Form.Control>
        <p style={{color:'red', fontSize: '12px'}}>{formErrors.name}</p>
      </Form.Group>
      <Form.Group className='my-2' controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          placeholder='Enter email'
          value={formValues.email}
          onChange={handleChange}
        ></Form.Control>
                <p style={{color:'red', fontSize: '12px'}}>{formErrors.email}</p>
      </Form.Group>
      <Button
     
        type='submit'
        variant='primary'
        className='mt-3 mx-auto d-block'
      >
        Update
      </Button>
    </Form>
  </FormContainer>
  )
}

export default EditUser