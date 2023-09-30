export class View {
    constructor() {
        // 모달
        this.popUpBtns = document.querySelectorAll('.popUpBtn');
        this.modalPop(this.popUpBtns);

        // 코인
        this.coinBtns = document.querySelectorAll('.coinBtn');
        this.userCoinCount = document.querySelectorAll('.userCoinCount');

        // 자판기 외부
        this.totalNum = document.querySelector('.totalNum');
        this.soldOuts = document.querySelectorAll('.soldOut');
        this.price = document.querySelectorAll('.price');

        // 자판기 내부
        this.itemStock = document.querySelectorAll('.itemStock');
        this.systemCoin = document.querySelector('.systemCoin');

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