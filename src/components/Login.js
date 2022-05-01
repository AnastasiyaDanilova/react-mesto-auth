import React from "react"; 
import AuthForm from "./AuthForm"; 



function Login ({ title, buttonText }) {
  return (
    <AuthForm title={title} buttonText={buttonText} />
  )
}

export default Login;