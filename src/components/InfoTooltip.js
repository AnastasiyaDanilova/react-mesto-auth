 import React from 'react';
 import successImg from '../images/successRegister.svg'
 import errorImg from '../images/errorRegister.svg'




function InfoTooltip({onClose, isOpen, isRegister}) {
    const successTitle = "Вы успешно зарегистрировались!"
    const errorTitle = "Что-то пошло не так! Попробуйте ещё раз."
    
    return (
      <div className={`popup ${isOpen && 'popup_open'} `}  >
            <div className="popup__container popup__conteiner_type_registr">
                <button type="button" aria-label="Закрыть" className="button button_type_close-popup" onClick={onClose}></button>
                <img className="popup__register-image" src={isRegister ? successImg : errorImg} alt='регистрация' />
                <h2 className="popup__title">{`${isRegister ? successTitle : errorTitle }`}</h2>
            </div>
        </div>
    );
};

export default InfoTooltip;