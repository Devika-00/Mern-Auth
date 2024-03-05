export const validate=(values)=>{
    const nameRegex=/^[a-zA-Z ]+$/
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const errors={};
    if(!values.name){
      errors.name="Name is required"
    }else if(!nameRegex.test(values.name)){
      errors.name="Enter a valid name"
    }
    if(!values.email){
      errors.email="Email is required"
    }else if(!emailRegex.test(values.email)){
      errors.email="Enter a valid email"
    }
    return errors;
  }
