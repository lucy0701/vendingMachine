import LocalStorage from './localStorage.js';

export default class Model extends LocalStorage {
    constructor() {
        super();
        this.totalAmount = this.getTotalAmount();
        this.userCoins = this.getUserCoinCount();
        this.machineCoins = this.getMachineCoinCount();
        this.items = this.getItems();
        this.myitemList = this.getmyItemList();
    }

    // 토탈화면 : 초기화 0, 금액 +,-
    // 유저 코인 : + , -
    // 자판기 코인 : + , -
    // 아이템 : 가격 변경, 재고 변경(구매시 -1, 재고조절)
    // 구매아이템 리스트 : 구매 아이템 추가, 삭제
   
    // 토탈화면
    addTotalAmount(coin){
        this.totalAmount += coin;
        this.saveData('totalAmount', this.totalAmount);
    }
    removeTotalAmount(amount){
        this.totalAmount -= amount;
        //금액은 컨트롤러에서
        this.saveData('totalAmount', this.totalAmount);
    }

    // 자판기 코인
    addMachineCoins(coin){
        this.machineCoins[coin] += 1;
        this.saveData('machineCoinCount', this.machineCoins);
    }
    // 자판기 코인은 여러개 빠질 수 있으므로 conut 사용
    removeMachineCoins(coin ,count){
        this.machineCoins[coin] -= count;
        this.saveData('machineCoinCount', this.machineCoins);
    }

    // 유저 코인
    addUserCoins(coin ,count){
        this.userCoins[coin] += count;
        this.saveData('userCoinCount', this.userCoins);
    }
    removeUserCoins(coin){
        this.userCoins[coin] -= 1;
        this.saveData('userCoinCount', this.userCoins);
    }

    // 재고
    addStock(itemIndex, count) {
        this.items[itemIndex].stock = count;
        this.saveData('items', this.items);
    }
    removeStock(itemIndex) {
        this.items[itemIndex].stock -= 1;
        this.saveData('items', this.items);
    }

    // 아이템 가격
    updatePrices(itemIndex, priceChange) {
        this.items[itemIndex].price = priceChange;
        this.saveData('items', this.items);
    }
    
    // 구매한 아이템
    addMyItem(itemIndex){
        this.myitemList.push(this.items[itemIndex].image);
        this.saveData('myItemList', this.myitemList);
    }
    removeMyItem(itemIndex) {
        this.myitemList.spilce(itemIndex, 1);
        this.saveData('myItemList', this.myitemList);
    }

    // get, set
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

    getmyItemList() {
        return this.readData('myItemList');
    }

}
