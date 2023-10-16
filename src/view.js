export default class View {
    constructor() {
        // 모달
        this.popUpBtns = document.querySelectorAll('.popUpBtn');

        // 코인
        this.coinBtns = document.querySelectorAll('.userCoin');

        // 자판기 외부
        this.topBody = document.querySelector('.topBody');
        this.coinsBox = document.querySelector('.coinsBox');
        this.totalNum = document.querySelector('.totalNum');
        this.soldOuts = document.querySelectorAll('.soldOut');
        this.buyBtns = document.querySelectorAll('.buyBtn');
        this.dropItem = document.querySelector('.dropItem');
        this.inventory = document.querySelector('#inventory');
        this.returnCoin = document.querySelector('.returnCoin');

        // 자판기 내부
        this.machineCoin = document.querySelector('.machineCoin');

        // 관리자
        this.itemNum = document.querySelector('#itemNum');
        this.stockChange = document.querySelector('#stockChange');
        this.priceChange = document.querySelector('#priceChange');
        this.managerPage = document.querySelector('#managerPage');

    }

    initItems(items){
        let itemBoxes = '';
        let ManagerSelectOption = '';
        items.forEach(item => {
            itemBoxes += this.renderItem(item);
            ManagerSelectOption += this.renderManagerSelectOption(item);
        });
        this.topBody.innerHTML = itemBoxes;
        this.itemNum.innerHTML = `
            <option disabled selected value="default">아이템 선택</option>
            ${ManagerSelectOption}
        `;
    }
    
    initCoins(coins,renderCoin,elem){
        let coinsBoxes = '';
        let coinName = Object.keys(coins);
        coinName.forEach(coin => {
            coinsBoxes += renderCoin(coins,coin);
        });
        elem.innerHTML = coinsBoxes;
    }

    // 아이템
    renderItem(item){
        return `
            <div class="itemBox">
                <div class="itemImg">
                    <p class="soldOut">sold out</p>
                    <div class="price">${item.price}</div>
                    <div class="itemStock">${item.stock}</div>
                    <img class="itemImgPrint" src=${item.image} />
                </div>
                <button class="buyBtn">구애 하기</button>   
            </div>
        `;
    }

    // 관리자
    renderManagerSelectOption(item){
        return `<option name='itemNum' value=${item.itemName}>${item.itemName}</option>`;
    }

    // 유저 코인
    renderUserCoin(userCoins,coin){
        return `
            <button class="userCoin" value=${coin}>${coin}</button>
            <p class="userCoinCount">${userCoins[coin]}</p>
        `;
    }
    // 자판기 코인
    renderMachineCoin(machineCoins, coin) {
        return `[ ${coin} : ${machineCoins[coin]} ]`;
    }

    // 토탈 화면
    updateTotalScreen(total){
        this.totalNum.innerHTML = total;
    }

    // 매진 (on/off)
    showSoldOut(index){
        this.soldOuts[index].style.opacity = '1';
        this.buyBtns[index].style.backgroundColor = 'rgb(253, 233, 209)';
    }
    hideSoldOut(){
        this.soldOuts[index].style.opacity = '0';
    }

    // 상품 버튼 (활성화)
    onBuyBtns(index){
        this.buyBtns[index].style.backgroundColor = 'rgb(60, 244, 192)';
    }
    offBuyBtns(index){
        this.buyBtns[index].style.backgroundColor= 'rgb(253, 233, 209)';
    }

    // 드랍아이템
    showDropItemDisplay() {
        this.dropItem.style.display = 'block';
    }
    hideDropItemDisplay() {
        this.dropItem.style.display = 'none';
    }

    // 관리자 (초기화)
    resetManagerPage(){
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