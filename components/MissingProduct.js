export class MissingProduct {
    constructor (product, templateSelector) {
        this._productID = product.ID;
        this._templateSelector = templateSelector;
        this._image = product.image;
        this._name=product.name;
        this._parameters = product.parameters;
    }
    _getTemplate() {
        const productElement = document.querySelector(this._templateSelector).content.querySelector('.product').cloneNode(true);
        return productElement;
    }
    _handleLikeClick () {
        this._likeButton.classList.toggle('product__like-button_active')
    }
    _handleDeleteButtonClick () {
        document.getElementById(`${this._productID}`).remove();
        document.querySelector('.missing__amount').textContent = `${document.querySelector('.missing__amount').textContent[0]-1} товара`
        if (document.querySelector('.missing__amount').textContent[0] ==='0') {
            document.querySelector('.cart__missing').style.display = 'none';
        } else document.querySelector('.cart__missing').style.display = 'block';
    }
    _setEventListeners () {
        this._likeButton.addEventListener('click', this._handleLikeClick.bind(this));
        this.element.querySelector('.product__delete-button').addEventListener('click', this._handleDeleteButtonClick.bind(this))
    }
    generateProduct () {
        this.element = this._getTemplate();
        this._imageElement = this.element.querySelector('.product__image');
        this._imageElement.style.backgroundImage = `url(${this._image})`
        this.element.querySelector('.product__name').textContent = this._name;
        if (typeof this._parameters === 'object')
        {
            for (const [key, value] of Object.entries(this._parameters)) {
                this.element.querySelector('.product__parameters').innerHTML = this.element.querySelector('.product__parameters').innerHTML + `<span class="product__parameters-item">${key}: ${value}</span>`
            };
        }
        this._likeButton = this.element.querySelector('.product__like-button');
        this.element.setAttribute("id",`${this._productID}`);
        document.querySelector('.missing__products-container').append(this.element);
        this._setEventListeners();
    }
}