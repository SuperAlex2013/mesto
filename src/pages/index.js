//-- IMPORTS

import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidate";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards, formConfig} from "../utils/constants.js"

const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup_profile-edit");
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");
const nameInput = popupEditProfile.querySelector(".form__input_type_name");
const infoInput = popupEditProfile.querySelector(".form__input_type_info");
const sectionProfile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.places');
const formCardEdit = sectionProfile.querySelector('.profile__new-place'),
placeAdd = document.querySelector('.popup_new-place'),
placeForm = placeAdd.querySelector('.form_new-place'),
placeInputPlace = placeAdd.querySelector('.form__input_type_place'),
placeInputSrc = placeAdd.querySelector('.form__input_type_src'),
placeSubmitBtn = placeAdd.querySelector('.form__btn_place');

//-- USER INFO EDIT

const userInfo = new UserInfo({
  nameSelector: userName,
  jobSelector: profileInfo
});

const popupProfileEdit = new PopupWithForm(popupEditProfile, (data) => {
  console.log(data)
  userInfo.setUserInfo(data);
  popupProfileEdit.close();
});

editProfile.addEventListener('click', () => {
  popupProfileEdit.open();
  const info = userInfo.getUserInfo();
  nameInput.value = info.name;
  infoInput.value = info.info;
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

function makeCard(data) {
  const cards = new Card(data, '#place', handleCardClick)
  return cardsList.addItem(cards.generateCard())
}

const handleCardEdit = new PopupWithForm(placeAdd, (data) => {
  makeCard({ name: data.place, link: data.img_src });
  handleCardEdit.close();
  newPlaceFormValidator.resetValidation();
});

formCardEdit.addEventListener("click", () => {
  handleCardEdit.open();
});

handleCardEdit.setEventListeners();


//-- GENERATE ON LOAD

const cardsList = new Section({
  items: initialCards,
  renderer: (data) => {
    makeCard(data)
  }
}, cardsContainer);

cardsList.renderItems();

//-- HANDLE FORMS

const editProfileFormValidator = new FormValidator(formConfig, document.querySelector('.popup_profile-edit .form'));
const newPlaceFormValidator = new FormValidator(formConfig, document.querySelector('.popup_new-place .form'));
editProfileFormValidator.enableValidation();
editProfileFormValidator.disableSubmit()
newPlaceFormValidator.enableValidation();

cardsList.renderItems();
