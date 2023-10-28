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

    this.v.onClickModalBtn(
      document.querySelector('#walletBtn'),
      document.querySelector('#walletModal'),
    );
    this.v.onClickModalBtn(
      document.querySelector('#inventoryBtn'),
      document.querySelector('#inventoryModal'),
    );
    this.v.onClickModalBtn(
      document.querySelector('#managerBtn'),
      document.querySelector('#managerPageModal'),
    );
  }

  initEventHandlers() {
    this.v.topBody.addEventListener('click', this.onClickPurchase);
    this.v.wallet.addEventListener('click', this.onClickCoinBtns);
    this.v.inventory.addEventListener('click', this.onClickDeleteMyItem);
    document
      .querySelector('.returnCoin')
      .addEventListener('click', this.onClickReturnCoins);
    this.v.dropItem.addEventListener('click', this.onClickMyItem);

    this.v.itemNum.addEventListener('change', this.onChangeManagerPage);
    this.v.managerPage.addEventListener('submit', this.managerPageForm);
  }

  onClickCoinBtns = (e) => {
    const index = e.target.dataset.index;
    const totalAmount = this.m.getTotalAmount();
    const userCoins = this.m.getUserCoinCount();
    const coin = Object.keys(userCoins)[index];

    if (userCoins[coin] > 0 && totalAmount < 10000) {
      this.v.updateCoins(
        this.m.removeUserCoins(coin),
        this.m.getMachineCoinCount(),
      );
      this.m.addSpareCoins(coin);
      this.v.updateTotalScreen(this.m.addTotalAmount(parseInt(coin)));
    } else if (totalAmount >= 10000) {
      alert('최대 금액을 넘었습니다!');
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
  };

  onClickPurchase = (e) => {
    const index = e.target.dataset.index;
    const totalAmount = this.m.getTotalAmount();
    const item = this.m.getItems()[index];

    if (index !== undefined) {
      if (totalAmount >= item.price && 0 < item.stock) {
        this.m.addMyItem(index);
        this.v.updateTotalScreen(this.m.removeTotalAmount(item.price));
        this.v.updateItems(this.m.removeStock(index), index);
        this.v.showDropItemDisplay(item);
      } else if (item.stock === 0) {
        alert('늦었어..사랑은 타이밍이야');
      } else if (totalAmount < item.price) {
        alert('이 사람을 가지기엔 넌 부족해');
      }
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
  };

  onClickMyItem = () => {
    this.v.hideDropItemDisplay();
    this.v.updateMyItemList(this.m.getMyItemList());
  };

  onClickDeleteMyItem = (e) => {
    const index = e.target.dataset.index;

    if (index !== undefined) {
      const deleteChcek = confirm('헤어질꺼양? 환불 안해줄껀데도?');
      if (deleteChcek) {
        this.v.removeMyItem(index);
      }
    }
  };

  onClickReturnCoins = () => {
    const userCoins = this.m.getUserCoinCount();
    const machineCoins = this.m.getMachineCoinCount();
    const spareCoins = this.m.getSpareCoins();
    const coins = Object.keys(userCoins);
    let totalAmount =this.m.getTotalAmount();
    let count = 0;

    const returnCoincalculate = (insertCoin) => {
      for(let i = coins.length-1; i >= 0; i--) {
        if (insertCoin[coins[i]] === 0 ){
          continue;
        }
        count = parseInt(totalAmount / coins[i]);
        userCoins[coins[i]] += count;
        insertCoin[coins[i]] -= count;
        count *= coins[i];
        totalAmount -= count;
      }
    }

    returnCoincalculate(spareCoins);

    if(totalAmount > 0) {
      returnCoincalculate(machineCoins);
    }

    coins.forEach(coin => {
      count = spareCoins[coin];
      spareCoins[coin] -= count;
      machineCoins[coin] += count;
    })

    this.m.setTotalAmount(totalAmount);
    this.m.setUserCoins(userCoins);
    this.m.setMachinCoins(machineCoins);
    this.m.setSpareCoins(spareCoins);
    this.v.updateCoins(userCoins, machineCoins);
    this.v.updateTotalScreen(totalAmount);
    this.v.updateBuyBtn(totalAmount, this.m.getItems());
  };


  onChangeManagerPage = () => {

    const index = this.v.itemNum.selectedIndex - 1;
    const item = this.m.getItems()[index];

    const stockChange = this.v.managerPage.querySelector('#stockChange');
    const priceChange = this.v.managerPage.querySelector('#priceChange');

    priceChange.disabled = false;
    stockChange.disabled = false;

    stockChange.value = item.stock;
    priceChange.value = item.price;
  };

  managerPageForm = (e) => {
    e.preventDefault();
    const index = this.v.itemNum.selectedIndex - 1;
    const priceChange = this.v.managerPage.querySelector('#priceChange');
    const stockChange = this.v.managerPage.querySelector('#stockChange');

    if (stockChange !== '' && priceChange !== '') {
      this.m.updatePrices(index, parseInt(priceChange.value));
      this.m.addStock(index, parseInt(stockChange.value));
      this.v.updateItems(this.m.getItems(), index);
      this.v.initManagerPageValue(priceChange, stockChange);

      alert('저장 완료');
    } else {
      alert('빈칸은 안대용');
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(), this.m.getItems());
  };
  
}
