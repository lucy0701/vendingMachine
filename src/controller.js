export default class Controller {
    constructor(model, view) {
        this.v = view;
        this.m = model;
        
        this.init();

        this.addCoinToTotalAmount();
        this.activatePurchase();
        // this.handleBalanceRefund();
        this.activateManagerMode();

        this.v.setupmodalPop(this.v.popUpBtns);
    }
    
    init(){
        // 호출
        this.total = this.m.getTotalAmount();      
        this.userCoins = this.m.getUserCoinCount();
        this.machineCoins = this.m.getMachineCoinCount();
        this.items = this.m.getItems();
        this.getItemList = this.m.getmyItemList();

        this.v.initItems(this.items);
        this.v.initCoins(this.userCoins, this.v.renderUserCoin, this.v.coinsBox);
        this.v.initCoins(this.machineCoins, this.v.renderMachineCoin, this.v.machineCoin);
        this.v.updateTotalScreen(this.total);
    }

    // 동전 투입
    addCoinToTotalAmount() {
        this.v.coinBtns.forEach((coinBtn, i) => {
            coinBtn.addEventListener('click',() => {
                const coinName = Object.keys(this.userCoins)[i];
                const coins = parseInt(coinName);
                const userCoinCount = this.userCoins[coinName];

                if ( userCoinCount > 0 && this.total < 10000){
                    this.m.addTotalAmount(coins);
                    this.m.addMachineCoins(coinName);
                    this.m.removeUserCoins(coinName);

                } else if (this.total >= 10000) {
                    alert ('최대 금액을 넘었습니다!');
                }
                this.init();
            });
        }); 
    }
    

    // 구매
    activatePurchase(){

        this.enableBuyButton = () => {
            this.v.buyBtns.forEach((buyBtn, i) => {
                buyBtn.addEventListener('click',() => {
                    const item = this.items[i];

                    if ( this.total >= item.price && 0 < item.stock ) {
                        this.v.onDropItem();
                        this.m.removeTotalAmount(item.price);
                        this.m.removeStock(i);
                        this.getDropItem(i);
                    } else if (item.stock === 0) {
                        alert ('다 팔렸어요. 다음에 이용해주세요.');
                    } else if (this.total < item.price) {
                        alert ('금액이 부족합니다');
                    }
                    this.init();
                });
            });
        }
        this.enableBuyButton();

        this.getDropItem = (itemIndex) => {
            const myItem = document.createElement('img');
            const itemImg = this.items[itemIndex].image;
            
            this.v.dropItem.setAttribute('src', itemImg);

            this.v.dropItem.addEventListener('click',() => {
                this.v.offDropItem();
                this.m.addMyItem(itemIndex);
                myItem.classList.add('myItem');
                myItem.setAttribute('src', itemImg);
                this.v.inventory.appendChild(myItem);
            });
            this.init();
        }

    }

    // 환불 처리
    // handleBalanceRefund(){
    //     const returnCoins = () => {
    //         const machineCoinKey = Object.keys(this.machineCoin);
    //         const userCoinKey = Object.keys(this.userCoin);

    //         switch(this.total > 0) {
    //             case (this.total >= 100) :
    //                 this.total -= 100;
    //                 this.machineCoin[machineCoinKey[4]] = this.machineCoin[machineCoinKey[4]] - 1;
    //                 this.userCoin[userCoinKey[4]] = this.userCoin[userCoinKey[4]] + 1;
    //                 break;
    //             case (this.total < 100 && this.total >= 50) :
    //                 this.total -= 50;
    //                 this.machineCoin[machineCoinKey[3]] = this.machineCoin[machineCoinKey[3]] - 1;
    //                 this.userCoin[userCoinKey[3]] = this.userCoin[userCoinKey[3]] + 1;
    //                 break;
    //             case (this.total < 50 && this.total >= 10) :
    //                 this.total -= 10;
    //                 this.machineCoin[machineCoinKey[2]] = this.machineCoin[machineCoinKey[2]] - 1;
    //                 this.userCoin[userCoinKey[2]] = this.userCoin[userCoinKey[2]] + 1;
    //                 break;
    //             case (this.total < 10 && this.total >= 5) :
    //                 this.total -= 5;
    //                 this.machineCoin[machineCoinKey[1]] = this.machineCoin[machineCoinKey[1]] - 1;
    //                 this.userCoin[userCoinKey[1]] = this.userCoin[userCoinKey[1]] + 1;
    //                 break;
    //             case (this.total < 5 && this.total >= 0) :
    //                 this.total -= 1;
    //                 this.machineCoin[machineCoinKey[0]] = this.machineCoin[machineCoinKey[0]] - 1;
    //                 this.userCoin[userCoinKey[0]] = this.userCoin[userCoinKey[0]] + 1;
    //                 break;
    //         }
    //         this.init();
    //     }
    //     this.returnBalance = () => {
    //         this.v.returnCoin.addEventListener('click',() => {
    //             while(true) {
    //                 if ( this.total > 0) {
    //                     returnCoins();
    //                 } else if (this.total === 0) {
    //                     break;
    //                 }
    //             }
    //         });
    //     } 
    //     this.returnBalance();
    // }


    // 관리자
    activateManagerMode(){

        const getItemSelectValue = () => {
            const selectValue = this.v.itemNum.options[this.v.itemNum.selectedIndex].value;
            return this.items.find(item => item.itemName === selectValue);
        }

        this.v.itemNum.addEventListener('change', () => {
            const seletItem = getItemSelectValue();

            if (seletItem !== undefined ) {

                this.v.priceChange.value = seletItem.price;
                this.v.stockChange.value = seletItem.stock;
            } else {
                alert ('잘못 된 접근 입니다.');
                this.v.openManagerPage();
            }
        });

        this.v.managerPage.addEventListener('submit',(e) => {
            e.preventDefault();
            const seletItem = getItemSelectValue();

            if (seletItem) {
                seletItem.price = this.v.priceChange.value;
                seletItem.stock = this.v.stockChange.value;
                
                this.v.displayItemPriceInfo(seletItem.price);
                this.v.itemStockCount(seletItem.stock);
                alert ('저장 완료');
            }
            
            this.v.openManagerPage();
            this.init();

        });
    }

}