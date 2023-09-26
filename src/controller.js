export class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.init();
    }

    init(){
        const total = this.model.getTotalAmount();
    }

}