import { products, missingProducts, cards, deliveryAdresses, franchiseAdresses } from "./utils/initialData.js";
import { Product } from "./components/Product.js";
import { MissingProduct } from "./components/MissingProduct.js";
import { DeliveryLine } from "./components/DeliveryLine.js";
import { DeliveryCard } from "./components/DeliveryCard.js";
import { InputValidator } from "./components/InputValidator.js";
import { PaymentMethodPopup } from "./components/PaymentMethodPopup.js";
import { DeliveryMethodPopup } from "./components/DeliveryMethodPopup.js";

let summary = 0;
let summaryWithoutDiscount = 0;
let summaryDiscount = 0;
let productsCounter = products.length;
const lineKeys = [];
const lineElements = [];
let deliveryCards = [];
const inputValidators = [];
const buttonContent = document.querySelector('.summary__button-content');
const handleImmidiatePurchaseCheckboxClick = () => {
    const checkbox = document.querySelector('.payment__ckeckbox');
    const paymentAnnotation = document.querySelector('.payment__annotation');
    const paymentSectionAnnotation = document.querySelector('.payment-section__annotation')
    if (checkbox.classList.contains('payment__ckeckbox_active')) {
        checkbox.classList.remove('payment__ckeckbox_active');
        paymentAnnotation.classList.remove('payment__annotation_disabled');
        paymentSectionAnnotation.classList.remove('payment-section__annotation_disabled');
        buttonContent.textContent = 'Заказать';
    } else {
        checkbox.classList.add('payment__ckeckbox_active');
        paymentSectionAnnotation.classList.add('payment-section__annotation_disabled');
        paymentAnnotation.classList.add('payment__annotation_disabled');
        buttonContent.textContent = 'Оплатить ' + summary + ' сом';
        productsCounter = document.querySelectorAll('.product').length;
    }
}
const handleChangeSummary = () => {
    document.querySelector('.summary__price').textContent = summary + ' сом';
    document.querySelector('.summary__without-discount').textContent = summaryWithoutDiscount + ' сом';
    const productCounterElement = document.querySelector('.summary__products-amount');
    if (productsCounter === 1) {
        productCounterElement.textContent = productsCounter + ' товар';
    } else if (1<productsCounter<5) {
        productCounterElement.textContent = productsCounter + ' товара';
    } else if (4<productsCounter<=9 || 0) {
        productCounterElement.textContent = productsCounter + ' товаров';
    }
    document.querySelectorAll('.page__active-products-amount').forEach(counter => {
        counter.textContent = productsCounter;
        if (counter.textContent === '0') {
            counter.style.display = 'none';
        } else counter.style.display = 'block';
    })
    document.querySelector('.summary__discount-amount').textContent = '-' + summaryDiscount + ' сом';
    if (document.querySelector('.payment__ckeckbox').classList.contains('payment__ckeckbox_active')) {
        buttonContent.textContent = 'Оплатить ' + summary + ' сом';
    }
}
const changeSummaryOnGeneration = (generatedSummary, generatedSummaryWithoutDiscount, ID, amount, leftAmount, isChecked) => {
    summary+=generatedSummary;
    summaryWithoutDiscount+=generatedSummaryWithoutDiscount;
    summaryDiscount=summaryWithoutDiscount-summary;
    handleChangeSummary();
    return;
}
const onIncreaseSummary = (isChecked, price, priceWithoutDiscount, ID, amount, leftAmount) => {
    if (isChecked) {
        summary+=Math.round(price);
        summaryWithoutDiscount+=priceWithoutDiscount;
        summaryDiscount+=(priceWithoutDiscount-price);
    }
    handleChangeSummary()
    return;
}
const onDecreaseSummary = (isChecked, price, priceWithoutDiscount, ID, amount, leftAmount) => {
    if (isChecked) {
        summary-=Math.round(price);
        summaryWithoutDiscount-=priceWithoutDiscount;
        summaryDiscount-=(priceWithoutDiscount-price);
    }
    handleChangeSummary();
    return;
}
const onProductCkeckboxClick = (isChecked, productSummary, productSummaryWithoutDiscount, ID, amount, leftAmount) => {
    if (isChecked) {
        summary -= productSummary;
        summaryWithoutDiscount -= productSummaryWithoutDiscount;
        summaryDiscount -= (productSummaryWithoutDiscount-productSummary);
    } else {
        summary += productSummary;
        summaryWithoutDiscount += productSummaryWithoutDiscount;
        summaryDiscount += (productSummaryWithoutDiscount-productSummary);
    }
    handleChangeSummary();
    emptyLinesCheckup();
} 
const emptyLinesCheckup = () => {
    for (let i=0; lineElements[i]!==undefined; i++) {
        let lineAmount = 0;
        if (deliveryCards.every(card=>card.isHidden)) {
            lineElements.forEach(line =>line.handleHideLine());
        }
        if (deliveryCards[0]!==undefined) {
            deliveryCards.forEach(card=> {
                if (!card.isHidden) {
                    if (card.lineID===i) {
                        lineElements[i].handleShowLine();
                        lineAmount+=card.amount;
                    }        
                    if (lineAmount === 0) {
                        lineElements[i].handleHideLine();
                    }
                }  
            })
        } else lineElements.forEach(line =>line.handleHideLine());
    }
}
function handleCheckProductAmount () {
    let currentAmount = this._leftAmount>=this._amount ? this._amount : this._leftAmount;
    const productCards = deliveryCards.filter((card)=>{return card.ID==this._productID});
    if (this._isChecked) {
        for (let i=0; i<productCards.length; i++) {
            if(productCards[i].maxAmount<=currentAmount) {
                productCards[i].handleShowCard();
                currentAmount-=productCards[i].maxAmount
                productCards[i].setMaxAmount() // ручка ставящая максимум
            } else {
                productCards[i].handleShowCard();
                if (currentAmount===0) {
                    productCards[i].setMinAmount()// ручка ставящая минимум
                    productCards[i].handleHideCard();
                }
                productCards[i].setCurrentAmount(currentAmount)// ручка ставящая каррент
                currentAmount=0;
            }
        }
    } else {
        for (let i=0; i<productCards.length; i++) {
        productCards[i].handleHideCard();
        }
    }
    emptyLinesCheckup();
}
const handleHideAllLines = (e) => {
    if (e.target.classList.contains('main__checkbox_active'))  {
        lineElements.forEach(line=>line.handleHideLine())
    } else lineElements.forEach(line=>line.handleShowLine());
    emptyLinesCheckup();
}
const handleToggleAllCards = (e) => {
    if (e.target.classList.contains('main__checkbox_active'))  {
        deliveryCards.forEach(card=>card.handleHideCard())
    } else deliveryCards.filter(card=>card.amount>0).forEach(card=>card.handleShowCard());
}
const handleDeleteProductCards = (id) => {
    const indexesOnDelete = [];
    deliveryCards.forEach((card,i)=> {
        if (card.ID===id) {
            indexesOnDelete.push(i);
            document.querySelector(`.${card.randomSelector}`).remove();
        }
    })
    indexesOnDelete.forEach((index,i) => {
        deliveryCards.splice(index-i,1);
        
    })
    emptyLinesCheckup();
}
const onDeleteProduct = (productSummary, productSummaryWithoutDiscount, id) => {
    summary-=productSummary;
    summaryWithoutDiscount-=productSummaryWithoutDiscount;
    summaryDiscount-=(productSummaryWithoutDiscount-productSummary);
    productsCounter-=1;
    handleChangeSummary();
    handleDeleteProductCards(id);
}
products.forEach(product => {
    const dateEntries = Object.entries(product.deliveryDate)
    for (let i=0; i<dateEntries.length; i++)  {
    const [key, value] = dateEntries[i];
    if (lineKeys.includes(key)) {
    } else {
        lineKeys.push(key);
        const line = new DeliveryLine (key, i, '#delivery-line', '.delivery-line__value-container');
        lineElements.push(line);
        document.querySelector('.delivery-section').insertBefore(line.createLine(), document.querySelector('.delivery-section').childNodes[document.querySelector('.delivery-section').childElementCount+2])
    }
   }
   for (const [key,value] of dateEntries) {
    const index = lineKeys.indexOf(key);
    const card = new DeliveryCard (value, lineElements[index]._id, product, '#delivery-card');
    deliveryCards.push(card);
    lineElements[index].addItem(card.generateCard());
   }
})
products.forEach(product => {
    const productNode = new Product (
        product, 
        '#product',
        {
            changeSummaryOnGeneration,
            onIncreaseSummary,
            onDecreaseSummary,
            onProductCkeckboxClick,
            onDeleteProduct,
            handleCheckProductAmount
        }
        )
        
    productNode.generateProduct();
})
missingProducts.forEach(product => {
    const missingProductNode = new MissingProduct (
        product,
        '#product_type_missing'
    );
    missingProductNode.generateProduct();
})
document.querySelectorAll('.form__input').forEach(input => {
    const newValidator = new InputValidator(`.${input.classList[1]}`)
    newValidator.enableValidation();
    inputValidators.push(newValidator)
})


