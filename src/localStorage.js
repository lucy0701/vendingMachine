import DefaultData from './data.js';

export default class LocalStorage {
  constructor() {
    this.init();
  }

  init(){
    this.checkData('totalAmount');
    this.checkData('userCoinCount');
    this.checkData('machineCoinCount');
    this.checkData('items');
    this.checkData('myItemList');
    this.checkData('insultCoins');
    this.checkData('isPurchased');

  }

  checkData(key){
    if(this.readData(key) === null ){
      this.saveData(key,DefaultData[key]);
    }
  }

  readData(key) {
    return JSON.parse(localStorage.getItem(key));
  }
  saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
    return value;
  }

}