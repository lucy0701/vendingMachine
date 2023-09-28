"use strict";

import { Model } from "./src/model.js";
import { View } from "./src/view.js";
import { Controller} from "./src/controller.js";

const model = new Model;
const view = new View;
const controller = new Controller (model, view);


// // 코인 넣기
// const coinbBtnsClick = (coinBtns,balances) => {
//     let coinSum = 0;
//     let balanceArray = Array.from(balances).map((balance) => parseInt(balance.innerHTML));
//     for (let i = 0; i < coinBtns.length; i++){
//         coinBtns[i].addEventListener('click', () => {
//             if (balanceArray[i] > 0) {
//                 coinSum += parseInt(coinBtns[i].value);
//                 balanceArray[i] -= 1;
//             }
//             return total.innerHTML = `${coinSum}`,
//                    balances[i].innerHTML = `${balanceArray[i]}`;
//         });
//     }
// };
// coinbBtnsClick(coinBtns,balances);

