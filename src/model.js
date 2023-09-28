export class Model {
    constructor() {
        // 자판기 내부
        this.totalAmount = 0;
        this.insideCoins = [];
        this.priceList = [];
        this.itemStock = [];
        // 외부
        // this.coinCount = [];
        this.coinsNames = [];
    }

    getTotalAmount() {
        return this.totalAmount;
    }
    getOutCoins() {
        this.coinsNames = [[100,10], [50,9], [10,8], [5,7], [1,6]];
        return this.coinsNames;
    }
    getInCoins() {
        this.insideCoins = [[100,11], [50,11], [10,11], [5,11], [1,11]];
        return this.insideCoins;
    }
    getItemStock() {
        this.itemStock = [[500,10], [1000,9], [18,8], [10,7], [155,6], [95,5], [700,4], [888,3]];
        return this.itemStock;
    }

}

