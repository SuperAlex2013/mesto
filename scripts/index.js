//--//-- MAIN VARIABLES  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

const sectionProfile = document.querySelector('.profile')
let template = document.querySelector('#place').content;
let cardUlList = document.querySelector('.places');


//--//-- MAIN FUNCTIONS  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

const popupToggle = (popupName) => {
  popupName.classList.toggle('popup_opened');
};


//--//-- PROFILE EDIT POPUP //--//--//--//--//--//--//--//--//--//--//--//--//--//--

const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup");
const popupCloseIcon = popupEditProfile.querySelector(".popup__close");

// Current  data
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");

// New data 
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const infoInput = popupEditProfile.querySelector(".popup__input_type_info");


const profileToggle = () => {
  if (popupEditProfile.classList.contains("popup_opened")) {
    nameInput.value = userName.textContent;
    infoInput.value = profileInfo.textContent;
  }
  popupToggle(popupEditProfile)
}

const formSubmitHandler = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  profileToggle();
}

editProfile.addEventListener("click", profileToggle);
popupCloseIcon.addEventListener("click", profileToggle);
popupEditProfile.addEventListener("submit", formSubmitHandler);


//-//-- PICTURE ZOOM //--//--//--//--//--//--//--//--//--

let popupImg = document.querySelector('.popup_img-card'),
  closeZoom = popupImg.querySelector('.popup__close')

let zoomImg = popupImg.querySelector('.popup__zoom-image'),
  zoomTitle = popupImg.querySelector('.popup__zoom-title')

closeZoom.addEventListener('click', (evt) => {
  popupToggle(popupImg)
})

function openZoom(evt) {

  zoomImg.setAttribute('src', evt.target.getAttribute('src'))
  zoomImg.setAttribute('alt', evt.target.getAttribute('alt'))
  zoomTitle.textContent = evt.target.getAttribute('alt')

  popupToggle(popupImg)
}


function makeZoom(node) {
  node.querySelector('.place__img').addEventListener('click', openZoom);
}


//--//-- ACTIONS //--//--//--//--//--//--//--//--//--

function likeCard(element) {
  let likeCard = element.querySelector('.place__like');
  likeCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });
}

function deleteCard(element) {
  let DeleteBtn = element.querySelector('.place__remove');
  DeleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.place').remove()
  });
}

//--//-- GENERATE PLACE //--//--//--//--//--//--//--//--//--//--

function renderCard(data) {
  const newElement = template.querySelector('.place').cloneNode(true);
  newElement.querySelector('.place__img').src = data.link;
  newElement.querySelector('.place__img').alt = data.name;
  newElement.querySelector('.place__name').textContent = data.name;

  deleteCard(newElement);
  likeCard(newElement);
  makeZoom(newElement);
  cardUlList.prepend(newElement);
}


initialCards.forEach((data) => { renderCard(data) })


//--//-- CARD CREATE POPUP //--//--//--//--//--//--//--//--//--//--

let formCardEdit = sectionProfile.querySelector('.profile__new-place'),

  placeAdd = document.querySelector('.popup_new-place'),
  placeClose = placeAdd.querySelector('.popup__close'),
  placeForm = placeAdd.querySelector('.popup__form_new'),
  placeInputPlace = placeAdd.querySelector('.popup__input_type_place'),
  placeInputSrc = placeAdd.querySelector('.popup__input_type_src');

const cardFormSubmit = (evt) => {
  evt.preventDefault();
  renderCard({ name: placeInputPlace.value, link: placeInputSrc.value })
  popupToggle(placeAdd)
  evt.target.reset();
}


// слушаем события
placeForm.addEventListener('submit', cardFormSubmit);
formCardEdit.addEventListener('click', () => popupToggle(placeAdd));
placeClose.addEventListener('click', () => popupToggle(placeAdd));

