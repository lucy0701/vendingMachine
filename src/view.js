export default class View {
constructor() {
  // 모달
  this.walletModal = document.querySelector('#walletModal');
  this.walletBtn = document.querySelector('#walletBtn');
  this.inventoryModal = document.querySelector('#inventoryModal');
  this.inventoryBtn = document.querySelector('#inventoryBtn');
  this.managerBtn = document.querySelector('#managerBtn');

  // 자판기 외부
  this.topBody = document.querySelector('.topBody');
  this.wallet = document.querySelector('#wallet');
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

  // 렌더링
  initItems(items){
    let itemBoxes = '';
    let ManagerSelectOption = '';
    items.forEach((item,i) => {
      itemBoxes += this.renderItem(item,i);
      ManagerSelectOption += this.renderManagerSelectOption(item,i);
    });
    this.topBody.innerHTML = itemBoxes;
    this.itemNum.innerHTML = `
      <option disabled selected value="default">아이템 선택</option>
      ${ManagerSelectOption}
    `;

    this.prices = document.querySelectorAll('.price');
    this.itemStocks = document.querySelectorAll('.itemStock');
  }
  initCoins(userCoins,machineCoins){
    let coinsBoxes = '';
    let machineCoinBoxes = '';

    Object.keys(userCoins).forEach((coin,i) => {
      coinsBoxes += this.renderUserCoin(userCoins,coin,i);
      machineCoinBoxes += this.renderMachineCoin(machineCoins,coin);
    });
    this.wallet.innerHTML = coinsBoxes;
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
    let machineCoinBoxes = '';
    Object.keys(userCoins).forEach((coin,i) => {
      this.userCoinCount[i].textContent = `${userCoins[coin]}`;
      machineCoinBoxes += this.renderMachineCoin(machineCoins,coin);
    });
    this.machineCoin.innerHTML = machineCoinBoxes;
  }

  updateTotalScreen(total){
    this.totalNum.innerHTML = total;
  }

  // 구매이미지 업데이트
  updateMyItemList(myItemList) {
    let addMyitem = '';
    myItemList.forEach((myItem,i) => {
      addMyitem += this.addMytemList(myItem,i);
    });
    this.inventory.innerHTML = addMyitem;
    this.myItemList = document.querySelectorAll('.myItem');
  }

  // 아이템
  renderItem(item,index){
    return `
      <div class="itemBox">
        <div class="itemImg">
          <p class="soldOut">sold out</p>
          <div class="price">${item.price}</div>
          <div class="itemStock">${item.stock}</div>
          <img class="itemImgPrint" src=${item.image} />
        </div>
        <button class="buyBtn" data-index="${index}" >고백 박기</button>   
      </div>
    `;
  }
  // 관리자
  renderManagerSelectOption(item,index){
    return `<option name='itemNum' value=${index}>${item.itemName}</option>`;
  }
  // 유저 코인
  renderUserCoin(userCoins,coin,index){
    return `
      <button class="userCoinBtn" data-index="${index}" value=${coin}>${coin}</button>
      <p class="userCoinCount">${userCoins[coin]}</p>
    `;
  }
  // 자판기 코인
  renderMachineCoin(machineCoins, coin) {
    return `[ ${coin} : ${machineCoins[coin]} ]`;
  }
  // 추가
  addMytemList(myItem,index) {
    return `
      <img class='myItem' data-index="${index}" src=${myItem} />
    `;
  }

  // 스타일 
  // 구매 버튼 활성
  updateBuyBtn(totalAmount,items) {
    const buyBtns = document.querySelectorAll('.buyBtn');
    const soldOuts = document.querySelectorAll('.soldOut');
    items.forEach ((item,i) => {
      if (totalAmount < item.price) {
        buyBtns[i].style.backgroundColor= 'rgb(253, 233, 209)';
      } else if(item.stock === 0 ){
        soldOuts[i].style.opacity = '1';
        buyBtns[i].style.backgroundColor = 'rgb(155, 155, 155)';
      } else {
        soldOuts[i].style.opacity = '0';
        buyBtns[i].style.backgroundColor = 'rgb(60, 244, 192)';
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



  removeMyItem(index) {
    this.myItemList[index].remove();
  }

  // 관리자 (초기화)
  initManagerPageValue(){
    this.managerPage.style.visibility = 'hidden';
    this.itemNum.value = 'default';
    this.priceChange.value = '';
    this.stockChange.value = '';
  }

  // 모달
  onClickModalBtn(btn,Modal) {
    btn.addEventListener('click',() => {
      if(Modal.open){
        Modal.close();
      } else {
        Modal.show();
      }
    })
  }
  onClickManagerPageBtn() {
    this.managerBtn.addEventListener('click',() => {
      if (this.managerPage.style.visibility === 'visible'){
        this.managerPage.style.visibility = 'hidden';
      } else {
        this.managerPage.style.visibility = 'visible';                
      }
    })
  }
}
