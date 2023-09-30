export class Model {
    constructor() {
        this.totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;

        this.coinCount = JSON.parse(localStorage.getItem('coinCount'));
        if (this.coinCount === null) {
            this.coinCount = { coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 };
            localStorage.setItem('coinCount', JSON.stringify(this.coinCount));
        };

        this.systemCoin = JSON.parse(localStorage.getItem('systemCoin'));
        if (this.systemCoin === null) {
            this.systemCoin = { coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 };
            localStorage.setItem('systemCoin', JSON.stringify(this.systemCoin));
        };
        
        this.items = JSON.parse(localStorage.getItem('items'));
        if (this.items === null) {
            this.items = [
                { itemName: "루미700", price: 700, stock: 10, image: "/img/img09.png"},
                { itemName: "재희95", price: 95, stock: 10, image: "/img/img10.png"},
                { itemName: "여주155", price: 155, stock: 10, image: "/img/img11.png"},
                { itemName: "코순888", price: 888, stock: 10, image: "/img/img12.png"},
                { itemName: "익사10", price: 10, stock: 10, image: "/img/img13.png"},
                { itemName: "번18", price: 18, stock: 10, image: "/img/img14.png"},
                { itemName: "승목1000", price: 1000, stock: 10, image: "/img/img15.png"},
                { itemName: "죽순500", price: 500, stock: 10, image: "/img/img16.png"}
            ];
            localStorage.setItem('items', JSON.stringify(this.items));
        };
    }
    totalAmountUpdata() {
        localStorage.setItem('totalAmount', JSON.stringify(this.totalAmount));
    }
    coinCountUpdata() {
        localStorage.setItem('coinCount', JSON.stringify(this.coinCount));
    }
    systemCoinUpdata() {
        localStorage.setItem('systemCoin', JSON.stringify(this.systemCoin));
    }
    itemsUpdata() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }
}


