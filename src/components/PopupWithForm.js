import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, callbackSubmit) {
    super(popupSelector);
    this._callbackSubmit = callbackSubmit;
    this._form = this._popup.querySelector(".form");
    this._inputs = Array.from(this._form.querySelectorAll(".form__input"));
    this._submitButton = this._form.querySelector(".form__btn");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => inputValues[input.name] = input.value
    );
    return inputValues;
  }


  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const initialText = this._submitButton.textContent;
      this._submitButton.textContent = 'Сохранение...';
      this._callbackSubmit(this._getInputValues())
        .then(() => this.close()) 
        .finally(() => {
          this._submitButton.textContent = initialText;
        }) 
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setInputValues(data) {
    this._inputs.forEach((input) => {
      input.value = data[input.name];
    });
  }


}
