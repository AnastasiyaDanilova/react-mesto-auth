import React from "react";
import '../index.css';
import { register, autorize, checkToken } from "../utils/mestoAuth.js"
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import { Route, Switch, useHistory } from 'react-router-dom';
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import ProtectedRoute from "./ProtectedRoute.js";
import PopupWithForm from "./PopupWithForm.js";
import AddPlacePopup from "./AddPlacePopup.js";
import InfoTooltip from "./InfoTooltip.js";
import ImagePopup from "./ImagePopup.js";
import Register from "./Register.js";
import { api } from "../utils/Api";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Login from "./Login.js";
import Main from "./Main.js";

function App() {

    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [isAuthPopupOpen, setIsAuthPopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [currentUser, setСurrentUser] = React.useState({});
    const [cards, setСards] = React.useState([]);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [isRegister, setIsRegister] = React.useState(false);
    const [userEmail, setUserEmail] = React.useState(null);

    const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard;

    const history = useHistory()

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
        setIsAuthPopupOpen(false)
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


    // редактирование: хук + с авторизацией, профиль, аватар
    React.useEffect(() => {
        useCheckToken()
        if (loggedIn) {
            history.push('/')
            Promise.all([api.getProfile(), api.getInitialCards()])
                .then(([userInfo, cardList]) => {
                    setСurrentUser(userInfo);
                    setСards(cardList);
                }).catch((res) => console.log(res));
            return
        }
    }, [loggedIn]);

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

    //карточки: добавление, лайк, удаление 
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
            setСards((state) => state.filter((c) => c._id !== card._id));
        }).catch((res) => console.log(res));
    };

    // Авторизация
    function handleRegister(email, password) {
        register(email, password)
            .then((res) => {
                if (res) {
                    history.push('/sign-in')
                    setIsRegister(true)
                }
            }).catch((res) => {
                console.log(res)
                setIsRegister(false)
            }).finally(() => {
                setIsAuthPopupOpen(true)
            });
    };

    function handleLogin(email, password) {
        autorize(email, password).then((res) => {
            if (res) {
                localStorage.setItem('token', res.token)
                history.push('/')
                setLoggedIn(true)
            }
        }).catch((res) => {
            setIsRegister(false)
            setIsAuthPopupOpen(true)
            console.log(res)
        });
    };

    function useCheckToken() {
        if (localStorage.getItem('token')) {
            let jwt = localStorage.getItem('token')
            checkToken(jwt).then((res) => {
                if (res) {
                    setUserEmail({
                        email: res.data.email
                    })
                    setLoggedIn(true);
                }
            }).catch((res) => console.log(res));
        };
        return;
    };

    function handleLogOut() {
        localStorage.removeItem('token');
        setLoggedIn(false);
    };

    return (
        <div className="page">
            <div className="content">
                <CurrentUserContext.Provider value={currentUser}>
                    <Switch>
                        <ProtectedRoute exact
                            path="/" loggedIn={loggedIn}>

                            <Header userEmail={userEmail} onLogOut={handleLogOut} loggedIn={loggedIn} headerLink="/sign-in" linkTitle="Выйти" />

                            <Main cards={cards} onCardLike={handleCardLike} onCardDelete={handleCardDelete}
                                onCardClick={handleCardClick} onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
                            />

                            <Footer />

                            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />

                            <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />

                            <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />

                            <PopupWithForm name="delete" title="Вы уверены?" buttonText="Да" />

                            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                        </ProtectedRoute>

                        <Route path="/sign-up" >
                            <Header loggedIn={loggedIn} headerLink="/sign-in" linkTitle="Войти" />

                            <Register handleAuth={handleRegister} />

                            <InfoTooltip isRegister={isRegister} isOpen={isAuthPopupOpen} onClose={closeAllPopups} />
                        </Route>

                        <Route path="/sign-in" >
                            <Header loggedIn={loggedIn} headerLink="/sign-up" linkTitle="Регистрация" />

                            <Login handleAuth={handleLogin} title="Вход" buttonText="Войти" />

                            <InfoTooltip isRegister={isRegister} isOpen={isAuthPopupOpen} onClose={closeAllPopups} />
                        </Route>
                    </Switch>
                </CurrentUserContext.Provider>
            </div>
        </div>
    );
};

export default App;