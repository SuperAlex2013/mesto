export default class UserInfo {
  constructor({ name, job}) {
    this._name = name;
    this._info = job;
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      info: this._info.textContent
    };
  }

  setUserInfo({ name, info }) {
    console.log(name, info)
    this._name.textContent = name;
    this._info.textContent = info;
  }
} 
