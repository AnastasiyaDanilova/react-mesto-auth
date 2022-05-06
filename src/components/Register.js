import React from "react";
import AuthForm from "./AuthForm";
import { Link } from 'react-router-dom'

function Register({ handleAuth }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function changeEmail(e) {
    setEmail(e.target.value)
  }

  function changePassword(e) {
    setPassword(e.target.value)
  }

  function handleSubmitAuth(e) {
    e.preventDefault()
    handleAuth(email, password)
  }

  return (
    <>
      <AuthForm handleSubmit={handleSubmitAuth} title="Регистрация" buttonText="Зарегистрироваться"  >
        <input className="popup__input popup__input_type_auth" placeholder="Email" value={email || ''} onChange={changeEmail} ></input>
        <input className="popup__input popup__input_type_auth" placeholder="Пароль" value={password || ''} onChange={changePassword}></input>
      </AuthForm>
      <p className="popup__register-text">Уже зарегистрированы? <Link className="link" to="/sign-in" >Войти</Link> </p>
    </>

  )
}

export default Register;