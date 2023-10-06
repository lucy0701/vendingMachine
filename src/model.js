import data from './data.js';
import LocalStorage from './localStorage.js';

export default class Model extends LocalStorage {
    constructor() {
        super();
        this.data = data;
        this.getTotalAmount();
        this.getUserCoinCount();
        this.getMachineCoinCount();
        this.getItems();
        this.getmyItemList();
    }

    getTotalAmount() {
        return this.readData('totalAmount',this.data.totalAmount);
    }
    setTotalAmount($values) {
        this.saveData('totalAmount', $values);
        return this.getTotalAmount();
    }

    getUserCoinCount() {
        return this.readData('userCoinCount',this.data.userCoinCount);
    }
    setUserCoinCount($values) {
        this.saveData('userCoinCount', $values);
        return this.getTotalAmount();
    }

    getMachineCoinCount() {
        return this.readData('machineCoinCount',this.data.machineCoinCount);
    }
    setMachineCoinCount($values) {
        this.saveData('machineCoinCount', $values);
        return this.getTotalAmount();
    }

    getItems() {
        return this.readData('items',this.data.items);
    }
    setItems($values) {
        this.saveData('items', $values);
        return this.getTotalAmount();
    }

    getmyItemList() {
        return this.readData('myItemList',this.data.myItemList);
    }
    setmyItemList($values) {
        this.saveData('myItemList', $values);
        return this.getTotalAmount();
    }

}
