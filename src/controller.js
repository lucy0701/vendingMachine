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
    this.v.updateMyItemList(myItemList);
    this.v.updateBuyBtn(totalAmount, items);
  }

  initEventHandlers() {
    this.v.topBody.addEventListener('click', this.onClickPurchase);
    this.v.wallet.addEventListener('click', this.onClickCoinBtns);
    document
      .querySelector('.returnCoin')
      .addEventListener('click', this.onClickReturnCoins);
    this.v.dropItem.addEventListener('click', this.onClickGetMyItem);

    this.v.selectItem.addEventListener('change', this.onChangeItemSelector);

    // TODO
    // on + Eventname + itemSelector
    // onChangeItemSelector
    this.v.managerForm.addEventListener('submit', this.onSubmitManagerForm);

    document
      .querySelector('.myItemDelete-02')
      .addEventListener('click', this.onCheckMyItemDelete);
  }

  onClickCoinBtns = (e) => {
    const index = e.target.dataset.userIndex;
    const totalAmount = this.m.getTotalAmount();
    const userCoins = this.m.getUserCoinCount();
    const coin = Object.keys(userCoins)[index];

    // TODO
    // if (Number(coin) + totalAmount < 10000)

    if (userCoins[coin] > 0 && Number(coin) + totalAmount <= 10000) {
      this.v.updateCoins(
        this.m.removeUserCoins(coin),
        this.m.getMachineCoinCount(),
      );
      this.m.addInsultCoins(coin);
      this.v.updateTotalScreen(this.m.addTotalAmount(Number(coin)));
      this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
    } else if (totalAmount >= 10000) {
      // TODO
      this.v.updateTotalScreen('최대 금액 초과');
      setTimeout(() => {
        this.v.updateTotalScreen(this.m.getTotalAmount());
      }, 1000);
    }
  };

  onClickPurchase = (e) => {
    const index = e.target.dataset.itemIndex;
    const totalAmount = this.m.getTotalAmount();
    const item = this.m.getItems()[index];

    if (index !== undefined) {
      if (totalAmount >= item.price && 0 < item.stock) {
        this.m.setIsPurchased(true);
        this.m.addMyItem(index);
        this.v.updateTotalScreen(this.m.removeTotalAmount(item.price));
        this.v.updateItems(this.m.removeStock(index), index);
        this.v.showDropItemDisplay(item);
      }
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
  };

  onClickGetMyItem = () => {
    this.v.hideDropItemDisplay();
    this.v.updateMyItemList(this.m.getMyItemList());
  };

  onCheckMyItemDelete = () => {
    const itemCheckBoxse = document.querySelectorAll('.itemCheckBox');
    const indexesToDelete = [];

    itemCheckBoxse.forEach((itemCheckBox, index) => {
      if (itemCheckBox.checked) {
        indexesToDelete.push(index);
      }
      itemCheckBox.style.display = 'none';
    });

    indexesToDelete.reverse().forEach((indexToDelete) => {
      this.v.removeMyItem(indexToDelete);
      this.m.deleteMyItem(indexToDelete);
    });

    document.querySelector('.myItemDelete-01').style.display = 'block';
    document.querySelector('.myItemDelete-02').style.display = 'none';
  };

  onClickReturnCoins = () => {
    const userCoins = this.m.getUserCoinCount();
    const machineCoins = this.m.getMachineCoinCount();
    const insultCoins = this.m.getInsultCoins();
    const coins = Object.keys(userCoins);
    let totalAmount = this.m.getTotalAmount();
    let count = 0;

    if (this.m.getIsPurchased() === true) {
      let insultCoinCount = 0;

      [...coins].reverse().forEach((coin) => {
        count = parseInt(totalAmount / coin, 10);
        if (machineCoins[coin] >= 0 && machineCoins[coin] >= count) {
          insultCoinCount = insultCoins[coin];
          insultCoins[coin] -= insultCoinCount;
          userCoins[coin] += count;
          machineCoins[coin] += insultCoinCount - count;
          count *= coin;
          totalAmount -= count;
        }
      });
      this.m.setIsPurchased(false);
    } else {
      [...coins].reverse().forEach((coin) => {
        if (insultCoins[coin] !== 0) {
          count = parseInt(totalAmount / coin, 10);
          userCoins[coin] += count;
          insultCoins[coin] -= count;
          count *= coin;
          totalAmount -= count;
        }
      });
    }

    this.m.setTotalAmount(totalAmount);
    this.m.setUserCoins(userCoins);
    this.m.setMachinCoins(machineCoins);
    this.m.setInsultCoins(insultCoins);
    this.v.updateCoins(userCoins, machineCoins);
    this.v.updateTotalScreen(totalAmount);
    this.v.updateBuyBtn(totalAmount, this.m.getItems());
  };

  onChangeItemSelector = () => {
    const index = this.v.selectItem.selectedIndex - 1;
    const item = this.m.getItems()[index];

    const stockChange = this.v.managerForm.querySelector('#stockChange');
    const priceChange = this.v.managerForm.querySelector('#priceChange');
    const formSubmitBtn = this.v.managerForm.querySelector('#formSubmitBtn');

    formSubmitBtn.disabled = false;
    priceChange.disabled = false;
    stockChange.disabled = false;

    stockChange.value = item.stock;
    priceChange.value = item.price;
  };

  onSubmitManagerForm = (e) => {
    e.preventDefault();
    const index = this.v.selectItem.selectedIndex - 1;
    const priceChange = this.v.managerForm.querySelector('#priceChange');
    const stockChange = this.v.managerForm.querySelector('#stockChange');
    const formSubmitBtn = this.v.managerForm.querySelector('#formSubmitBtn');

    if (stockChange.value !== '' && priceChange.value !== '') {
      this.m.updatePrices(index, Number(priceChange.value));
      this.m.addStock(index, Number(stockChange.value));
      this.v.updateItems(this.m.getItems(), index);
      this.v.initManagerinputValue(priceChange, stockChange, formSubmitBtn);
      this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
    }
  };
}
