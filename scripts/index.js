import Card from "./Card.js";
import FormValidator from "./FormValidate.js";

const closeButtons = document.querySelectorAll('.popup__close');
const popups = document.querySelectorAll('.popup');
const sectionProfile = document.querySelector('.profile');

const cardsContainer = document.querySelector('.places');

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__btn',
  inactiveButtonClass: '.form__btn_disabled',
  inputErrorClass: '.form__input_error',
  errorClass: '.form__error_active'
};

const editProfileFormValidator = new FormValidator(formConfig, document.querySelector('.popup_profile-edit .form'));
const newPlaceFormValidator = new FormValidator(formConfig, document.querySelector('.popup_new-place .form'));

editProfileFormValidator.enableValidation();
newPlaceFormValidator.enableValidation();

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

popups.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(overlay)
    }
  });
});

const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup_profile-edit");
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");
const nameInput = popupEditProfile.querySelector(".form__input_type_name");
const infoInput = popupEditProfile.querySelector(".form__input_type_info");

const toggleProfile = () => {
  if (popupEditProfile.classList.contains("popup_opened")) {
    closePopup(popupEditProfile);
    editProfileFormValidator.resetValidation();
  }
  else {
    nameInput.value = userName.textContent;
    infoInput.value = profileInfo.textContent;
    editProfileFormValidator.resetValidation();
    openPopup(popupEditProfile)
  }
}

const submitProfileEdit = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  closePopup(popupEditProfile);
}

editProfile.addEventListener("click", toggleProfile);
popupEditProfile.addEventListener("submit", submitProfileEdit);

const popupImg = document.querySelector('.popup_img-card');

const zoomImg = popupImg.querySelector('.popup__zoom-image'),
  zoomTitle = popupImg.querySelector('.popup__zoom-title');

  function openZoom(img, text) {

    zoomImg.setAttribute('src', img)
    zoomImg.setAttribute('alt', text)
    zoomTitle.textContent = text;
  
    openPopup(popupImg)
  }
const formCardEdit = sectionProfile.querySelector('.profile__new-place'),
  placeAdd = document.querySelector('.popup_new-place'),
  placeForm = placeAdd.querySelector('.form_new-place'),
  placeInputPlace = placeAdd.querySelector('.form__input_type_place'),
  placeInputSrc = placeAdd.querySelector('.form__input_type_src'),
  placeSubmitBtn = placeAdd.querySelector('.form__btn_place');
  

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard(newCard({ name: placeInputPlace.value, link: placeInputSrc.value }));
  closePopup(placeAdd);
  newPlaceFormValidator.resetValidation();
  evt.target.reset();
}

placeForm.addEventListener('submit', submitCardForm);
formCardEdit.addEventListener('click', () => {
  openPopup(placeAdd);
  newPlaceFormValidator.resetValidation();
});

function newCard(data) {
  const card = new Card(data, '#place', openZoom);
  return card.generateCard();
}

function renderCard(card) {
  cardsContainer.prepend(card);
}

document.addEventListener('DOMContentLoaded', (event) => { 
  initialCards.forEach((data) => {
    renderCard(newCard(data));
  });
});

