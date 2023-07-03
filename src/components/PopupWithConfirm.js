import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form");
    this._submitButton = this._form.querySelector(".form__btn");
    this._initialText = this._submitButton.textContent

  }

  setCallbackConfirm(callbackConfirm) {
    this._callbackConfirm = callbackConfirm;
  }

  setInitialText(){
    this._submitButton.textContent = this._initialText
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackConfirm();
      this._submitButton.textContent = 'Удаление...';
    });
  }

}

