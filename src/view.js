export default class View {
  constructor() {
    // 자판기 외부
    this.topBody = document.querySelector('.topBody');
    this.wallet = document.querySelector('#wallet');
    this.dropItem = document.querySelector('.dropItem');
    this.inventory = document.querySelector('#inventory');

    // 관리자
    this.selectItem = document.querySelector('#selectItem');
    this.managerForm = document.querySelector('#managerForm');

    this.initEventHandlers();
  }

  initEventHandlers() {
    this.onClickModalBtn(
      document.querySelector('#walletBtn'),
      document.querySelector('#walletModal'),
    );
    this.onClickModalBtn(
      document.querySelector('#inventoryBtn'),
      document.querySelector('#inventoryModal'),
    );
    this.onClickModalBtn(
      document.querySelector('#managerBtn'),
      document.querySelector('#managerFormModal'),
    );
    this.onClickModalBtn(
      document.querySelector('.managerFormClose'),
      document.querySelector('#managerFormModal'),
    );

    document
    .querySelector('.myItemDelete-01')
    .addEventListener('click', this.onClickDeleteMyItemBtn);

    this.managerForm.addEventListener('change', this.onChangeInput);
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
    this.selectItem.innerHTML = `
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
        <button class="buyBtn" data-item-index="${index}" disabled >고백 박기</button>   
      </div>
    `;
  }

  // 관리자
  renderManagerSelectOption(item) {
    return `<option name='selectItem'>${item.itemName}</option>`;
  }
  // 유저 코인
  renderUserCoin(userCoins, coin, index) {
    return `
      <button class="userCoinBtn" data-user-index="${index}" value=${coin}>${coin}</button>
      <p class="userCoinCount">${userCoins[coin]}</p>
    `;
  }
  // 자판기 코인
  renderMachineCoin(machineCoins, coin) {
    return `<p class="machineCoinCount">${coin} : ${machineCoins[coin]} </p>`;
  }
  // 추가
  addMytemList(myItem, index) {
    return `
    <div class='myItemBox'>
      <input type="checkbox" name='checkbox' data-myitem-checkbox-index="${index}" class='itemCheckBox'/>
      <img class='myItemImg' data-myitem-index="${index}" src=${myItem} />
    </div>
    `;
  }

  // 스타일
  // 구매 버튼 활성
  updateBuyBtn(totalAmount, items) {
    const buyBtns = document.querySelectorAll('.buyBtn');
    const soldOuts = document.querySelectorAll('.soldOut');

    items.forEach((item, i) => {
      if (totalAmount < item.price) {
        buyBtns[i].style.backgroundColor = '';
        buyBtns[i].disabled = true;
      } else if (item.stock === 0) {
        buyBtns[i].style.backgroundColor = '';
        soldOuts[i].style.display = 'block';
        buyBtns[i].disabled = true;
      } else {
        soldOuts[i].style.display = 'none';
        buyBtns[i].style.backgroundColor = 'rgb(60, 244, 192)';
        buyBtns[i].disabled = false;
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
    const myItemBox = document.querySelectorAll('.myItemBox');
    myItemBox[index].remove();
  }

  // 관리자 (초기화)
  initManagerinputValue(priceChange, stockChange, formSubmitBtn) {
    document.querySelector('#managerFormModal').close();
    this.selectItem.value = 'default';
    priceChange.value = '';
    stockChange.value = '';
    priceChange.disabled = true;
    stockChange.disabled = true;
    formSubmitBtn.disabled = true;
  }

  // 인풋 상태
  onFocusInfut = (inputChange, index) => {
    const inputInfoText = document.querySelectorAll('.inputInfoText');
    inputChange.style.borderColor = 'red';
    inputInfoText[index].innerHTML = '빈칸을 채워주세요';
  };
  offFocusInfut = (inputChange, index) => {
    const inputInfoText = document.querySelectorAll('.inputInfoText');
    inputChange.style.borderColor = '';
    inputInfoText[index].innerHTML = '';
  };

  onChangeInput = (e) => {
    const priceChange = this.managerForm.querySelector('#priceChange');
    const stockChange = this.managerForm.querySelector('#stockChange');

    if (stockChange.value === '') {
      this.onFocusInfut(stockChange,stockChange.dataset.inputIndex);
    } else {
      this.offFocusInfut(stockChange,stockChange.dataset.inputIndex);
    }
    if(priceChange.value === '') {
      this.onFocusInfut(priceChange,priceChange.dataset.inputIndex);
    } else {
      this.offFocusInfut(priceChange,priceChange.dataset.inputIndex);
    }
  }


  //구매 삭제버튼 전환
  onClickDeleteMyItemBtn = () => {
    const itemCheckBoxse = document.querySelectorAll('.itemCheckBox');
    itemCheckBoxse.forEach((itemCheckBox) => {
      if (itemCheckBox.style.display = 'none') {
        itemCheckBox.style.display = 'block';
      }
    });
    document.querySelector('.myItemDelete-01').style.display = 'none';
    document.querySelector('.myItemDelete-02').style.display = 'block';
  };


  // 모달 (쇼, 클로즈 따로 만들어도 됨)
  onClickModalBtn(btn, Modal) {
    btn.addEventListener('click', (e) => {
      console.log(e.currentTarget)
      if (Modal.open) {
        Modal.close();
      } else {
        Modal.show();
      }
    });
  }
}
