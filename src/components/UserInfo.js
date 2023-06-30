export default class UserInfo {
  constructor({ nameSelector, jobSelector }) {
    this._name = nameSelector;
    this._info = jobSelector;
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
