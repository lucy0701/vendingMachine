import LocalStorage from './localStorage.js';

export default class Model extends LocalStorage {
  constructor() {
    super();
  }


  // 토탈화면
  addTotalAmount(coin){
    return this.saveData('totalAmount', this.getTotalAmount() + coin);
  }

  removeTotalAmount(amount){
    //금액은 컨트롤러에서
    return this.saveData('totalAmount', this.getTotalAmount() - amount);
  }

  // 자판기 코인
  addMachineCoins(coin){
    const machineCoin = this.getMachineCoinCount();
    machineCoin[coin] += 1;

    return this.saveData('machineCoinCount', machineCoin);
  }
  // 자판기 코인은 여러개 빠질 수 있으므로 conut 사용
  removeMachineCoins(coin ,count){
    const machineCoin = this.getMachineCoinCount();
    machineCoin[coin] -= count;
    
    return this.saveData('machineCoinCount', machineCoin);
  }

  // 유저 코인
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

  // 재고
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

  // 아이템 가격
  updatePrices(itemIndex, priceChange) {
    const item = this.getItem(itemIndex);
    item.price = priceChange;
    return this.setItem(item, itemIndex);
  }

  // 구매한 아이템
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
