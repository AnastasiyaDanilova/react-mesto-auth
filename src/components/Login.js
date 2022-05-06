import React from "react";
import AuthForm from "./AuthForm";

function Login({ handleAuth }) {
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
    <AuthForm handleSubmit={handleSubmitAuth} title="Вход" buttonText="Войти"  >
      <input className="popup__input popup__input_type_auth" placeholder="Email" value={email || ''} onChange={changeEmail} ></input>
      <input className="popup__input popup__input_type_auth" type="password" placeholder="Пароль" value={password || ''} onChange={changePassword}></input>
    </AuthForm>

  )
}

export default Login;