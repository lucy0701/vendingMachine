export default class View {
    constructor() {
        // 모달
        this.popUpBtns = document.querySelectorAll('.popUpBtn');
        this.setupmodalPop(this.popUpBtns);

        // 코인
        this.coinBtns = document.querySelectorAll('.userCoin');
        this.userCoinCount = document.querySelectorAll('.userCoinCount');

        // 자판기 외부
        this.totalNum = document.querySelector('.totalNum');
        this.soldOuts = document.querySelectorAll('.soldOut');
        this.itemPrice = document.querySelectorAll('.price');
        this.itemImgPrint = document.querySelectorAll('.itemImgPrint');
        this.buyBtns = document.querySelectorAll('.buyBtn');
        this.dropItem = document.querySelector('.dropItem');
        this.inventory = document.querySelector('#inventory');
        this.returnCoin = document.querySelector('.returnCoin');

        // 자판기 내부
        this.itemStock = document.querySelectorAll('.itemStock');
        this.machineCoinCount = document.querySelector('.machineCoin');

        // 관리자
        this.itemNum = document.querySelector('#itemNum');
        this.stockChange = document.querySelector('#stockChange');
        this.priceChange = document.querySelector('#priceChange');
        this.managerPage = document.querySelector('#managerPage');

        // 테스트
        // this.userCoins = { coin100: 10, coin50: 10, coin10: 10, coin5: 10, coin1: 10 };
        // this.machineCoin = { '100': 10, '50': 10, '10': 10, '5': 10, '1': 10 };
        // this.items = [
        //     { itemName: "루미700", price: 700, stock: 1, image: "../img/img09.png"},
        //     { itemName: "재희95", price: 95, stock: 2, image: "../img/img10.png"},
        //     { itemName: "여주155", price: 155, stock: 3, image: "../img/img11.png"},
        //     { itemName: "코순888", price: 888, stock: 4, image: "../img/img12.png"},
        //     { itemName: "익사10", price: 10, stock: 5, image: "../img/img13.png"},
        //     { itemName: "번18", price: 18, stock: 6, image: "../img/img14.png"},
        //     { itemName: "승목1000", price: 1000, stock: 7, image: "../img/img15.png"},
        //     { itemName: "죽순500", price: 500, stock: 8, image: "../img/img16.png"}
        // ];
        // this.getItemList = [];
        // this.a = 1;

        // this.updateCoinInfo(this.userCoins,this.machineCoin);
        // this.updateUserCoinCount(this.userCoins);
        // this.updateMachineCoinCount(this.machineCoin);

        // this.updateItemInfo(this.items);
        // this.displayItemPriceInfo();
        // this.dispayItemImg();
        // this.itemStockCount(this.items);

        // this.showSoldOut();
        // this.processPurchase(this.a, this.items, this.getItemList);
        // this.enableBuyButton(this.a, this.items, this.getItemList);
        // this.purchaseItem();

        // this.openManagerPage(this.items);
    }
    
    // 토탈 화면
    updateTotalScreen($totalNumPrint){
        this.totalNum.innerHTML = $totalNumPrint;
    }
    // 상품
    updateItemInfo($items){

        // 가격
        this.displayItemPriceInfo = () => {
            for ( let i = 0; i < this.itemPrice.length; i++ ){
                this.itemPrice[i].innerHTML = `${ $items[i].price }`;
            }
        }

        // 아이템 이미지
        this.dispayItemImg = () => {
            for ( let i = 0; i < this.itemImgPrint.length; i++ ){
                this.itemImgPrint[i].setAttribute( 'src', $items[i].image);
                this.itemImgPrint[i].setAttribute( 'alt', $items[i].itemName);
            }
        }

        // 매진 (on/off)
        this.showSoldOut = ($soldOuts) => {
            for ( let i = 0; i < this.soldOuts.length; i++ ){
                if ( $soldOuts === 1 ) {
                    this.soldOuts[i].style.opacity = '1';
                } else {
                    this.soldOuts[i].style.opacity = '0';
                }
            }
        }

        // 재고
        this.itemStockCount = () => {
            for ( let i = 0; i < this.itemStock.length; i++ ){
                this.itemStock[i].innerHTML = `${ $items[i].stock}`;
            }
        }
    }
 
    //코인
    updateCoinInfo($userCoin,$machineCoin){

        // 유저 코인
        this.updateUserCoinCount = ($userCoin) => {
            for ( let i = 0; i < this.userCoinCount.length; i++ ){
                this.userCoinCount[i].innerHTML = `${$userCoin[Object.keys($userCoin)[i]]}`;
            }
        }

        // 자판기 내 코인
        this.updateMachineCoinCount = ($machineCoin) => {
            for( let coinCount in $machineCoin ) {
                this.machineCoinCount.innerHTML += `[ ${coinCount} : ${$machineCoin[coinCount]} ]`
            }
        }
    }

    // 관리자 (재고 조정) (컨트롤에서..?)
    openManagerPage($items){

        const getItemSelectValue = () => {
            const selectValue = this.itemNum.options[this.itemNum.selectedIndex].value;
            return $items.find(item => item.itemName === selectValue);
        }

        const managerPageInit = () => {
            this.managerPage.style.visibility = 'hidden';
            this.itemNum.value = 'default';
            this.priceChange.value = '';
            this.stockChange.value = '';
        }

        this.itemNum.addEventListener('change', () => {
            const seletItem = getItemSelectValue();

            if (seletItem !== undefined ) {
                this.priceChange.value = seletItem.price;
                this.stockChange.value = seletItem.stock;
            } else {
                alert ('잘못 된 접근 입니다.');
                managerPageInit();
            }
        });

        this.managerPage.addEventListener('submit',(e) => {
            e.preventDefault();
            const seletItem = getItemSelectValue();

            if (seletItem) {
                seletItem.price = this.priceChange.value;
                seletItem.stock = this.stockChange.value;
                // 저장과 출력 로직 (컨트롤에서 모델관련 로직 필요)
                this.displayItemPriceInfo(seletItem.price);
                this.itemStockCount(seletItem.stock);
                alert ('저장 완료');
            }
            managerPageInit();
        });
    }

    // 구매 (버튼활성 / 아이템 출력 / 출력아이템 리스트)
    processPurchase($switch, $items) {

        // 코인 넣기
        this.insertCoin = () => {
            for( let i = 0; i < this.coinBtns.length; i++ ){
                this.coinBtns[i].addEventListener('click',() => {
                    // 코인 관련 로직 (컨트롤로 전송)
                });
            }
        }

        // 버튼 온 / 구매
        this.enableBuyButton = ($switch, $items, $getItemList) => {
            for(let i = 0; i < this.buyBtns.length; i++) {
                if ($switch === 1 ) {
                    this.buyBtns[i].style.backgroundColor = 'rgb(60, 244, 192)';
                } else {
                    this.buyBtns[i].style.backgroundColor= 'rgb(253, 233, 209)';
                }
                this.buyBtns[i].addEventListener('click',() => {
                    if ($switch === 1 ) {
                        // 구매 관련 로직 (컨트롤로 전송)
                        this.dropItem.style.opacity = 1;
                        this.purchaseItem(i, $items, $getItemList);
                    } else {
                        alert ('고백하실 수 없는 분입니다!');
                    }
                });
            }
        }

        // 구매한 아이템
        this.purchaseItem = ($itemIndex,$items,$getItemList) => {

            const inventoryList = document.createElement('img');
            this.dropItem.setAttribute('src', $items[$itemIndex].image);

            // 데이터에 추가하는 로직이라 컨트롤러로 이동해야할까?
            $getItemList.push($items[$itemIndex]);

            this.dropItem.addEventListener('click',() => {
                this.dropItem.style.opacity = 0;
                inventoryList.setAttribute('class','inventoryList');
                inventoryList.setAttribute('src', $items[$itemIndex].image);
                this.inventory.appendChild(inventoryList);
            });

        }
    }

    // 환불 버튼 (동전 / 토탈화면)
    processRefund() {
        this.returnCoin.addEventListener('click',() => {
            // 컨트롤러에서 처리를 해야할듯 하다.
        });

    }

    // 모달 (다음엔 dialog로 해보기)
    setupmodalPop(popBtns) {

        popBtns.forEach((popBtn) => {
            popBtn.addEventListener('click',() => {
                const modal = popBtn.getAttribute('href');
                const modalPop = document.querySelector(modal);

                if (modalPop.style.visibility === 'visible'){
                    modalPop.style.visibility = 'hidden';
                } else {
                    modalPop.style.visibility = 'visible';                
                }
            });
        });
    }

}