"use strict";
// 모달
const coinEnt = document.querySelector('.coinEnt');
const coinPop = document.querySelector('.coinPop');
const wallet = document.querySelector('.wallet');
const walletOpen = document.querySelector('.walletOpen');
const inventory = document.querySelector('.inventory');
const itemList = document.querySelector('#itemList');
// 코인
const coinBtns = document.querySelectorAll('.coinBtn');
const total = document.querySelector('.total');
const balances = document.querySelectorAll('.balance');

// 모달 버튼
let $popBtn = null;
let $popUp = null;
const PopClick = ($popBtn,$popUp) => {
    $popBtn.addEventListener('click', () => {
        if ($popUp.style.visibility === 'visible'){
            $popUp.style.visibility = 'hidden';
        } else {
            $popUp.style.visibility = 'visible';
        } 
    });
};
PopClick(coinEnt, coinPop);
PopClick(wallet, walletOpen);
PopClick(inventory, itemList);

// 코인 넣기
const coinbBtnsClick = (coinBtns,balances) => {
    let coinSum = 0;
    let balanceArray = Array.from(balances).map((balance) => parseInt(balance.innerHTML));
    for (let i = 0; i < coinBtns.length; i++){
        coinBtns[i].addEventListener('click', () => {
            if (balanceArray[i] > 0) {
                coinSum += parseInt(coinBtns[i].value);
                balanceArray[i] -= 1;
            }
            return total.innerHTML = `${coinSum}`,
                   balances[i].innerHTML = `${balanceArray[i]}`;
        });
    }
};
coinbBtnsClick(coinBtns,balances);