document.querySelector('.cart__slider-button').addEventListener('click', (evt)=> {
    if (evt.target.classList.contains('cart__slider-button_transformed')) {
        evt.target.classList.remove('cart__slider-button_transformed');
        document.querySelector('.cart__products').classList.remove('cart__products_invisible');
    } else {
        evt.target.classList.add('cart__slider-button_transformed');
        document.querySelector('.cart__products').classList.add('cart__products_invisible');
    }
})
document.querySelector('.cart__slider-button_place_missing').addEventListener('click', (evt)=> {
    if (evt.target.classList.contains('cart__slider-button_transformed')) {
        evt.target.classList.remove('cart__slider-button_transformed');
        document.querySelector('.missing__products-container').classList.remove('cart__products_invisible');
    } else {
        evt.target.classList.add('cart__slider-button_transformed');
        document.querySelector('.missing__products-container').classList.add('cart__products_invisible');
    }
})
document.querySelector('.cart__overall-checkbox').addEventListener('click', (e) => {
    handleToggleAllCards(e);
    handleHideAllLines(e);
    if (e.target.classList.contains('main__checkbox_active')) {
        summary = 0;
        summaryDiscount = 0;
        summaryWithoutDiscount = 0;
        handleChangeSummary();
        document.querySelectorAll('.main__checkbox_active').forEach(checkboxElem => {
            checkboxElem.classList.remove('main__checkbox_active')
        })
    } else {
        document.querySelectorAll('.main__checkbox').forEach(checkboxElem => {
            if (!checkboxElem.classList.contains('main__checkbox_active')) {
                if (checkboxElem.closest('.product__image-container')) {
                    const productNode = checkboxElem.closest('.product')
                    const sumText = productNode.querySelector('.sum__price').textContent
                    const sumTextSliceStart = sumText.split('').findIndex(el => el===' ')
                    const sumNum = + sumText.split('').slice(0, sumTextSliceStart).join('');
                    summary+=sumNum;
                    const sumWithoutDiscountText = productNode.querySelector('.sum__discount').textContent
                    const sumWithoutDiscountTextSliceStart = sumWithoutDiscountText.split('').findIndex(el => el===' ')
                    const sumWithoutDiscountNum = + sumWithoutDiscountText.split('').slice(0, sumWithoutDiscountTextSliceStart).join('');
                    summaryWithoutDiscount+=sumWithoutDiscountNum;
                    summaryDiscount=summaryWithoutDiscount-summary;
                    handleChangeSummary();
                }
                checkboxElem.classList.add('main__checkbox_active')
            }
        })
    }
})
document.querySelector('.payment__ckeckbox').addEventListener('click', handleImmidiatePurchaseCheckboxClick);
if (document.querySelector('.payment__ckeckbox').classList.contains('payment__ckeckbox_active')) {
    buttonContent.textContent = 'Оплатить ' + summary + ' сом';
}
document.querySelector('.summary__button').addEventListener('click', () => {
    inputValidators.forEach(input => {
        input.isDirty = true;
        if (!input.isValid) {
            input.showError();
        }
    })
})
window.onload = () => {
    const checkbox = document.querySelector('.payment__ckeckbox');
    const paymentAnnotation = document.querySelector('.payment__annotation');
    const paymentSectionAnnotation = document.querySelector('.payment-section__annotation')
    if (checkbox.classList.contains('payment__ckeckbox_active')) {
        checkbox.classList.remove('payment__ckeckbox_active');
        paymentAnnotation.classList.remove('payment__annotation_disabled');
        paymentSectionAnnotation.classList.remove('payment-section__annotation_disabled');
        buttonContent.textContent = 'Заказать';
    } else {
        checkbox.classList.add('payment__ckeckbox_active');
        paymentSectionAnnotation.classList.add('payment-section__annotation_disabled');
        paymentAnnotation.classList.add('payment__annotation_disabled');
        buttonContent.textContent = 'Оплатить ' + summary + ' сом';
    }
}
const paymentPopup = new PaymentMethodPopup('.popup_assignment_payment', cards, (id)=>{
    document.querySelector('.payment-section__card-thumbnail').style.backgroundImage = `url(${cards[id].image})`
    document.querySelector('.payment__card-thumbnail').style.backgroundImage = `url(${cards[id].image})`
    document.querySelector('.payment-section__card-number').textContent = cards[id].number;
    document.querySelector('.payment__card-number').textContent = cards[id].number;
    document.querySelector('.payment-section__card-expdate').textContent = cards[id].date;
});
document.querySelector('.main__section-button_place_payment').addEventListener('click', paymentPopup.openBinded);
document.querySelector('.summary__pencil_type_payment').addEventListener('click', paymentPopup.openBinded);
paymentPopup.renderCards();
const deliveryPopup = new DeliveryMethodPopup('.popup_assignment_delivery', deliveryAdresses, franchiseAdresses, (id, isPickUpMainElementVisible)=>{ 
    if (isPickUpMainElementVisible) {
        document.querySelector('.delivery__adress').textContent = franchiseAdresses[id].adress;
        document.querySelector('.delivery-line__value_place_adress').textContent = franchiseAdresses[id].adress;
        document.querySelector('.delivery-line__rating-container').style.display = 'flex';
        document.querySelector('.delivery-line__rating').textContent = franchiseAdresses[id].rating;
        document.querySelector('.delivery-line__workinghours').textContent = `Ежедневно с ${franchiseAdresses[id].openHours} до ${franchiseAdresses[id].closeHours} `;
    } else {
        document.querySelector('.delivery-line__rating-container').style.display = 'none';
        document.querySelector('.delivery__adress').textContent = deliveryAdresses[id];
        document.querySelector('.delivery-line__value_place_adress').textContent = deliveryAdresses[id];
    }
});
document.querySelector('.main__section-button_place_delivery').addEventListener('click', deliveryPopup.openBinded);
document.querySelector('.summary__pencil_type_shipping').addEventListener('click', deliveryPopup.openBinded);
deliveryPopup.activatePopup();