import React from "react";
import '../index.css';
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch } from 'react-router-dom';

import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import { ProtectedRoute } from "./ProtectedRoute.js";
import PopupWithForm from "./PopupWithForm.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Main from "./Main.js";
import { api } from "../utils/Api";



function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setСurrentUser] = React.useState({});
    const [cards, setСards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;


    // попапы открытие, закрытие, закрыти клик и оверлей
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    };

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    };

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    };

    function handleCardClick(card) {
        setSelectedCard(card);
    };

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setSelectedCard({});
    };

    React.useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isOpen])

    React.useEffect(() => {
        function closeByOverlay(evt) {
            if (evt.target.classList.contains('popup')) {
                closeAllPopups();
            }
        }
        if (isOpen) {
            document.addEventListener('mousedown', closeByOverlay);
            return () => {
                document.removeEventListener('mousedown', closeByOverlay);
            }
        }
    }, [isOpen])


    // редактирование: хук, профиль, аватар
    React.useEffect(() => {
        api.getProfile().then(res => {
            setСurrentUser(res);
        }).catch((res) => console.log(res));
    }, []);

    function handleUpdateUser(user) {
        api.editProfile(user.name, user.about).then((res) => {
            setСurrentUser(res);
            closeAllPopups();
        }).catch((res) => console.log(res));
    };

    function handleUpdateAvatar(user) {
        api.changeAvatar(user.avatar).then((res) => {
            setСurrentUser(res);
            closeAllPopups();
        }).catch((res) => console.log(res));
    };

    //карточки: хук, добавление, лайк, удаление 
    React.useEffect(() => {
        api.getInitialCards().then((cardList) => {
            setСards(cardList);
        }).catch((res) => console.log(res));

    }, []);

    function handleAddPlaceSubmit(card) {
        api.addCard(card.name, card.link).then((newCard) => {
            setСards([newCard, ...cards]);
            closeAllPopups();
        }).catch((res) => console.log(res));
    };

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setСards((state) => state.map((c) => c._id === card._id ? newCard : c));
        }).catch((res) => console.log(res));
    };

    function handleCardDelete(card) {
        api.deleteCard(card._id).then(() => {
            setСards((state) => state.filter((c) => c._id !== card._id))
        }).catch((res) => console.log(res));
    };

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">
                <div className="content">
                    <Header />
                    <Switch>

                        <ProtectedRoute exact
                            path="/" loggedIn={loggedIn} component={Main}
                            cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                            onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick} 
                        />

                        <Route path="/sign-up" >
                        <Login title="Регистрация" buttonText="Зарегистрироваться" />
                        </Route>
                        <Route path="/sign-in" >
                            <Login title="Вход" buttonText="Войти" />
                        </Route>
                    </Switch>
                    {loggedIn && <Footer />}
                </div>

                <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />

                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            </div>
        </CurrentUserContext.Provider>
    );
};

export default App;