import React from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
    const { _id } = React.useContext(CurrentUserContext)

    const isOwn = card.owner._id === _id;
    const isLiked = card.likes.some(i => i._id === _id);
    const cardLikeButtonClassName = (`button ${isLiked ? 'card__like-button_active' : 'card__like-button'}`);
    const cardDeleteButtonClassName = (`button  ${isOwn ? 'card__delete-button' : 'card__delete-button_inactive'}`);

    function handleClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onCardLike(card);
    };

    function handleDeleteClick() {
        onCardDelete(card);
    };

    return (
        <li className="card">
            <img className="card__image" src={card.link} onClick={handleClick} alt={card.name} />
            <button className={cardDeleteButtonClassName} onClick={handleDeleteClick}></button>
            <div className="card__panel">
                <h2 className="card__city">{card.name}</h2>
                <div className="card__like-container">
                    <button type="button" aria-label="Мне нравится" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <span className="card__like-count">{`${card.likes.length}`}</span>
                </div>
            </div>
        </li>

    );
};

export default Card;