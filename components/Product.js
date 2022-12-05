export class Product {
    constructor (
        product, 
        templateSelector, 
        {
            changeSummaryOnGeneration, 
            onIncreaseSummary, 
            onDecreaseSummary, 
            onProductCkeckboxClick,
            onDeleteProduct,
            handleCheckProductAmount,
        }
    ) {
        this._productID = product.ID;
        this._templateSelector = templateSelector;
        this._isChecked = product.isChecked;
        this._image = product.image;
        this._name=product.name;
        this._parameters = product.parameters;
        this._warehouse = product.warehouse;
        this._producerName = product.producer.name;
        this._producerRegNumber = product.producer.regNumber;
        this._producerAdress = product.producer.adress;
        this._amount = product.amount;
        this._leftAmount = product.left;
        this._price = product.price;
        this._discount = product.discount;
        this._userDiscount = product.userDiscount;
        this._summary = this._amount * this._price * (1- this._discount - this._userDiscount);
        this._summaryDiscount = this._amount * this._price * (this._discount + this._userDiscount);
        this._changeSummaryOnGeneration = changeSummaryOnGeneration;
        this._onIncreaseSummary = onIncreaseSummary;
        this._onDecreaseSummary = onDecreaseSummary;
        this._onProductCkeckboxClick = onProductCkeckboxClick;
        this._handleDeleteSummary = onDeleteProduct;
        this._handleCheckProductAmount = handleCheckProductAmount;
        this._handleCheckProductAmountBinded =this._handleCheckProductAmount.bind(this)
    }
    _getTemplate() {
        const productElement = document.querySelector(this._templateSelector).content.querySelector('.product').cloneNode(true);
        return productElement;
    }
    _hangleSumChange() {
        this._summary = this._amount * this._price * (1 - this._discount - this._userDiscount);
        this.element.querySelector('.sum__price').textContent = (Math.round(this._summary)).toString() +  ' сом';
    }
    _hangleDiscountChange() {
        this._summaryDiscount = this._amount * this._price * (this._discount + this._userDiscount);
        this.element.querySelector('.discount-info__amount_type_service-discount').textContent = '- ' + Math.round(this._discount*this._amount*this._price*100)/100 + ' сом';
        this.element.querySelector('.sum__discount').textContent = (Math.round(this._summaryDiscount + this._summary)).toString() + ' сом';
        this.element.querySelector('.discount-info__amount_type_user-discount').textContent = '- ' + Math.round(this._userDiscount*this._amount*this._price) + ' сом';
    }
    _handleCheckboxClick () {
        const priceWithoutDiscount = this._price * this._amount;
        this._onProductCkeckboxClick(this._checkbox.classList.contains('main__checkbox_active'), Math.round(this._summary), Math.floor(priceWithoutDiscount));
        this._checkbox.classList.toggle('main__checkbox_active');
        this._isChecked = this._checkbox.classList.contains('main__checkbox_active');
        if (!document.querySelector('.cart__overall-checkbox').classList.contains('cart__overall-checkbox_active')) {
            document.querySelector('.cart__overall-checkbox').classList.add('main__checkbox_active');
        }
        // this._handleCheckProductAmountBinded();
    }
    _isDecrementActive () {
        return this._amount === 1 ? false : true;
    }
    _handleDecrementClick () {
        if (this._isDecrementActive()) {
            this._amount-=1;
            this.element.querySelector('.product__amount-counter').textContent =this._amount.toString();
        };
        if (!this._isDecrementActive()) {
            this._decrement.classList.add('product__amount-decrement_disabled')
        };
        this._hangleSumChange();
        this._hangleDiscountChange();
        const priceWithDiscount = this._price * (1 - this._discount - this._userDiscount)
        this._onDecreaseSummary(this._checkbox.classList.contains('main__checkbox_active'), priceWithDiscount, this._price, this._productID, this._amount,this._leftAmount);
        this._checkLeftAmountElementActivity();
        if (!document.querySelector('.cart__overall-checkbox').classList.contains('main__checkbox_active')) {
            this._handleCheckboxClick();
            this._handleCheckProductAmountBinded();
        }
        if (!this._checkbox.classList.contains('main__checkbox_active')) {
            this._handleCheckboxClick();
            this._handleCheckProductAmountBinded();
        }
    }
    _handleIncrementClick () {
        this._amount+=1;
        if (this._isDecrementActive()) {
            this._decrement.classList.remove('product__amount-decrement_disabled')
        };
        this.element.querySelector('.product__amount-counter').textContent = this._amount.toString();
        if (this._increment.classList.contains('product__amount-decrement_disabled')) {
            this._increment.classList.remove('product__amount-decrement_disabled')
        }
        this._hangleSumChange();
        this._hangleDiscountChange();
        const priceWithDiscount = this._price * (1 - this._discount - this._userDiscount)
        this._onIncreaseSummary(this._checkbox.classList.contains('main__checkbox_active'), priceWithDiscount, this._price);
        this._checkLeftAmountElementActivity();
        if (!document.querySelector('.cart__overall-checkbox').classList.contains('main__checkbox_active') && !this._checkbox.classList.contains('main__checkbox-active')) {
            this._handleCheckboxClick();
            this._handleCheckProductAmountBinded();
        }
        if (!this._checkbox.classList.contains('main__checkbox_active')) {
            this._handleCheckboxClick();
            this._handleCheckProductAmountBinded();
        }
    }
    _handleLikeClick () {
        this._likeButton.classList.toggle('product__like-button_active')
    }
    _checkLeftAmountElementActivity () {
        if (this._amount>this._leftAmount) {
            this._leftAmountElement.textContent = 'Осталось: ' +  this._leftAmount.toString() + 'шт.';
            if (this._leftAmountElement.classList.contains('product__amount-left_disabled')) {
                this._leftAmountElement.classList.remove('product__amount-left_disabled')
            }
        } else if (!this._leftAmountElement.classList.contains('product__amount-left_disabled')) {
            this._leftAmountElement.classList.add('product__amount-left_disabled');
        }
    }
    _handleDeleteButtonClick () {
        const productSummaryWithoutDiscount = this._price * this._amount;
        if (this._checkbox.classList.contains('main__checkbox_active')) {
            this._handleDeleteSummary(Math.round(this._summary), productSummaryWithoutDiscount, this._productID);
        }
        document.getElementById(`${this._productID}`).remove();
        this._handleCheckProductAmountBinded();
    }
    _setEventListeners () {
        this._increment.addEventListener('click', this._handleIncrementClick.bind(this));
        this._increment.addEventListener('click', this._handleCheckProductAmountBinded);
        this._decrement.addEventListener('click', this._handleDecrementClick.bind(this));
        this._decrement.addEventListener('click', this._handleCheckProductAmountBinded);
        this._likeButton.addEventListener('click', this._handleLikeClick.bind(this));
        this._checkbox.addEventListener('click', this._handleCheckboxClick.bind(this));
        this._checkbox.addEventListener('click', this._handleCheckProductAmountBinded);
        this.element.querySelector('.product__delete-button').addEventListener('click', this._handleDeleteButtonClick.bind(this))
    }
    generateProduct () {
        this.element = this._getTemplate();
        this._checkbox = this.element.querySelector('.product__checkbox')
        if (this._isChecked) {
            this._checkbox.classList.add('main__checkbox_active')
        }
        this._imageElement = this.element.querySelector('.product__image');
        this._imageElement.style.backgroundImage = `url(${this._image})`
        this.element.querySelector('.product__name').textContent = this._name;
        if (this._parameters != (undefined || null))
        {
            for (const [key, value] of Object.entries(this._parameters)) {
                this.element.querySelector('.product__parameters').innerHTML = this.element.querySelector('.product__parameters').innerHTML + `<span class="product__parameters-item">${key}: ${value}</span>`
            };
        }
        this.element.querySelector('.product__warehouse').textContent = this._warehouse;
        this.element.querySelector('.product__producer').textContent = this._producerName;
        this.element.querySelector('.producer-info__name').textContent = this._producerName.toUpperCase();
        this.element.querySelector('.producer-info__reg-number').textContent = this._producerRegNumber;
        this.element.querySelector('.producer-info__adress').textContent = this._producerAdress;
        this.element.querySelector('.sum__price').textContent = (Math.round(this._summary)).toString() + ' сом';
        this.element.querySelector('.sum__discount').textContent = (Math.round(this._summaryDiscount + this._summary)).toString() + ' сом';
        this._decrement = this.element.querySelector('.product__amount-decrement');
        this._increment = this.element.querySelector('.product__amount-increment');
        if (!this._isDecrementActive) {
            this._decrement.classList.add('product__amount-decrement_disabled');
        };
        this.element.querySelector('.product__amount-counter').textContent = this._amount.toString();
        this.element.querySelector('.discount-info__percent_type_service-discount').textContent = 'Скидка ' + this._discount*100 + '%';
        this.element.querySelector('.discount-info__amount_type_service-discount').textContent = '- ' + Math.round(this._discount*this._amount*this._price) + ' сом';
        this.element.querySelector('.discount-info__percent_type_user-discount').textContent = 'Скидка ' + this._userDiscount*100 + '%';
        this.element.querySelector('.discount-info__amount_type_user-discount').textContent = '- ' + Math.round(this._userDiscount*this._amount*this._price) + ' сом';
        this._leftAmountElement = this.element.querySelector('.product__amount-left');
        this._checkLeftAmountElementActivity();
        this._likeButton = this.element.querySelector('.product__like-button');
        this.element.setAttribute("id",`${this._productID}`);
        this._changeSummaryOnGeneration(Math.round(this._summary), (Math.round(this._summaryDiscount + this._summary)))
        document.querySelector('.cart__products').append(this.element);
        this._handleCheckProductAmountBinded();
        this._setEventListeners();
    }
}