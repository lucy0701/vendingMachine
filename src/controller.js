export default class Controller {
    constructor(model, view, servic) {
        this.view = view;
        this.model = model;
        this.servic = servic;
        this.controller = this;
    }
    
    init(){

    }
    // 동전 투입 (유저코인 -, 토탈화면 +)
    // 구매 활성 (구매 가능 상품)
    // 구매 처리 (토탈 - , 아이템 출력, 아이템 재고 -, 아이템 리스트에 추가 )
    // 환불 처리 (토탈금액 계산, 토탈 초기화, 자판기 금액 - )
    // 관리자 (재고 채우기, 가격 조절)
}