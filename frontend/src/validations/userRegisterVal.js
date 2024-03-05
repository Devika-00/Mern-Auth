export const validate=(values)=>{
    const nameRegex=/^[a-zA-Z ]+$/
    const emailRegex=/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const errors={};
    if(!values.name){
      errors.name="Username is required"
    }else if(!nameRegex.test(values.name)){
      errors.name="Enter a valid name"
    }
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

    if(!values.confirmPassword){
      errors.confirmPassword="Confirm Password is required"
    }else if(values.confirmPassword.length<6){
      errors.confirmPassword="Password should contain atleast 6 characters"
    }else if(values.password!=values.confirmPassword){
        errors.confirmPassword="Password should match"
    }
    return errors;
  }
