const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitSelector: '.form__btn',
  disabledButtonClass: 'form__btn_disabled',
  errorClass: 'form__error',
  inputErrorClass: 'form__input_error',
};



const setEventListeners = (config, formElement) => {
  const inputList = [...formElement.querySelectorAll(config.inputSelector)];
  const buttonElement = formElement.querySelector(config.submitSelector);

  toggleButtonState(config, inputList, buttonElement);

  inputList.forEach((inputElement) => {

    inputElement.addEventListener('input', () => {
      validateInput(config, formElement, inputElement);
      toggleButtonState(config, inputList, buttonElement);
    });
  });
};

const toggleInputError = (config, formElement, inputElement, errorMessage) => {
  if (errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(config.errorClass);
  }
  else {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(config.inputErrorClass);
    errorElement.classList.remove(config.errorClass);
    errorElement.textContent = '';
  }
};
const hasInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid);
};

const disabledSubmitBtm = (config, buttonElement) => {
  buttonElement.classList.add(config.disabledButtonClass);
  buttonElement.disabled = true;
};

const activeSubmitBtm = (config, buttonElement) => {
  buttonElement.classList.remove(config.disabledButtonClass);
  buttonElement.disabled = false;
};

const toggleButtonState = (config, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    disabledSubmitBtm(config, buttonElement);
  } else {
    activeSubmitBtm(config, buttonElement);
  }
};

const validateInput = (config, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    toggleInputError(config, formElement, inputElement, inputElement.validationMessage);
  } else {
    toggleInputError(config, formElement, inputElement);
  }
};

const enableValidation = (config) => {
  const formList = [...document.querySelectorAll(config.formSelector)];

  formList.forEach((formElement) => {
    setEventListeners(config, formElement);
  });
};

enableValidation(formConfig);
