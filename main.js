"use strict";

import { Model } from "./src/model.js";
import { View } from "./src/view.js";
import { Controller} from "./src/controller.js";

const model = new Model;
const view = new View;
const controller = new Controller (model, view);

// 자판기 구현
// 1. 동전을 넣어 토탈금액을 채움 (토탈금액은 올라가고, 코인은 줄어야함)
// 2. 토탈금액이하로 구매가 가능 (구매가능 항목 표시)
// 3. 구매시, 구매 아이템 재고와 토탈금액이 깍힘. 잔액이있을경우, 2번
// 4. 추가로 동전을 넣을 수 있다.
// 5. 환불 요청시, 토탈금액에서 동전으로 환산 (큰 코인부터 작은 코인까지 계산필요)
// 6. 환산된 금액은 코인의 갯수에 다시 + 되어 보임
// 7. 자판기 내부 코인

// Model (금액 저장)
// 1. 토탈 : Controller에서 계산된 값 저장 (기본값은 0)
// 2. 코인 : 총 갯수
// 3. 자판기 내 코인 : 자판기 안 기본 코인
// 3-1. 아이템 재고 : 아이템의 총 재고
// 3-2. 자판기 메뉴 금액
// ** 2차배열..? 벨루...? 연결해서 한번에..?구분하기 편하게 하려면...
// 아이템 가격을 수정하기 편하려면..?

// View (사용자에게 보일 화면)
// 1. 토탈 : 금액 표시
// 2. 코인 : 잔액동전 갯수 보이기 
// 3. 구매 버튼 : 불들어오기
// 4. 아이템 재고 : 구매시 줄어든 재고 반환 / 재고없음 표시
// 5. 환불 : 클릭시 코인 반환
// 6. 모달 팝업 : 동전 투입, 구매 아이템
  
// Controller (금액관리와, 사용자에게 보이는 화면 컨트롤)
// 1. 토탈 : 코인넣기/구매/환불(코인(+),구매(-),환불(0))
// 2. 코인 : 갯수 조절 (사용(-),환액(+)) Modle 저장 및 View 전송
// 3. 구매 버튼 : 토탈 금액에 맞춰 구매 버튼에 불들어오도록 명령
// 4. 아이템 재고 : 구매시 아이템 재고 -1, 0일경우 구매 불가(재고없음 표시)
// 5. 환불 : 환불시 토탈은 0이되고, 코인으로 반환
// 6. 자판기 내부 코인 : 코인이 들어갈경우 + 코인, 잔액 나갈경우 -코인, 큰동전이 없다면 작은 코인으로 대체



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

