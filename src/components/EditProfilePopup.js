import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = React.useContext(CurrentUserContext);

    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function nameChange(e) {
        setName(e.target.value);
    };

    function descriptionChange(e) {
        setDescription(e.target.value);
    };

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    };

    return (
        <PopupWithForm onSubmit={handleSubmit} name="profile" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
            <input value={name || ''} onChange={nameChange} id="name-input" required type="text" name="name" placeholder="Ваше имя"
                className="popup__input popup__input_type_name" minLength="2" maxLength="40" />
            <span className="name-input-error popup__error"></span>

            <input value={description || ''} onChange={descriptionChange} id="job-input" required type="text" name="job" placeholder="Ваша профессия"
                className="popup__input popup__input_type_job" minLength="2" maxLength="200" />
            <span className="job-input-error popup__error"></span>
        </PopupWithForm >
    );
};

export default EditProfilePopup;