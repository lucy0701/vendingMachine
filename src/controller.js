export default class Controller {
  constructor(model, view) {
    this.m = model;
    this.v = view;

    this.init();
    this.initEventHandlers();
  }

  init() {
    const totalAmount = this.m.getTotalAmount();
    const userCoins = this.m.getUserCoinCount();
    const machineCoins = this.m.getMachineCoinCount();
    const items = this.m.getItems();
    const myItemList = this.m.getMyItemList();

    this.v.initItems(items);
    this.v.initCoins(userCoins, machineCoins);
    this.v.updateTotalScreen(totalAmount);
    this.v.registerBuyBtn(totalAmount, items);
    this.v.updateMyItemList(myItemList);
    this.v.onClickModalPop(this.v.popUpBtns);
  }

  initEventHandlers() {
    this.registerButtonsEvent(this.v.coinBtns, this.onClickCoinBtns);
    this.registerButtonsEvent(this.v.buyBtns, this.onClickPurchase);
    this.registerButtonEvent(this.v.dropItem, this.onClickMyItem);
    this.registerButtonEvent(this.v.returnCoin, this.onClickReturnCoins);
    this.registerButtonsEvent(this.v.myItemList, this.onClickDeleteMyItem);

    this.registerChangeEvent();
    this.registerSubmitEvent();
  }

  registerButtonsEvent(buttons, onClick) {
    buttons.forEach((btn, i) => {
      btn.addEventListener('click', () => onClick(i));
    });
  }
  registerButtonEvent(button, onClick) {
    button.addEventListener('click', onClick);
  }

  onClickCoinBtns = (index) => {
    let totalAmount = this.m.getTotalAmount();
    let userCoins = this.m.getUserCoinCount();
    let machineCoins = this.m.getMachineCoinCount();
    const items = this.m.getItems();
    const coinName = Object.keys(userCoins)[index];
    const coin = parseInt(coinName);
    const userCoinCount = userCoins[coinName];

    if (userCoinCount > 0 && totalAmount < 10000) {
      totalAmount = this.m.addTotalAmount(coin);
      machineCoins = this.m.addMachineCoins(coinName);
      userCoins = this.m.removeUserCoins(coinName);
    } else if (totalAmount >= 10000) {
      alert('최대 금액을 넘었습니다!');
    }
    this.v.updateTotalScreen(totalAmount);
    this.v.updateCoins(userCoins, machineCoins);
    this.v.registerBuyBtn(totalAmount, items);
  };

  onClickPurchase = (index) => {
    let totalAmount = this.m.getTotalAmount();
    let items = this.m.getItems();
    const item = items[index];

    if (totalAmount >= item.price && 0 < item.stock) {
      totalAmount = this.m.removeTotalAmount(item.price);
      items = this.m.removeStock(index);

      this.m.addMyItem(index);
      this.v.showDropItemDisplay(item);
    } else if (item.stock === 0) {
      alert('늦었어..사랑은 타이밍이야');
    } else if (totalAmount < item.price) {
      alert('이 사람을 가지기엔 넌 부족해');
    }
    this.v.updateTotalScreen(totalAmount);
    this.v.updateItems(items);
    this.v.registerBuyBtn(totalAmount, items);
  };

  onClickMyItem = () => {
    const myItemList = this.m.getMyItemList();

    this.v.hideDropItemDisplay();
    this.v.updateMyItemList(myItemList);
    this.registerButtonsEvent(this.v.myItemList, this.onClickDeleteMyItem);
  };

  onClickDeleteMyItem = (index) => {
    const deleteChcek = confirm('헤어질꺼양? 환불 안해줄껀데도?');
    if (deleteChcek) {
      this.v.removeMyItem(index);
      this.m.deleteMyItem(index);
    }
  };

  // 환불 처리
  onClickReturnCoins = () => {
    let totalAmount = this.m.getTotalAmount();
    let userCoins = this.m.getUserCoinCount();
    let machineCoins = this.m.getUserCoinCount();
    const userCoinKey = Object.keys(userCoins);

    userCoinKey.reverse().forEach((coin, count) => {
      count = parseInt(totalAmount / coin);
      machineCoins = this.m.removeMachineCoins(coin, count);
      userCoins = this.m.addUserCoins(coin, count);
      totalAmount = this.m.removeTotalAmount(parseInt(count * coin));

      this.v.updateTotalScreen(totalAmount);
      this.v.updateCoins(userCoins, machineCoins);
    });
  };

  inputManagerPageValue = () => {
    const items = this.m.getItems();
    const selectValue =
      this.v.itemNum.options[this.v.itemNum.selectedIndex].value;
    items.forEach((item, i) => {
      if (selectValue === item.itemName) {
        if (
          this.v.priceChange.value === '' &&
          this.v.stockChange.value === ''
        ) {
          this.v.priceChange.value = item.price;
          this.v.stockChange.value = item.stock;
        }
        this.m.updatePrices(i, this.v.priceChange.value);
        this.m.addStock(i, this.v.stockChange.value);
      }
    });
  };

  registerChangeEvent() {
    this.v.itemNum.addEventListener('change', () => {
      this.v.priceChange.disabled = false;
      this.v.stockChange.disabled = false;
      this.inputManagerPageValue();
    });
  }
  registerSubmitEvent() {
    this.v.managerPage.addEventListener('submit', (e) => {
      e.preventDefault();

      if (this.v.priceChange.value !== '' && this.v.stockChange.value !== '') {
        this.inputManagerPageValue();
        this.v.updateItems(this.m.getItems());
        this.v.initManagerPage();
        alert('저장 완료');
      } else {
        alert('빈칸은 안대용');
      }
    });
  }
}
