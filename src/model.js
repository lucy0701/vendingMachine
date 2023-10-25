import LocalStorage from './localStorage.js';

export default class Model extends LocalStorage {
  constructor() {
    super();
  }

  addTotalAmount(coin){
    return this.saveData('totalAmount', this.getTotalAmount() + coin);
  }

  removeTotalAmount(amount){
    return this.saveData('totalAmount', this.getTotalAmount() - amount);
  }

  addMachineCoins(coin){
    const machineCoin = this.getMachineCoinCount();
    machineCoin[coin] += 1;

    return this.saveData('machineCoinCount', machineCoin);
  }

  removeMachineCoins(coin ,count){
    const machineCoin = this.getMachineCoinCount();
    machineCoin[coin] -= count;
    
    return this.saveData('machineCoinCount', machineCoin);
  }

  addUserCoins(coin ,count){
    const userCoin = this.getUserCoinCount();
    userCoin[coin] += count;
    return this.saveData('userCoinCount', userCoin);
  }

  removeUserCoins(coin){
    const userCoin = this.getUserCoinCount();
    userCoin[coin] -= 1;
    return this.saveData('userCoinCount', userCoin);
  }

  getItem(index){
    const items = this.getItems();
    return items[index];
  }
  setItem(item,index){
    const items = this.getItems();
    items[index] = item;
    return this.saveData('items',items);
  }

  addStock(itemIndex, count) {
    const item = this.getItem(itemIndex);
    item.stock = count;
    return this.setItem(item, itemIndex);
  }
  removeStock(itemIndex) {
    const item = this.getItem(itemIndex);
    item.stock -= 1;
    return this.setItem(item, itemIndex);
  }

  updatePrices(itemIndex, priceChange) {
    const item = this.getItem(itemIndex);
    item.price = priceChange;
    return this.setItem(item, itemIndex);
  }

  addMyItem(itemIndex){
    const myitemList = this.getMyItemList();
    const item = this.getItem(itemIndex);
    myitemList.push(item.image);
    return this.saveData('myItemList', myitemList);
  }
  deleteMyItem(itemIndex) {
    const myitemList = this.getMyItemList();
    myitemList.splice(itemIndex, 1);
    return this.saveData('myItemList', myitemList);
  }

  // get
  getTotalAmount() {
    return this.readData('totalAmount');
  }

  getUserCoinCount() {
    return this.readData('userCoinCount');
  }

  getMachineCoinCount() {
    return this.readData('machineCoinCount');
 }

  getItems() {
    return this.readData('items');
  }

  getMyItemList() {
    return this.readData('myItemList');
  }
}
