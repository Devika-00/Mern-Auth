export const validate=(values)=>{
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const errors={};

    if(!values.email){
      errors.email="Email is required"
    }else if(!emailRegex.test(values.email)){
      errors.email="Enter a valid email"
    }
    
    if(!values.password){
      errors.password="Password is required"
    }else if(values.password.length<6){
        errors.password="Password should contain atleast 6 characters"
      }
    return errors;
  }