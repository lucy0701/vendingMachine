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
    this.v.updateBuyBtn(totalAmount, items);
    this.v.updateMyItemList(myItemList);

    this.v.onClickModalBtn(this.v.walletBtn,this.v.walletModal);
    this.v.onClickModalBtn(this.v.inventoryBtn,this.v.inventoryModal);
    this.v.onClickManagerPageBtn();
  }

  initEventHandlers() {
    this.v.topBody.addEventListener('click', this.onClickPurchase);
    this.v.wallet.addEventListener('click', this.onClickCoinBtns);
    this.v.inventory.addEventListener('click', this.onClickDeleteMyItem);

    this.v.returnCoin.addEventListener('click',this.onClickReturnCoins)
    this.v.dropItem.addEventListener('click', this.onClickMyItem);

    this.v.itemNum.addEventListener('change', this.initManagerPageValue);
    this.v.managerPage.addEventListener('submit', this.updateManagerPageValue);
  }

  onClickCoinBtns = (e) => {
    let index = e.target.dataset.index;

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
    this.v.updateBuyBtn(totalAmount, items);
  };

  onClickPurchase = (e) => {
    let index = e.target.dataset.index;
    let totalAmount = this.m.getTotalAmount();
    let items = this.m.getItems();
    
    if(index !== undefined) {
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
    }

    this.v.updateTotalScreen(totalAmount);
    this.v.updateItems(items);
    this.v.updateBuyBtn(totalAmount, items);
  };

  onClickMyItem = () => {
    const myItemList = this.m.getMyItemList();
    this.v.hideDropItemDisplay();
    this.v.updateMyItemList(myItemList);
  };

  onClickDeleteMyItem = (e) => {
    const index = e.target.dataset.index;

    if(index !== undefined) {
      const deleteChcek = confirm('헤어질꺼양? 환불 안해줄껀데도?');
      if (deleteChcek) {
        this.v.removeMyItem(index);
      }
    }

  };

  // 환불 처리
  onClickReturnCoins = () => {
    let totalAmount = this.m.getTotalAmount();
    let userCoins = this.m.getUserCoinCount();
    let machineCoins = this.m.getUserCoinCount();

    Object.keys(userCoins).reverse().forEach((coin, count) => {
      count = parseInt(totalAmount / coin);
      machineCoins = this.m.removeMachineCoins(coin, count);
      userCoins = this.m.addUserCoins(coin, count);
      totalAmount = this.m.removeTotalAmount(parseInt(count * coin));

      this.v.updateTotalScreen(totalAmount);
      this.v.updateCoins(userCoins, machineCoins);
    });
  };

  onChangeManagerPage = (e) => {
    const index = e.target.value;
    const items = this.m.getItems();
    
    this.v.priceChange.disabled = false;
    this.v.stockChange.disabled = false;

    this.v.priceChange.value = items[index].price;
    this.v.stockChange.value = items[index].stock;
  };  

  updateManagerPage = (e) => {
    e.preventDefault();
    const index = this.v.itemNum.options[this.v.itemNum.selectedIndex].value;

    if (this.v.priceChange.value !== '' && this.v.stockChange.value !== '') {
      this.m.updatePrices(index, parseInt(this.v.priceChange.value));
      this.m.addStock(index, parseInt(this.v.stockChange.value));        
      this.v.updateItems(this.m.getItems());
      this.v.initManagerPageValue();
      alert('저장 완료');
    } else {
      alert('빈칸은 안대용');
    }
  }
}
