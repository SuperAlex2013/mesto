import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._image = this._popup.querySelector('.popup__zoom-image');
    this._caption = this._popup.querySelector('.popup__zoom-title');
  }

  open( link, name) {
    console.log(321)
    this._image.src = link;
    this._image.alt = name;
    this._caption.textContent = name;
    super.open();
  }
}