export class View {
    constructor() {
        // 모달
        this.popBtns = document.querySelectorAll('.popUpBtn');
        this.modalPop(this.popBtns);

        // 코인
        this.coins = document.querySelectorAll('.userCoin');
        this.coinBtns = document.querySelectorAll('.coinBtn');
        this.balances = document.querySelectorAll('.userCoinCount');

        // 자판기 외부
        this.total = document.querySelector('.totalNum');
        this.soldOuts = document.querySelectorAll('.soldOut');
        this.price = document.querySelectorAll('.price');

        // 자판기 내부
        this.itemStock = document.querySelectorAll('.itemStock');
        this.inCoin = document.querySelector('.systemCoin');

    }

    // 자판기 외부 (총금액/아이템가격/동전갯수)
    outsideTotal($total){
        this.total.innerHTML = `${$total}`;
    }
    outsideCoin($coin){
        for(let i = 0; i < this.coins.length; i++){
            this.coins[i].innerHTML = `${$coin[i][0]}`;
            this.coinBtns[i].innerHTML = `${$coin[i][0]}`;
            this.balances[i].innerHTML = `${$coin[i][1]}`;
        }
    }
    outsideItemPrice($itemPrice){
        for(let i = 0; i < this.price.length; i++){
            this.price[i].innerHTML = `${$itemPrice[i][0]}`;
            this.itemStock[i].innerHTML = `${$itemPrice[i][1]}`;
        }
    }

    insertCoin($coin,$total,$inCoin){

    }
    
    // 자판기 내부 
    insideCoin($inCoin){
        for(let i = 0; i < this.coins.length; i++){
            this.inCoin.innerHTML += ` [ ${$inCoin[i][0]} : ${$inCoin[i][1]} ] `;
        }
    }
    
    // 모달 (다음엔 dialog로 해보기)
    modalPop(popBtns) {
        popBtns.forEach((popBtn) => {
            popBtn.addEventListener('click',() => {
                let modal = popBtn.getAttribute('href');
                let modalPop = document.querySelector(modal);
                if (modalPop.style.visibility === 'visible'){
                    modalPop.style.visibility = 'hidden';
                } else {
                    modalPop.style.visibility = 'visible';                
                }
            });
        });
    }

}