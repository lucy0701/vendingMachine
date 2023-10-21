export default class View {
constructor() {
  // 모달
  this.popUpBtns = document.querySelectorAll('.popUpBtn');

  // 자판기 외부
  this.topBody = document.querySelector('.topBody');
  this.coinsBox = document.querySelector('.coinsBox');
  this.totalNum = document.querySelector('.totalNum');
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

    // 1. 아이템 리스트 화면 출력 (아이템, 가격, 구매버튼, 재고수량)
    // 2. 코인 화면 출력 (유저 코인, 자판기 코인, 토탈 화면)
    // 3. 메니저 페이지 화면
    // 4. 각 이벤트별 가져올 HTML 요소의 스타일 변경
    // - 솔드아웃 스티커, 구매 활성화 된 버튼, 드랍아이템 출력, 관리자페이지 변경 후 초기화

  // 렌더링
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

    this.buyBtns = document.querySelectorAll('.buyBtn');
    this.soldOuts = document.querySelectorAll('.soldOut');

    this.prices = document.querySelectorAll('.price');
    this.itemStocks = document.querySelectorAll('.itemStock');
  }
  initCoins(userCoins,machineCoins){
    const coinKeys = Object.keys(userCoins);
    let coinsBoxes = '';
    let machineCoinBoxes = '';

    coinKeys.forEach(coin => {
      coinsBoxes += this.renderUserCoin(userCoins,coin);
      machineCoinBoxes += this.renderMachineCoin(machineCoins,coin);
    });
    this.coinsBox.innerHTML = coinsBoxes;
    this.machineCoin.innerHTML = machineCoinBoxes;

    this.coinBtns = document.querySelectorAll('.userCoinBtn');
    this.userCoinCount = document.querySelectorAll('.userCoinCount');
  }

    //업데이트
  updateItems(items){
    items.forEach((item,i) => {
      this.prices[i].textContent = `${item.price}`;
      this.itemStocks[i].textContent = `${item.stock}`;
    });
  }

  updateCoins(userCoins,machineCoins){
    const coinKeys = Object.keys(userCoins);
    let machineCoinBoxes = '';
    coinKeys.forEach((coin,i) => {
      this.userCoinCount[i].textContent = `${userCoins[coin]}`;
      machineCoinBoxes += this.renderMachineCoin(machineCoins,coin);
    });
    this.machineCoin.innerHTML = machineCoinBoxes;
  }

  updateTotalScreen(total){
    this.totalNum.innerHTML = total;
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
        <button class="buyBtn">고백 박기</button>   
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
      <button class="userCoinBtn" value=${coin}>${coin}</button>
      <p class="userCoinCount">${userCoins[coin]}</p>
    `;
  }
  // 자판기 코인
  renderMachineCoin(machineCoins, coin) {
    return `[ ${coin} : ${machineCoins[coin]} ]`;
  }

  // 스타일 
  // 구매 버튼 활성
  registerBuyBtn(totalAmount,items) {
    items.forEach ((item,i) => {
      if (totalAmount < item.price) {
        this.buyBtns[i].style.backgroundColor= 'rgb(253, 233, 209)';
      } else if(item.stock === 0 ){
        this.soldOuts[i].style.opacity = '1';
        this.buyBtns[i].style.backgroundColor = 'rgb(155, 155, 155)';
      } else {
        this.soldOuts[i].style.opacity = '0';
        this.buyBtns[i].style.backgroundColor = 'rgb(60, 244, 192)';
      }
    });
  }

  // 구매아이템
  showDropItemDisplay(item) {
    this.dropItem.style.display = 'block';
    this.dropItem.setAttribute('src', item.image);
  }
  hideDropItemDisplay() {
    this.dropItem.style.display = 'none';
  }

  // 추가
  addMytemList(myItem) {
    return `
      <img class='myItem' src=${myItem} />
    `;
  }

  // 리스트이미지 업데이트
  updateMyItemList(myItemList) {
    let addMyitem = '';
    myItemList.forEach((myItem) => {
      addMyitem += this.addMytemList(myItem);
    });
    this.inventory.innerHTML = addMyitem;
    this.myItemList = document.querySelectorAll('.myItem');
  }

  removeMyItem(index) {
    this.myItemList[index].remove();
  }

  // 관리자 (초기화)
  initManagerPage(){
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