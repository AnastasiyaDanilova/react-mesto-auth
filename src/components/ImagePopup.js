import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_type_image ${card.name && 'popup_open'}`} id="popup-image">
            <figure className="popup__figure">
                <button type="button" aria-label="Закрыть" className="button button_type_close-popup" onClick={onClose} ></button>
                <img className="popup__image" src={card.link} alt={card.name} />
                <figcaption className="popup__fig-caption">{card.name}</figcaption>
            </figure>
        </div>
    );
};

export default ImagePopup;