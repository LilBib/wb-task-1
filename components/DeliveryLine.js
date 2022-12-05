export class DeliveryLine {
    constructor (date, ID, templateSelector, cardsContainerSelector) {
        this.date = date;
        this._id = ID
        this._cardsContainerSelector = cardsContainerSelector;
        this._template = document.querySelector(templateSelector);
    }
    handleHideLine () {
        this._line.style.display = "none";
    }
    handleShowLine () {
        this._line.style.display = "flex";
        if (document.querySelector('.page').clientWidth<850) {
            this._line.style.display = "block";
        }
    }
    addItem(renderedItem) {
        this._cardsContainer.append(renderedItem);
    }
    createLine () {
        this._line = this._template.content.querySelector('.delivery-line').cloneNode(true);
        this._line.classList.add(`delivery-line-${this._id}`);
        this._cardsContainer = this._line.querySelector(this._cardsContainerSelector);
        this._line.querySelector('.delivery-line__header').textContent = this.date;
        return this._line;
    }
} 