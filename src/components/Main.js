import React from 'react';
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {

    const { name, about, avatar } = React.useContext(CurrentUserContext)

    return (
        <div>
            <section className="profile">
                <div className="profile__about">
                    <button type="button" aria-label="Редактировать аватар"
                        className="button avatar-button button_type_change-avatar avatar-popup-button" onClick={onEditAvatar}>
                        {avatar && <img alt="аватар" className="profile__photo" src={avatar} />}
                    </button>

                    <div className="profile__info">
                        <div className="profile__container">
                            <h1 className="profile__name">{name}</h1>
                            <button type="button" aria-label="Редактировать профиль"
                                className=" button button_type_edit-info profile-button profile-popup-button" onClick={onEditProfile}></button>
                        </div>

                        <p className="profile__description" >{about}</p>
                    </div>

                </div>

                <button type="button" aria-label="Добавить фото"
                    className="button place-button button_type_add-card place-popup-button" onClick={onAddPlace}></button>
            </section>

            <section className="cards">

                <ul className="cards__list">
                    {cards.map((item) =>(
                        <Card onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} card={item} key={item._id} />
                    ))}
                </ul>

            </section>
        </div>
    );
};

export default Main;
