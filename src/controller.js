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

    this.v.onClickModalBtn(this.v.walletBtn, this.v.walletModal);
    this.v.onClickModalBtn(this.v.inventoryBtn, this.v.inventoryModal);
    this.v.onClickModalBtn(this.v.managerBtn, this.v.managerPageModal);
  }

  initEventHandlers() {
    this.v.topBody.addEventListener('click', this.onClickPurchase);
    this.v.wallet.addEventListener('click', this.onClickCoinBtns);
    this.v.inventory.addEventListener('click', this.onClickDeleteMyItem);
    this.v.returnCoin.addEventListener('click', this.onClickReturnCoins);
    this.v.dropItem.addEventListener('click', this.onClickMyItem);

    this.v.itemNum.addEventListener('change', this.onChangeManagerPage);
    this.v.managerPage.addEventListener('submit', this.updateManagerPage);
  }

  onClickCoinBtns = (e) => {
    const index = e.target.dataset.index;
    const totalAmount = this.m.getTotalAmount();
    const userCoins = this.m.getUserCoinCount();
    const coin = Object.keys(userCoins)[index];

    if (userCoins[coin] > 0 && totalAmount < 10000) {
      this.v.updateCoins(
        this.m.removeUserCoins(coin),
        this.m.addMachineCoins(coin),
      );
      this.v.updateTotalScreen(this.m.addTotalAmount(parseInt(coin)));
    } else if (totalAmount >= 10000) {
      alert('최대 금액을 넘었습니다!');
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(),this.m.getItems());
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
    this.v.updateBuyBtn(this.m.getTotalAmount(),this.m.getItems());
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

  // 환불 처리
  // onClickReturnCoins = () => {

  //   Object.keys(this.m.getUserCoinCount())
  //     .reverse()
  //     .forEach((coin, count) => {
  //       count = parseInt(this.m.getTotalAmount()/coin);
  //       this.v.updateCoins(
  //         this.m.addUserCoins(coin, count),
  //         this.m.removeMachineCoins(coin, count)
  //       );
  //       count *= coin;
  //       this.v.updateTotalScreen(this.m.removeTotalAmount(count));
  //     });
  // };

  onClickReturnCoins = () => {
    let count = 0;
    Object.keys(this.m.getUserCoinCount())
      .reverse()
      .forEach((coin,i) => {
        count = parseInt(this.m.getTotalAmount() / coin);
        this.m.addUserCoins(coin, count);
        this.m.removeMachineCoins(coin, count);
        count *= coin;
        this.m.removeTotalAmount(count);
      });
    this.v.updateCoins(this.m.getUserCoinCount(), this.m.getMachineCoinCount());
    this.v.updateTotalScreen(this.m.getTotalAmount());
    this.v.updateBuyBtn(this.m.getTotalAmount(),this.m.getItems());
  };

  onChangeManagerPage = (e) => {
    const index = e.target.value;
    const item = this.m.getItems()[index];

    this.v.priceChange.disabled = false;
    this.v.stockChange.disabled = false;

    this.v.priceChange.value = item.price;
    this.v.stockChange.value = item.stock;
  };

  updateManagerPage = (e) => {
    e.preventDefault();
    const index = this.v.itemNum.options[this.v.itemNum.selectedIndex].value;

    if (this.v.priceChange.value !== '' && this.v.stockChange.value !== '') {
      this.m.updatePrices(index, parseInt(this.v.priceChange.value));
      this.m.addStock(index, parseInt(this.v.stockChange.value));
      this.v.updateItems(this.m.getItems(), index);
      this.v.initManagerPageValue();
      
      alert('저장 완료');
    } else {
      alert('빈칸은 안대용');
    }
    this.v.updateBuyBtn(this.m.getTotalAmount(),this.m.getItems());
  };
}
