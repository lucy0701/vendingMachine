export class Model {
    constructor() {
        this.totalAmount = this.initData('totalAmount',0);
        this.userCoinCount = this.initData('userCoinCount',{ coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 });
        this.machineCoinCount = this.initData('machineCoinCount',{ coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 });
        this.items = this.initData('items',[
                { itemName: "루미700", price: 700, stock: 10, image: "/img/img09.png"},
                { itemName: "재희95", price: 95, stock: 10, image: "/img/img10.png"},
                { itemName: "여주155", price: 155, stock: 10, image: "/img/img11.png"},
                { itemName: "코순888", price: 888, stock: 10, image: "/img/img12.png"},
                { itemName: "익사10", price: 10, stock: 10, image: "/img/img13.png"},
                { itemName: "번18", price: 18, stock: 10, image: "/img/img14.png"},
                { itemName: "승목1000", price: 1000, stock: 10, image: "/img/img15.png"},
                { itemName: "죽순500", price: 500, stock: 10, image: "/img/img16.png"}
            
        ]);
        // this.totalAmount = JSON.parse(localStorage.getItem('totalAmount')) || 0;

        // this.userCoinCount = JSON.parse(localStorage.getItem('userCoinCount'));
        // if (this.userCoinCount === null) {
        //     this.userCoinCount = { coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 };
        //     localStorage.setItem('userCoinCount', JSON.stringify(this.userCoinCount));
        // };

        // this.machineCoinCount = JSON.parse(localStorage.getItem('machineCoinCount'));
        // if (this.machineCoinCount === null) {
        //     this.machineCoinCount = { coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 };
        //     localStorage.setItem('machineCoinCount', JSON.stringify(this.machineCoinCount));
        // };
        
        // this.items = JSON.parse(localStorage.getItem('items'));
        // if (this.items === null) {
        //     this.items = [
        //         { itemName: "루미700", price: 700, stock: 10, image: "/img/img09.png"},
        //         { itemName: "재희95", price: 95, stock: 10, image: "/img/img10.png"},
        //         { itemName: "여주155", price: 155, stock: 10, image: "/img/img11.png"},
        //         { itemName: "코순888", price: 888, stock: 10, image: "/img/img12.png"},
        //         { itemName: "익사10", price: 10, stock: 10, image: "/img/img13.png"},
        //         { itemName: "번18", price: 18, stock: 10, image: "/img/img14.png"},
        //         { itemName: "승목1000", price: 1000, stock: 10, image: "/img/img15.png"},
        //         { itemName: "죽순500", price: 500, stock: 10, image: "/img/img16.png"}
        //     ];
        //     localStorage.setItem('items', JSON.stringify(this.items));
        // };
    }
    initData(key, value) {
        const data = JSON.parse(localStorage.getItem(key));
        if (data === null) {
            this.updateData(key,value);
        };
        return value;
    }
    updateData(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }
}


