export default class Controller {
    constructor(model, view) {
        this.v = view;
        this.m = model;

        this.total = this.m.getTotalAmount();
        this.userCoin = this.m.getUserCoinCount();
        this.machineCoin = this.m.getMachineCoinCount();
        this.items = this.m.getItems();
        this.getItemList = this.m.getmyItemList();

        this.init();
        this.addCoinToTotalAmount();
        this.activatePurchase();
        this.handleBalanceRefund();
        this.activateManagerMode();

        this.myItemList();
    }
    
    init(){
        // 토탈 화면
        this.v.updateTotalScreen(this.total);

        // 아이템
        this.v.updateItemInfo(this.items);
        this.v.displayItemPriceInfo();
        this.v.dispayItemImg();
        this.v.itemStockCount();

        // 코인
        this.v.updateCoinInfo();
        this.v.updateUserCoinCount(this.userCoin);
        this.v.updateMachineCoinCount(this.machineCoin);

        // 관리자
        this.v.openManagerPage();

        this.v.onBuyBtn(this.items,this.total);
        this.v.showSoldOut(this.items);
    }

    // 동전 투입 (유저코인 -, 토탈화면 +)
    addCoinToTotalAmount(){
        // 코인 넣기
        this.insertCoin = () => {
            this.v.coinBtns.forEach((coinBtn, i) => {
                coinBtn.addEventListener('click',() => {
                    const coinValue = Number(coinBtn.value);
                    const machineCoinkey = Object.keys(this.machineCoin)[i];
                    const UserCoinkey = Object.keys(this.userCoin)[i];
                    const getMachineCoin = this.machineCoin[machineCoinkey];
                    const getUserCoin = this.userCoin[UserCoinkey];

                    if ( getUserCoin > 0 && this.total < 10000){
                        this.total += coinValue;
                        this.machineCoin[machineCoinkey] = getMachineCoin + 1;
                        this.userCoin[UserCoinkey] = getUserCoin - 1;

                    } else if (this.total >= 10000) {
                        alert ('최대 금액을 넘었습니다!');
                    }
                    this.init();
                });
            }); 
        } 
        this.insertCoin();

    }

    // 구매
    activatePurchase(){

        this.enableBuyButton = () => {
            for(let i = 0; i < this.v.buyBtns.length; i++) {
                this.v.buyBtns[i].addEventListener('click',() => {
                    if ( this.total >= this.items[i].price && 0 < this.items[i].stock ) {
                        this.v.dropItem.style.opacity = 1;
                        this.total -= this.items[i].price;
                        this.items[i].stock -= 1;
                        this.purchaseItem(i);
                    } else if ( 0 === this.items[i].stock ) {
                        alert ('다 팔렸어요. 다음에 이용해주세요.');
                    } else if (this.total < this.items[i].price) {
                        alert ('금액이 부족합니다');
                    }
                    this.init();
                });
            }
        }
        this.enableBuyButton();

        this.purchaseItem = ($itemIndex) => {
            const inventoryList = document.createElement('img');
            this.v.dropItem.setAttribute('src', this.items[$itemIndex].image);
            this.getItemList.push(this.items[$itemIndex]);
            this.v.dropItem.addEventListener('click',() => {
                this.v.dropItem.style.opacity = 0;
                // 데이터에 추가
                inventoryList.setAttribute('class','inventoryList');
                inventoryList.setAttribute('src', this.items[$itemIndex].image);
                this.v.inventory.appendChild(inventoryList);
            });
            this.init();
        }

        this.myItemList = () => {
            
            this.getItemList.forEach((item) => {
                const inventoryList = document.createElement('img');
                inventoryList.setAttribute('class','inventoryList');
                inventoryList.setAttribute('src', item.image);
                this.v.inventory.appendChild(inventoryList);
            });
        }
    }

    // 환불 처리 (토탈금액 계산, 토탈 초기화, 자판기 금액 - )
    handleBalanceRefund(){
        const returnCoins = () => {
            const machineCoinKey = Object.keys(this.machineCoin);
            const userCoinKey = Object.keys(this.userCoin);

            switch(this.total > 0) {
                case (this.total >= 100) :
                    this.total -= 100;
                    this.machineCoin[machineCoinKey[4]] = this.machineCoin[machineCoinKey[4]] - 1;
                    this.userCoin[userCoinKey[4]] = this.userCoin[userCoinKey[4]] + 1;
                    break;
                case (this.total < 100 && this.total >= 50) :
                    this.total -= 50;
                    this.machineCoin[machineCoinKey[3]] = this.machineCoin[machineCoinKey[3]] - 1;
                    this.userCoin[userCoinKey[3]] = this.userCoin[userCoinKey[3]] + 1;
                    break;
                case (this.total < 50 && this.total >= 10) :
                    this.total -= 10;
                    this.machineCoin[machineCoinKey[2]] = this.machineCoin[machineCoinKey[2]] - 1;
                    this.userCoin[userCoinKey[2]] = this.userCoin[userCoinKey[2]] + 1;
                    break;
                case (this.total < 10 && this.total >= 5) :
                    this.total -= 5;
                    this.machineCoin[machineCoinKey[1]] = this.machineCoin[machineCoinKey[1]] - 1;
                    this.userCoin[userCoinKey[1]] = this.userCoin[userCoinKey[1]] + 1;
                    break;
                case (this.total < 5 && this.total >= 0) :
                    this.total -= 1;
                    this.machineCoin[machineCoinKey[0]] = this.machineCoin[machineCoinKey[0]] - 1;
                    this.userCoin[userCoinKey[0]] = this.userCoin[userCoinKey[0]] + 1;
                    break;
            }
            this.init();
        }
        this.returnBalance = () => {
            this.v.returnCoin.addEventListener('click',() => {
                while(true) {
                    if ( this.total > 0) {
                        returnCoins();
                    } else if (this.total === 0) {
                        break;
                    }
                }
            });
        } 
        this.returnBalance();
    }


    // 관리자 (재고 채우기, 가격 조절)
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