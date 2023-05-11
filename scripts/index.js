const editProfile = document.querySelector(".profile__edit");
const popupEditProfile = document.querySelector(".popup");
const popupCloseIcon = popupEditProfile.querySelector(".popup__close");
const userName = document.querySelector(".profile__name");
const profileInfo = document.querySelector(".profile__info");
const nameInput = popupEditProfile.querySelector(".popup__input_type_name");
const infoInput = popupEditProfile.querySelector(".popup__input_type_info");

const popupToggle = function () {
  if (popupEditProfile.classList.contains("popup_opened")){
    nameInput.value = userName.textContent;
    infoInput.value = profileInfo.textContent;
  }
  popupEditProfile.classList.toggle("popup_opened");
}

const formSubmitHandler = function (evt) {
  evt.preventDefault();
  userName.textContent = nameInput.value;
  profileInfo.textContent = infoInput.value;
  popupToggle();
}

editProfile.addEventListener("click", popupToggle);
popupCloseIcon.addEventListener("click", popupToggle);
popupEditProfile.addEventListener("submit", formSubmitHandler);