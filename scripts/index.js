//--//-- MAIN VARIABLES  //--//--//--//--//--//--//--//--//--//--//--//--//--//--//--

const sectionProfile = document.querySelector('.profile')
const template = document.querySelector('#place').content;
const cardsContainer = document.querySelector('.places');
const popups = document.querySelectorAll('.popup');

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

popups.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      closePopup(overlay)
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

  if (popupEditProfile.classList.contains("popup_opened")) {
    closePopup(popupEditProfile);
  }
  else {
    nameInput.value = userName.textContent;
    infoInput.value = profileInfo.textContent;
    disableButton(formConfig, popupEditProfile.querySelector('.form__btn_profile'));
    openPopup(popupEditProfile)
  } 
}

const submitProfileEdit = (evt) => {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  toggleProfile();
}

editProfile.addEventListener("click", toggleProfile);

popupEditProfile.addEventListener("submit", submitProfileEdit);


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


function addZoomListener(node) {
  node.querySelector('.place__img').addEventListener('click', openZoom);
}


//--//-- ACTIONS //--//--//--//--//--//--//--//--//--

function addLikeListener(element) {
  const likeCard = element.querySelector('.place__like');
  likeCard.addEventListener('click', (evt) => {
    evt.target.classList.toggle('place__like_active');
  });
}

function addDeleteListener(element) {
  const deleteBtn = element.querySelector('.place__remove');
  deleteBtn.addEventListener('click', (evt) => {
    evt.target.closest('.place').remove()
  });
}

//--//-- GENERATE PLACE //--//--//--//--//--//--//--//--//--//--

function createCard(data) {
  const newElement = template.querySelector('.place').cloneNode(true);
  newElement.querySelector('.place__img').src = data.link;
  newElement.querySelector('.place__img').alt = data.name;
  newElement.querySelector('.place__name').textContent = data.name;

  addDeleteListener(newElement);
  addLikeListener(newElement);
  addZoomListener(newElement);

  return(newElement)
}

const renderCard = (data) => {
  cardsContainer.prepend(createCard(data));
}

initialCards.forEach((data) => { renderCard(data) })


//--//-- CARD CREATE POPUP //--//--//--//--//--//--//--//--//--//--

const formCardEdit = sectionProfile.querySelector('.profile__new-place'),

  placeAdd = document.querySelector('.popup_new-place'),
  placeForm = placeAdd.querySelector('.form_new-place'),
  placeInputPlace = placeAdd.querySelector('.form__input_type_place'),
  placeInputSrc = placeAdd.querySelector('.form__input_type_src');
  placeSumbitBtn = placeAdd.querySelector('.form__btn_place')

const submitCardForm = (evt) => {
  evt.preventDefault();
  disableButton(formConfig, placeSumbitBtn);
  renderCard({ name: placeInputPlace.value, link: placeInputSrc.value })
  closePopup(placeAdd)
  evt.target.reset();
}

placeForm.addEventListener('submit', submitCardForm);
formCardEdit.addEventListener('click', () => openPopup(placeAdd));


