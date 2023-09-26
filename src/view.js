export class View {
    constructor() {
        // 모달
        this.popBtns = document.querySelectorAll('.popBtn');
        this.modalPop(this.popBtns);

        // 코인
        this.coinBtns = document.querySelectorAll('.coinBtn');
        this.total = document.querySelector('.total');
        this.balances = document.querySelectorAll('.balance');

        // 자판기
        this.SoldOuts = document.querySelectorAll('.soldOut');
    }

    // 자판기 외부 (총금액/아이템가격/동전갯수)
    outsideVM(){
        this.total.setAttribute('value','0');
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