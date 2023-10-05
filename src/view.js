export default class View {
    constructor() {
        // 모달
        this.popUpBtns = document.querySelectorAll('.popUpBtn');
        this.setupmodalPop(this.popUpBtns);

        // 코인
        this.coinBtns = document.querySelectorAll('.userCoin');
        this.userCoin = document.querySelectorAll('.userCoinCount');

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
        this.machineCoin = document.querySelector('.machineCoin');

        // 관리자
        this.itemNum = document.querySelector('#itemNum');
        this.stockChange = document.querySelector('#stockChange');
        this.priceChange = document.querySelector('#priceChange');
        this.managerPage = document.querySelector('#managerPage');

    }


    // 토탈 화면
    updateTotalScreen($total){

        this.totalNum.innerHTML = $total;
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
                    this.buyBtns[i].style.backgroundColor= 'rgb(253, 233, 209)';
                    this.soldOuts[i].style.opacity = '1';
                } else if ( $soldOuts === 0 ) {
                    this.buyBtns[i].style.backgroundColor = 'rgb(60, 244, 192)';
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
    updateCoinInfo(){

        // // 유저 코인
        this.updateUserCoinCount = ($uCoin) => {
            for ( let i = 0; i < this.userCoin.length; i++ ){
                this.userCoin[i].innerHTML = `${$uCoin[Object.keys($uCoin)[i]]}`;
            }
        }

        // 자판기 내 코인
        this.updateMachineCoinCount = ($mCoin) => {
            this.machineCoin.innerHTML = '';
            for( let coinCount in $mCoin ) {
                this.machineCoin.innerHTML += `[ ${coinCount} : ${$mCoin[coinCount]} ]`
            }
        }
    }


    // 관리자 (재고 조정)
    openManagerPage(){

        this.managerPage.style.visibility = 'hidden';
        this.itemNum.value = 'default';
        this.priceChange.value = '';
        this.stockChange.value = '';
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