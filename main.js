"use strict";

const coinEnt = document.querySelector('.coinEnt');
const coinPop = document.querySelector('.coinPop');
const wallet = document.querySelector('.wallet');
const walletOpen = document.querySelector('.walletOpen');
const inventory = document.querySelector('.inventory');
const itemList = document.querySelector('#itemList');

// 모달 버튼
let $button = null;
let $popUp = null;
const PopClick = ($button,$popUp) => {
    $button.addEventListener('click', () => {
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

// 코인