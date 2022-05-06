import React from "react";


function AuthForm({ title, buttonText, children, handleSubmit }) {
  return (
    <div className="popup__container popup__container_type_auth">
      <h1 className="popup__title popup__title_type_auth">{title}</h1>
      <form className="popup__form" onSubmit={handleSubmit}>
        {children}
        <button className="button button_type_submit button_type_submit-auth">{buttonText}</button>
      </form>
    </div>
  )
}

export default AuthForm;