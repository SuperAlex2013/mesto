//--//-- MAIN VARIABLES  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

const sectionProfile = document.querySelector('.profile')
const template = document.querySelector('#place').content;
const cardUlList = document.querySelector('.places');
const popups = document.querySelectorAll('.popup');
const closeButtons = document.querySelectorAll('.popup__close');
//--//-- MAIN FUNCTIONS  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

// const popupToggle = (popupName) => {
//   popupName.classList.toggle('popup_opened');
// };

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

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

popups.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(overlay);
    }
  });
});


//--//-- PROFILE EDIT POPUP //--//--//--//--//--//--//--//--//--//--//--//--//--//--

const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup_profile-edit");
const popupCloseIcon = popupEditProfile.querySelector(".popup__close");

// Current  data
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");

// New data 
const nameInput = popupEditProfile.querySelector(".form__input_type_name");
const infoInput = popupEditProfile.querySelector(".form__input_type_info");


const toggleProfile = () => {
  nameInput.value = userName.textContent;
  infoInput.value = profileInfo.textContent;
  if (popupEditProfile.classList.contains("popup_opened")) {
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

popupEditProfile.addEventListener("submit", submitForm);


//-//-- PICTURE ZOOM //--//--//--//--//--//--//--//--//--

const popupImg = document.querySelector('.popup_img-card');

const zoomImg = popupImg.querySelector('.popup__zoom-image'),
  zoomTitle = popupImg.querySelector('.popup__zoom-title');


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
  placeForm = placeAdd.querySelector('.form_new-place'),
  placeInputPlace = placeAdd.querySelector('.form__input_type_place'),
  placeInputSrc = placeAdd.querySelector('.form__input_type_src');

const submitCardForm = (evt) => {
  evt.preventDefault();
  placeCard({ name: placeInputPlace.value, link: placeInputSrc.value })
  closePopup(placeAdd)
  evt.target.reset();
}

placeForm.addEventListener('submit', submitCardForm);
formCardEdit.addEventListener('click', () => openPopup(placeAdd));


