import React from 'react';

function PopupWithForm({ name, isOpen, title, onClose, buttonText, children, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen && 'popup_open'}`} id={`${name}-popup`} >
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="button button_type_close-popup" onClick={onClose}></button>
                <h2 className="popup__title">{title}</h2>

                <form className="popup__form" id={name} name={`popup-${name}-form`} onSubmit={onSubmit}>
                    {children}
                    <button type="submit" aria-label="Отправить" className="button button_type_submit">{buttonText}</button>
                </form>
            </div>
        </div>
    );
};

export default PopupWithForm;