//--//-- MAIN VARIABLES  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

const sectionProfile = document.querySelector('.profile')
const template = document.querySelector('#place').content;
const cardUlList = document.querySelector('.places');


//--//-- MAIN FUNCTIONS  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

// const popupToggle = (popupName) => {
//   popupName.classList.toggle('popup_opened');
// };

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

//--//-- PROFILE EDIT POPUP //--//--//--//--//--//--//--//--//--//--//--//--//--//--

const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup_profile-edit");
const popupCloseIcon = popupEditProfile.querySelector(".popup__close");

// Current  data
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");

// New data 
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const infoInput = popupEditProfile.querySelector(".popup__input_type_info");


const toggleProfile = () => {
  if (popupEditProfile.classList.contains("popup_opened")) {
    nameInput.value = userName.textContent;
    infoInput.value = profileInfo.textContent;
    closePopup(popupEditProfile);

  }
  else {
    openPopup(popupEditProfile)
  } 
}

const submitForm = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  toggleProfile();
}

editProfile.addEventListener("click", toggleProfile);
popupCloseIcon.addEventListener("click", toggleProfile);
popupEditProfile.addEventListener("submit", submitForm);


//-//-- PICTURE ZOOM //--//--//--//--//--//--//--//--//--

const popupImg = document.querySelector('.popup_img-card'),
  closeZoom = popupImg.querySelector('.popup__close')

const zoomImg = popupImg.querySelector('.popup__zoom-image'),
  zoomTitle = popupImg.querySelector('.popup__zoom-title')

closeZoom.addEventListener('click', (evt) => {
  closePopup(popupImg)
})

function openZoom(evt) {

  zoomImg.setAttribute('src', evt.target.getAttribute('src'))
  zoomImg.setAttribute('alt', evt.target.getAttribute('alt'))
  zoomTitle.textContent = evt.target.getAttribute('alt')

  openPopup(popupImg)
}


function makeZoom(node) {
  node.querySelector('.place__img').addEventListener('click', openZoom);
}


//--//-- ACTIONS //--//--//--//--//--//--//--//--//--

function likeCard(element) {
  const likeCard = element.querySelector('.place__like');
  likeCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });
}

function deleteCard(element) {
  const DeleteBtn = element.querySelector('.place__remove');
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

  return(newElement)
}

const placeCard = (data) => {
  cardUlList.prepend(renderCard(data));
}

initialCards.forEach((data) => { placeCard(data) })


//--//-- CARD CREATE POPUP //--//--//--//--//--//--//--//--//--//--

const formCardEdit = sectionProfile.querySelector('.profile__new-place'),

  placeAdd = document.querySelector('.popup_new-place'),
  placeClose = placeAdd.querySelector('.popup__close'),
  placeForm = placeAdd.querySelector('.popup__form_new'),
  placeInputPlace = placeAdd.querySelector('.popup__input_type_place'),
  placeInputSrc = placeAdd.querySelector('.popup__input_type_src');

const submitCardForm = (evt) => {
  evt.preventDefault();
  renderCard({ name: placeInputPlace.value, link: placeInputSrc.value })
  closePopup(placeAdd)
  evt.target.reset();
}

placeForm.addEventListener('submit', submitCardForm);
formCardEdit.addEventListener('click', () => openPopup(placeAdd));
placeClose.addEventListener('click', () => closePopup(placeAdd));

