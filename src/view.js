export default class View {
  constructor() {
    // 자판기 외부
    this.topBody = document.querySelector('.topBody');
    this.wallet = document.querySelector('#wallet');
    this.dropItem = document.querySelector('.dropItem');
    this.inventory = document.querySelector('#inventory');

    // 관리자
    this.itemNum = document.querySelector('#itemNum');
    this.managerPage = document.querySelector('#managerPage');
  }

  // 렌더링
  initItems(items) {
    let itemBoxes = '';
    let ManagerSelectOption = '';
    items.forEach((item, i) => {
      itemBoxes += this.renderItem(item, i);
      ManagerSelectOption += this.renderManagerSelectOption(item, i);
    });
    this.topBody.innerHTML = itemBoxes;
    this.itemNum.innerHTML = `
      <option disabled selected value="default">아이템 선택</option>
      ${ManagerSelectOption}
    `;
  }
  initCoins(userCoins, machineCoins) {
    let coinsBoxes = '';
    let machineCoinBoxes = '';

    Object.keys(userCoins).forEach((coin, i) => {
      coinsBoxes += this.renderUserCoin(userCoins, coin, i);
      machineCoinBoxes += this.renderMachineCoin(machineCoins, coin);
    });
    this.wallet.innerHTML = coinsBoxes;
    document.querySelector('.machineCoin').innerHTML = machineCoinBoxes;
  }

  //업데이트
  updateItems(items, index) {
    const prices = document.querySelectorAll('.price');
    const itemStocks = document.querySelectorAll('.itemStock');

    prices[index].textContent = `${items[index].price}`;
    itemStocks[index].textContent = `${items[index].stock}`;
  }

  updateCoins(userCoins, machineCoins) {
    const userCoinCount = document.querySelectorAll('.userCoinCount');
    const machineCoinCount = document.querySelectorAll('.machineCoinCount');

    Object.keys(userCoins).forEach((coin, index) => {
      userCoinCount[index].textContent = `${userCoins[coin]}`;
      machineCoinCount[index].textContent = `${coin} : ${machineCoins[coin]}`;
    });
  }

  updateTotalScreen(total) {
    document.querySelector('.totalNum').innerHTML = total;
  }

  updateMyItemList(myItemList) {
    let addMyitem = '';
    myItemList.forEach((myItem, i) => {
      addMyitem += this.addMytemList(myItem, i);
    });
    this.inventory.innerHTML = addMyitem;
    this.myItemList = document.querySelectorAll('.myItem');
  }

  // 아이템
  renderItem(item, index) {
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
  renderManagerSelectOption(item, index) {
    return `<option name='itemNum'>${item.itemName}</option>`;
  }
  // 유저 코인
  renderUserCoin(userCoins, coin, index) {
    return `
      <button class="userCoinBtn" data-index="${index}" value=${coin}>${coin}</button>
      <p class="userCoinCount">${userCoins[coin]}</p>
    `;
  }
  // 자판기 코인
  renderMachineCoin(machineCoins, coin) {
    return `<p class="machineCoinCount">${coin} : ${machineCoins[coin]}</p>`;
  }
  // 추가
  addMytemList(myItem, index) {
    return `
      <img class='myItem' data-index="${index}" src=${myItem} />
    `;
  }

  // 스타일
  // 구매 버튼 활성
  updateBuyBtn(totalAmount, items) {
    const buyBtns = document.querySelectorAll('.buyBtn');
    const soldOuts = document.querySelectorAll('.soldOut');

    items.forEach((item, i) => {
      if (totalAmount < item.price && item.stock !== 0) {
        buyBtns[i].style.backgroundColor = 'rgb(200, 200, 200)';
      } else if (item.stock === 0) {
        soldOuts[i].style.opacity = '1';
        buyBtns[i].style.backgroundColor = 'rgb(200, 200, 200)';
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
  initManagerPageValue(priceChange, stockChange) {
    document.querySelector("#managerPageModal").close();
    this.itemNum.value = 'default';
    priceChange.value = '';
    stockChange.value = '';
    priceChange.disabled = true;
    stockChange.disabled = true;
  }

  // 모달
  onClickModalBtn(btn, Modal) {
    btn.addEventListener('click', () => {
      if (Modal.open) {
        Modal.close();
      } else {
        Modal.show();
      }
    });
  }
}
