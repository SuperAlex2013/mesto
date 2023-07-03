export default class Card {
  constructor(data, templateSelector, handleCardClick, userId, { handleCardDelete, handleAddLike, handleDeleteLike }) {
    this._templateSelector = templateSelector;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._userId = userId;
    this._ownerId = data.owner._id;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.place')
      .cloneNode(true);
    return cardElement;
  }


  _setCardImage() {
    this._cardImage = this._element.querySelector(".place__img");
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _setCardTitle() {
    const cardTitle = this._element.querySelector('.place__name');
    cardTitle.textContent = this._name;
  }

  _setCountLikes() {
    this._countLikes = this._element.querySelector(".place__like-number");
    this._countLikes.textContent = this._likes.length;
  }

  _setLikeButton() {
    this._likeButton = this._element.querySelector(".place__like");
    this._likeButton.addEventListener("click", () => this.isLiked() ? this._handleDeleteLike() : this._handleAddLike());
  }

  _setTrashButton() {
    const trashButton = this._element.querySelector(".place__remove");
  
    if (this._userId === this._ownerId) {
      trashButton.classList.add('place__remove_active');
    }
    trashButton.addEventListener("click", () => this._handleCardDelete());
  }
  

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => this._handleCardClick(this._name, this._link));
    this._setTrashButton();
    this._setLikeButton();
  }

  generateCard() {
    this._element = this._getTemplate();
    
    this._setCardImage();
    this._setCardTitle();
    this._setCountLikes();
    this._setEventListeners();
    this.toggleLikeState();
 
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  setLikes() {

      this._likeButton.classList.add('place__like_active');

  }
  

  deleteLikes() {
    if (this._likeButton) {
      this._likeButton.classList.remove('place__like_active');
    }
  }
  

  isLiked() {
    return this._likes.some(_element => _element._id === this._userId);
  }

  switchLikes(likes) {
    this._likes = likes;
    this.toggleLikeState();
  }

  toggleLikeState() {
    this._countLikes.textContent = this._likes.length;
     if (this.isLiked()) {
      
      this.setLikes()
     } else {
      
      this.deleteLikes();
     } 
  }
}
