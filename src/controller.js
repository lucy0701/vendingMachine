export class Controller {
    constructor(model, view) {
        this.view = view;
        this.model = model;
        this.controller = this;

        this.init();
        this.totalResults();
        // this.coinResults();
        // this.itemResults();
        // this.inCoinResults();
    }

    init(){

    }
    totalResults(){
        let $total = this.model.getTotalAmount();
        this.view.outsideTotal($total);

        let $coin = this.model.getOutCoins();
        this.view.outsideCoin($coin);

        let $itemPrice = this.model.getItemStock();
        this.view.outsideItemPrice($itemPrice);

        let $inCoin = this.model.getInCoins();
        this.view.insideCoin($inCoin);

        this.view.insertCoin($coin,$total,$inCoin);
    }

    inCoinResults() {
        for(let i = 0; i < this.coinBtns.length; i++) {
            this.coinBtns[i].addEventListener('click',()=>{
                $coin = $coin[i][1]-1;
                $total += $coin[i][0];
                $inCoin = $inCoin[i][1]+1;
            })
        }
    }

 

    // coinResults() {
    //     let $coin = this.model.getOutCoins();
    //     this.view.outsideCoin($coin);
    // }
    // itemResults() {
    //     let $itemPrice = this.model.getItemStock();
    //     this.view.outsideItemPrice($itemPrice);
    // }
    // inCoinResults() {
    //     let $inCoin = this.model.getInCoins();
    //     this.view.insideCoin($inCoin);
    // }



}