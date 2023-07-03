//-- IMPORTS

import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidate";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js"
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';
import { formConfig } from "../utils/constants.js"



const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup_profile-edit");
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");
const nameInput = popupEditProfile.querySelector(".form__input_type_name");
const infoInput = popupEditProfile.querySelector(".form__input_type_info");
const sectionProfile = document.querySelector('.profile');
const placesContainer = document.querySelector('.places');

const formCardEdit = sectionProfile.querySelector('.profile__new-place'),
  placeAdd = document.querySelector('.popup_new-place')
//-- INIT API


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-69',
  headers: {
    authorization: '03cd57ef-0b0a-4590-a0df-4c34d12cd341',
    'Content-Type': 'application/json;  character=UTF-8',
  }
})


//-- EDIT IMG

const profileImgBtn = document.querySelector('.profile__image-btn');
profileImgBtn.addEventListener("click", () => popupUpdateAvatar.open());

const popupUpdImg = document.querySelector('.popup_upd-image'),
  popupUpdateAvatar = new PopupWithForm(popupUpdImg, (data) => {
    return api.saveDataProfile(data)
      .then((result) => {
        console.log(result)
        userInfo.setUserImg(result.avatar);
        popupUpdateAvatar.close();
      })
      .catch((err) => console.error(err))
      .finally(() => popupUpdImg.setInitialText())
  });
popupUpdateAvatar.setEventListeners();


//-- USER INFO EDIT

const userInfo = new UserInfo({
  name: userName,
  info: profileInfo
});

const popupProfileEdit = new PopupWithForm(popupEditProfile, (data) => {
  return api.saveDataInfo(data)
    .then((result) => {
      userInfo.setUserInfo({ name: result.name, info: result.about });
      popupProfileEdit.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      popupProfileEdit.setInitialText()
    });
});

editProfile.addEventListener("click", () => {
  console.log(userInfo)
  popupProfileEdit.open();
  const userInfoActual = userInfo.getUserInfo();
  popupProfileEdit.setInputValues(userInfoActual);
  editProfileFormValidator.resetValidation()
});

popupProfileEdit.setEventListeners();


//-- IMAGE ZOOM

const popupImg = document.querySelector('.popup_img-card');
const popupOpenImage = new PopupWithImage(popupImg);

function handleCardClick(name, link) {
  popupOpenImage.open(name, link);
}
popupOpenImage.setEventListeners();

//-- ADD CARD


//-- REMOVE CARD

const popupRemoveCard = document.querySelector('.popup_rem-card'),
  popupConfirm = new PopupWithConfirm(popupRemoveCard);
popupConfirm.setEventListeners();

//-- NEW CARD 


function createCard(data) {

  const handleCardDelete = () => {
    const sendCard = () => {
      return api.deleteCard(cards.cardId)
        .then(() => {
          cards.deleteCard();
          popupConfirm.close();
        })
        .catch((err) => console.error(err))
        .finally(() => {
          popupConfirm.setInitialText();
        });
    };

    popupConfirm.setCallbackConfirm(sendCard);
    popupConfirm.open();
  };


  const handleAddLike = () => {
    api.addLike(cards.cardId)
      .then((result) => cards.switchLikes(result.likes))
      .catch((err) => console.log(err));
  };

  const handleDeleteLike = () => {
    api.deleteLike(cards.cardId)
      .then((result) => cards.switchLikes(result.likes))
      .catch((err) => console.log(err));
  };

  const cards = new Card(
    data,
    '#place',
    handleCardClick,
    userId,
    {
      handleCardDelete,
      handleAddLike,
      handleDeleteLike,
    }
  );
  return cards.generateCard();
}


function makeCard(data) {
  const card = createCard(data);
  cardsList.addItem(card);
}
let userId;
Promise.all([
  api.getDataUser(),
  api.getInitialCards()
])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    console.log('index.js -> userId: ' + userId, initialCards);
    cardsList.renderItems(initialCards);
    userInfo.setUserInfo({ name: userData.name, info: userData.about, userId: userData._id });
    userInfo.setUserImg(userData.avatar);
  })
  .catch((error) => console.log(error));


const handleCardEdit = new PopupWithForm(placeAdd, (data) => {
  return api.saveCardInfo(data)
    .then((result) => {
      console.log(result);
      makeCard(result);
      handleCardEdit.close();
    })
    .catch((err) => console.error(err))
    .finally(() => {
      handleCardEdit.setInitialText()
      
    });
});

handleCardEdit.setEventListeners();


formCardEdit.addEventListener("click", () => {
  newPlaceFormValidator.resetValidation();
  handleCardEdit.open();
});



//-- GENERATE ON LOAD
const cardsList = new Section({ renderer: (data) => makeCard(data) }, placesContainer);


//-- HANDLE FORMS

const editProfileFormValidator = new FormValidator(formConfig, document.querySelector('.popup_profile-edit .form'));
const newPlaceFormValidator = new FormValidator(formConfig, document.querySelector('.popup_new-place .form'));
editProfileFormValidator.enableValidation();
editProfileFormValidator.disableSubmitBtn()
newPlaceFormValidator.enableValidation();
const popupAvatarForm = new FormValidator(formConfig, popupUpdImg);
popupAvatarForm.enableValidation();


