export class DeliveryCard {
    constructor (maxAmount, lineID, {ID, image, amount}, templateSelector) {
        this._template = document.querySelector(templateSelector);
        this._imageURL = image;
        this.ID=ID;
        this.lineID = lineID;
        this.maxAmount = maxAmount;
        this.amount = maxAmount>amount ? amount : maxAmount;
        this.isHidden = false;
        this.randomSelector = 'a' + Math.floor(Math.random()*100000);
    }

    setMaxAmount () {
        this.amount = this.maxAmount;
        this._element.querySelector('.delivery-card__amount').textContent = this.amount;
    }
    setMinAmount () {
        this.amount = 0;
        this._element.querySelector('.delivery-card__amount').textContent = this.amount;
    }
    setCurrentAmount (current) {
        this.amount = current;
        this._element.querySelector('.delivery-card__amount').textContent = current;
    }
    handleHideCard () {
        this._element.style.display = "none";
        this.isHidden = true;
    }
    handleShowCard () {
        this._element.style.display = "block";
        this.isHidden = false;
    }

    generateCard () {
        this._element = this._template.content.querySelector('.delivery-card__image').cloneNode(true);
        this._element.classList.add(this.randomSelector)
        this._element.style.backgroundImage = `url(${this._imageURL})`;
        this._element.querySelector('.delivery-card__amount').textContent = this.amount;
        return this._element;
    }
}