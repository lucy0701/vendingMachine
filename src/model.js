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
    const machineCoins = this.getMachineCoinCount();
    machineCoins[coin] += 1;

    return this.saveData('machineCoinCount', machineCoins);
  }

  removeUserCoins(coin){
    const userCoins = this.getUserCoinCount();
    userCoins[coin] -= 1;
    return this.saveData('userCoinCount', userCoins);
  }

  addInsultCoins(coin){
    const insultCoins = this.getInsultCoins();
    insultCoins[coin] += 1;
    return this.saveData('insultCoins', insultCoins);
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

  //set
  setUserCoins(userCoins) {
    return this.saveData('userCoinCount', userCoins);
  }
  setMachinCoins(machineCoins) {
    return this.saveData('machineCoinCount', machineCoins);
  }
  setInsultCoins(insultCoins){
    return this.saveData('insultCoins', insultCoins);
  }
  setTotalAmount(totalAmount) {
    return this.saveData('totalAmount', totalAmount);
  }
  setIsPurchased(isPurchased){
    return this.saveData('isPurchased',isPurchased)
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

  getInsultCoins() {
    return this.readData('insultCoins');
  }

  getIsPurchased(){
    return this.readData('isPurchased');
  }
}
