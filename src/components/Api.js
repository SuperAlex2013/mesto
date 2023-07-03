export default class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  _fetchRequest(endpoint, options = {}) {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
      ...options
    })
      .then(this._getResponseData);
  }

  getInitialCards() {
    return this._fetchRequest('/cards');
  }

  getDataUser() {
    return this._fetchRequest('/users/me');
  }

  saveDataInfo(profileInfo) {
    return this._fetchRequest('/users/me', {
      method: 'PATCH',
      body: JSON.stringify({
        name: profileInfo.name,
        about: profileInfo.info
      })
    });
  }

  saveCardInfo(cardInfo) {
    return this._fetchRequest('/cards', {
      method: 'POST',
      body: JSON.stringify({
        name: cardInfo.place,
        link: cardInfo.img_src
      })
    });
  }

  deleteCard(cardId) {
    return this._fetchRequest(`/cards/${cardId}`, { method: 'DELETE' });
  }

  addLike(cardId) {
    return this._fetchRequest(`/cards/${cardId}/likes`, { method: 'PUT' });
  }

  deleteLike(cardId) {
    return this._fetchRequest(`/cards/${cardId}/likes`, { method: 'DELETE' });
  }

  saveDataProfile(profileAvatar) {
    return this._fetchRequest('/users/me/avatar', {
      method: 'PATCH',
      body: JSON.stringify({ avatar: profileAvatar.updInput })
    });
  }

}
