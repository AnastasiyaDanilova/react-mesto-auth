import React from "react";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const [placeName, setPlaceName] = React.useState('')
    const [placeLink, setPlaceLink] = React.useState('')

    React.useEffect(() => {
        setPlaceName('')
        setPlaceLink('')
    }, [isOpen])

    function placeNameChange(e) {
        setPlaceName(e.target.value)
    }

    function placeLinkChange(e) {
        setPlaceLink(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        onAddPlace({
            name: placeName,
            link: placeLink
        })
    }

    return (
        <PopupWithForm onSubmit={handleSubmit} name="place" title="Новое место" isOpen={isOpen} onClose={onClose} buttonText="Создать">
            <input onChange={placeNameChange} value={placeName || ''} id="place-input" required type="text" name="place-name" placeholder="Название"
                className="popup__input popup__input_type_name" minLength="2" maxLength="30" />
            <span className="place-input-error popup__error"></span>

            <input onChange={placeLinkChange} value={placeLink || ''} id="url-input-place" required type="url" name="link" placeholder="Ссылка на картинку"
                className="popup__input popup__input_type_job" />
            <span className="url-input-place-error popup__error"></span>
        </PopupWithForm >
    )
}

export default AddPlacePopup;