import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, callbackSubmit) {
    super(popup);
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this._submitButton = this._form.querySelector(".form__input-btn");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._callbackSubmit(this._getInputValues());
    });
  }

  setInputValues(data) {
    this._inputs.map((input) => {
      input.value = data[input.name];
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}