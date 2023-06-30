export default class Card {
  constructor(data, templateSelector, handleCardClick) {
      this._name = data.name;
      this._link = data.link;
      this._templateSelector = templateSelector;
      this._handleCardClick = handleCardClick; 
  }

  _getTemplate() {
      const cardElement = document
          .querySelector(this._templateSelector)
          .content
          .querySelector('.place')
          .cloneNode(true);
      return cardElement;
  }

  generateCard() {
      this._element = this._getTemplate();
      this._setEventListeners();
      this._element.querySelector('.place__img').src = this._link;
      this._element.querySelector('.place__img').alt = this._name;
      this._element.querySelector('.place__name').textContent = this._name;

      return this._element;
  }

  _setEventListeners() {
      this._element.querySelector('.place__like').addEventListener('click', () => {
          this._toggleLike();
      });

      this._element.querySelector('.place__remove').addEventListener('click', () => {
          this._deleteCard();
      });

      this._element.querySelector('.place__img').addEventListener('click', () => {
          this._zoomImage();
      });
  }

  _toggleLike() {
      this._element.querySelector('.place__like').classList.toggle('place__like_active');
  }

  _deleteCard() {
      this._element.remove();
  }

  _zoomImage() {
    this._handleCardClick(this._link, this._name); // здесь вызываем handleCardClick вместо openZoom
  }
}
