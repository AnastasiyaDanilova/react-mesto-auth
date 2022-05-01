import React from "react";
import PopupWithForm from "./PopupWithForm.js";


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const refAvatarInput = React.useRef();

    React.useEffect(() => {
        refAvatarInput.current.value= '';
    }, [onClose]);


    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: refAvatarInput.current.value,
        });
    };

    return (
        <PopupWithForm onSubmit={handleSubmit} name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} buttonText="Сохранить">
            <input ref={refAvatarInput} id="url-input" required type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_job" />
            <span className="url-input-error popup__error"></span>
        </PopupWithForm >
    );
};

export default EditAvatarPopup;