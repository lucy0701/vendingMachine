import LocalStorage from './localStorage.js';

export default class Model extends LocalStorage {
    constructor() {
        super();
    }
   
    // 토탈화면
    addTotalAmount(coin){
        this.saveData('totalAmount', this.getTotalAmount() + coin);
    }

    removeTotalAmount(amount){
        //금액은 컨트롤러에서
        this.saveData('totalAmount', this.getTotalAmount() - amount);
    }

    // 자판기 코인
    addMachineCoins(coin){
        const machineCoin = this.getMachineCoinCount();
        machineCoin[coin] += 1;
        this.saveData('machineCoinCount', machineCoin);
    }
    // 자판기 코인은 여러개 빠질 수 있으므로 conut 사용
    removeMachineCoins(coin ,count){
        const machineCoin = this.getMachineCoinCount();
        machineCoin[coin] -= count;
        this.saveData('machineCoinCount', machineCoin);
    }

    // 유저 코인
    addUserCoins(coin ,count){
        const userCoin = this.getUserCoinCount();
        userCoin[coin] += count;
        this.saveData('userCoinCount', userCoin);
    }
    removeUserCoins(coin){
        const userCoin = this.getUserCoinCount();
        userCoin[coin] -= 1;
        this.saveData('userCoinCount', userCoin);
    }

    // 인덱스를 파라미터로 받는 겟아이템 유틸 작성, 사용해서 에드스톡을 데이터를 이원화 하지않고 다시 작성
    // 코드가 늘어나더라도 안전하게, 가독성, 이원화를 최대한 피하도록
    getItem(index){
        const items = this.getItems();
        return items[index];
    }
    setItem(item,index){
        const items = this.getItems();
        items[index] = item;
        this.saveData('items',items);
    }

    // 재고
    addStock(itemIndex, count) {
        const item = this.getItem(itemIndex);
        item.stock = count;
        this.setItem(item, itemIndex);
    }
    removeStock(itemIndex) {
        const item = this.getItem(itemIndex);
        item.stock -= 1;
        this.setItem(item, itemIndex);
    }

    // 아이템 가격
    updatePrices(itemIndex, priceChange) {
        const item = this.getItem(itemIndex);
        item.price = priceChange;
        this.setItem(item, itemIndex);
    }
    
    // 구매한 아이템
    addMyItem(itemIndex){
        const myitemList = this.getmyItemList();
        const item = this.getItem(itemIndex);
        myitemList.push(item.image);
        this.saveData('myItemList', myitemList);
    }
    removeMyItem(itemIndex) {
        const myitemList = this.getmyItemList();
        myitemList.splice(itemIndex, 1);
        this.saveData('myItemList', myitemList);
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

    getmyItemList() {
        return this.readData('myItemList');
    }
}
