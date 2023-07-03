export default class UserInfo {
  constructor({ name, info}) {
    this._name = name;
    this._info = info;
    this._img = document.querySelector(".profile__image");
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent,
      id: this._userId
    };
  }

  setUserInfo({ name, info, userId }) {
    this._name.textContent = name;
    this._info.textContent = info;
    this._userId = userId;
  }

  setUserImg (img){
    this._img.src = img;
  }
} 
