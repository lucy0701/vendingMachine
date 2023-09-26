export class Model {
    constructor() {
        // 자판기 내부
        this.totalAmount = 0;
        this.insideCoins = [];
        this.itemStock = [];
        this.priceList = [];
        // 외부
        this.coins = [];
        this.pocketCoins = [];
    }
    
    getTotalAmount() {
        return this.totalAmount;
    }

    getCoins() {
        coins = [500, 100, 50, 10, 1];
        return this.coins;
    }

}