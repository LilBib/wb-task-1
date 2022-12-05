import { Popup } from "./Popup.js";
export class PaymentMethodPopup extends Popup {
    constructor (popupSelector, cardsInfo, submitButtonHandler) {
        super (popupSelector);
        this._cardsInfo = cardsInfo;
        this._cardElement = this._popupMainElement.querySelector('.popup__card-container').cloneNode(true);
        this._deactivateAllCheckboxesBinded = this._deactivateAllCheckboxes.bind(this);
        this._submitButtonHandler = submitButtonHandler;
    }
    renderCards () {
        this._popupMainElement.replaceChildren();
        this._cardsInfo.forEach((card, i) => {
            for (const [key, value] of Object.entries(card)) {
                if (key==='image') {
                     this._cardElement.querySelector('.popup__card-thumbnail').style.backgroundImage = `url(${value})`;
                }
                if (key==='number') {
                    this._cardElement.querySelector('.popup__card-number').textContent = `${value}`;
               }
               
            }
            if (i===0) {
                this._cardElement.querySelector('.popup__checkbox').classList.add('popup__checkbox_active')
            } else this._cardElement.querySelector('.popup__checkbox').classList.remove('popup__checkbox_active')
            this._renderCard(this._cardElement.cloneNode(true));
            this._popupMainElement.lastChild.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup__checkbox')) {
                    this._deactivateAllCheckboxesBinded();
                    e.target.classList.add('popup__checkbox_active');
                }
            })
        })
        this._setSubmitButtonListener();
    }
    _deactivateAllCheckboxes () {
        this._popupMainElement.querySelector('.popup__checkbox_active')? this._popupMainElement.querySelector('.popup__checkbox_active').classList.remove('popup__checkbox_active') : 0;
    }
    _getActiveCard () {
        let activeCardID = 0;
        this._popupMainElement.querySelectorAll('.popup__card-container').forEach((elem, i) => {
            if (elem.querySelector('.popup__checkbox_active')) {
                activeCardID = i;
            }
        })
        return activeCardID;
    }
    _setSubmitButtonListener () {
        this._popup.querySelector('.popup__button').addEventListener('click', ()=>{
            this._submitButtonHandler(this._getActiveCard());
            this.close();
        });
    }
    _renderCard (el) {
        this._popupMainElement.append(el)
    }
}