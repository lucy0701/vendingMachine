export default class Controller {
    constructor(model, view, servic) {
        this.view = view;
        this.model = model;
        this.servic = servic;
        this.controller = this;

        this.totalAmount = this.model.totalAmount;
        this.userCoinCount = this.model.userCoinCount;
        this.machineCoinCount = this.model.machineCoinCount;
        this.items = this.model.items;
        this.getItemList = this.model.getItemList;

        this.init();
        this.addCoinToTotalAmount();

        this.handleBalanceRefund();
        this.activateManagerMode();

        this.activatePurchase();
    }
    
    init(){
        // 토탈 화면
        this.view.updateTotalScreen(this.totalAmount);

        // 아이템
        this.view.updateItemInfo(this.items);
        this.view.displayItemPriceInfo();
        this.view.dispayItemImg();
        this.view.showSoldOut();
        this.view.itemStockCount();

        // 코인
        this.view.updateCoinInfo();
        this.view.updateUserCoinCount(this.userCoinCount);
        this.view.updateMachineCoinCount(this.machineCoinCount);

        // 관리자
        this.view.openManagerPage();
    }

    // 동전 투입 (유저코인 -, 토탈화면 +)
    addCoinToTotalAmount(){
        // 코인 넣기
        this.insertCoin = () => {
            this.view.coinBtns.forEach((coinBtn, i) => {
                coinBtn.addEventListener('click',() => {
                    const coinValue = Number(coinBtn.value);
                    const machineCoinkey = Object.keys(this.machineCoinCount)[i];
                    const UserCoinkey = Object.keys(this.userCoinCount)[i];
                    const getMachineCoin = this.machineCoinCount[machineCoinkey];
                    const getUserCoin = this.userCoinCount[UserCoinkey];

                    if ( getUserCoin > 0 ){
                        this.totalAmount += coinValue;
                        this.machineCoinCount[machineCoinkey] = getMachineCoin + 1;
                        this.userCoinCount[UserCoinkey] = getUserCoin - 1;
                    }

                    this.model.updateData('totalAmount',this.totalAmount);
                    this.model.updateData('machineCoinCount',this.machineCoinCount);
                    this.model.updateData('userCoinCount',this.userCoinCount);
                    this.init();
                });
            }); 
            
        } 
        this.insertCoin();
    }


    // 구매 활성 (구매 가능 상품)
    activatePurchase(){

        this.enableBuyButton = () => {
            for(let i = 0; i < this.view.buyBtns.length; i++) {
                this.view.buyBtns[i].addEventListener('click',() => {
                    if ( this.totalAmount >= this.items[i].price && 0 < this.items[i].stock ) {
                        this.view.dropItem.style.opacity = 1;
                        this.totalAmount -= this.items[i].price;
                        this.items[i].stock -= 1;
                        this.purchaseItem(i);
                    } else {
                        alert ('고백하실 수 없는 분입니다!');
                    }
                    this.model.updateData('totalAmount',this.totalAmount);
                    this.model.updateData('items',this.items);
                    this.init();
                });
            }
        }
        this.enableBuyButton();

        this.purchaseItem = ($itemIndex) => {
            const inventoryList = document.createElement('img');
            this.view.dropItem.setAttribute('src', this.items[$itemIndex].image);
            // 데이터에 추가
            this.getItemList.push(this.items[$itemIndex]);

            this.view.dropItem.addEventListener('click',() => {
                this.view.dropItem.style.opacity = 0;
                inventoryList.setAttribute('class','inventoryList');
                inventoryList.setAttribute('src', this.items[$itemIndex].image);
                this.view.inventory.appendChild(inventoryList);
            });
            this.model.updateData('getItemList',this.getItemList);
            this.init();
        }
    }

    // 환불 처리 (토탈금액 계산, 토탈 초기화, 자판기 금액 - )
    handleBalanceRefund(){
        const returnCoins = () => {
            const machineCoinKey = Object.keys(this.machineCoinCount);
            const userCoinKey = Object.keys(this.userCoinCount);

            switch(this.totalAmount > 0) {
                case (this.totalAmount >= 100) :
                    this.totalAmount -= 100;
                    this.machineCoinCount[machineCoinKey[4]] = this.machineCoinCount[machineCoinKey[4]] - 1;
                    this.userCoinCount[userCoinKey[4]] = this.userCoinCount[userCoinKey[4]] + 1;
                    break;
                case (this.totalAmount < 100 && this.totalAmount >= 50) :
                    this.totalAmount -= 50;
                    this.machineCoinCount[machineCoinKey[3]] = this.machineCoinCount[machineCoinKey[3]] - 1;
                    this.userCoinCount[userCoinKey[3]] = this.userCoinCount[userCoinKey[3]] + 1;
                    break;
                case (this.totalAmount < 50 && this.totalAmount >= 10) :
                    this.totalAmount -= 10;
                    this.machineCoinCount[machineCoinKey[2]] = this.machineCoinCount[machineCoinKey[2]] - 1;
                    this.userCoinCount[userCoinKey[2]] = this.userCoinCount[userCoinKey[2]] + 1;
                    break;
                case (this.totalAmount < 10 && this.totalAmount >= 5) :
                    this.totalAmount -= 5;
                    this.machineCoinCount[machineCoinKey[1]] = this.machineCoinCount[machineCoinKey[1]] - 1;
                    this.userCoinCount[userCoinKey[1]] = this.userCoinCount[userCoinKey[1]] + 1;
                    break;
                case (this.totalAmount < 5 && this.totalAmount >= 0) :
                    this.totalAmount -= 1;
                    this.machineCoinCount[machineCoinKey[0]] = this.machineCoinCount[machineCoinKey[0]] - 1;
                    this.userCoinCount[userCoinKey[0]] = this.userCoinCount[userCoinKey[0]] + 1;
                    break;
            }
            this.model.updateData('totalAmount', this.totalAmount);
            this.model.updateData('machineCoinCount', this.machineCoinCount);
            this.model.updateData('userCoinCount', this.userCoinCount);
            this.init();
        }
        this.returnBalance = () => {
            this.view.returnCoin.addEventListener('click',() => {
                while(true) {
                    if ( this.totalAmount > 0) {
                        returnCoins();
                    } else if (this.totalAmount === 0) {
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
            const selectValue = this.view.itemNum.options[this.view.itemNum.selectedIndex].value;
            return this.items.find(item => item.itemName === selectValue);
        }

        this.view.itemNum.addEventListener('change', () => {
            const seletItem = getItemSelectValue();

            if (seletItem !== undefined ) {
                this.view.priceChange.value = seletItem.price;
                this.view.stockChange.value = seletItem.stock;
            } else {
                alert ('잘못 된 접근 입니다.');
                this.openManagerPage();
            }
        });

        this.view.managerPage.addEventListener('submit',(e) => {
            e.preventDefault();
            const seletItem = getItemSelectValue();

            if (seletItem) {
                seletItem.price = this.view.priceChange.value;
                seletItem.stock = this.view.stockChange.value;
                
                this.view.displayItemPriceInfo(seletItem.price);
                this.view.itemStockCount(seletItem.stock);
                alert ('저장 완료');
            }
            this.view.openManagerPage();
            this.model.updateData('items',this.items);
            this.init();

        });
    }

}