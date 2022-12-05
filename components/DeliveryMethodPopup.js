import { Popup } from "./Popup.js";
export class DeliveryMethodPopup extends Popup {
    constructor (popupSelector, adresses, franchises, submitButtonHandler) {
        super (popupSelector);
        this._adresses = adresses;
        this._franchises = franchises;
        this._pickUpMainElement = this._popup.querySelector('.popup__main_type_pick-up');
        this._courierMainElement = this._popup.querySelector('.popup__main_type_courier');
        this._franchiseElement = this._pickUpMainElement.querySelector('.popup__franchise-container').cloneNode(true);
        this._courierElement = this._courierMainElement.querySelector('.popup__courier-container').cloneNode(true);
        this._deactivateAllCheckboxesBinded = this._deactivateAllCheckboxes.bind(this);
        this._submitButtonHandlerBinded = submitButtonHandler.bind(this);
        this._isCourierMainElementVisible = false;
        this._isPickUpMainElementVisible = true;
    }
    _renderMainSections () {
        this._pickUpMainElement.replaceChildren();
        this._courierMainElement.replaceChildren();
        this._adresses.forEach((adress, i) => {
            this._courierElement.querySelector('.popup__adress').textContent = adress;
            this._renderDeliveryElement(this._courierElement.cloneNode(true));

        })
        this._franchises.forEach((card, i) => {
            for (const [key, value] of Object.entries(card)) {
                if (key==='adress') {
                    this._franchiseElement.querySelector('.popup__adress').textContent = value;
                }
                if (key==='rating') {
                    this._franchiseElement.querySelector('.popup__rating').textContent = value;;
                }   
            }
            if (i===0) {
                this._franchiseElement.querySelector('.popup__checkbox').classList.add('popup__checkbox_active')
            } else this._franchiseElement.querySelector('.popup__checkbox').classList.remove('popup__checkbox_active')
            this._renderPickUpElement(this._franchiseElement.cloneNode(true));

        })
        this._courierMainElement.style.display = 'none';
    }
    _deactivateAllCheckboxes () {
        this._popup.querySelector('.popup__checkbox_active')? this._popup.querySelector('.popup__checkbox_active').classList.remove('popup__checkbox_active') : 0;
    }
    _getActiveAdress () {
        let activeCardID = 0;
        if (this._isPickUpMainElementVisible) {
            this._pickUpMainElement.querySelectorAll('.popup__franchise-container').forEach((elem, i) => {
                if (elem.querySelector('.popup__checkbox_active')) {
                    activeCardID = i;
                }
            })
        } else {
            this._courierMainElement.querySelectorAll('.popup__courier-container').forEach((elem, i) => {
                if (elem.querySelector('.popup__checkbox_active')) {
                    activeCardID = i;
                }
            })
        }
        return activeCardID;
    }
    setEventListeners () {
        super.setEventListeners();
        this._popup.querySelector('.popup__button').addEventListener('click', ()=>{
            this._submitButtonHandlerBinded(this._getActiveAdress(), this._isPickUpMainElementVisible);
            this.close();
        });
        this._courierMainElement.childNodes.forEach(node=> node.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__checkbox')) {
                this._deactivateAllCheckboxesBinded();
                e.target.classList.add('popup__checkbox_active');
            }
            if (e.target.classList.contains('product__delete-button')) {
                e.target.closest('.popup__courier-container').remove(); 
            }
        }))
        this._pickUpMainElement.childNodes.forEach(node=> node.addEventListener('click', (e) => {
            if (e.target.classList.contains('popup__checkbox')) {
                this._deactivateAllCheckboxesBinded();
                e.target.classList.add('popup__checkbox_active');
            }
            if (e.target.classList.contains('product__delete-button')) {
                e.target.closest('.popup__franchise-container').remove(); 
            }
        }))
        this._popup.querySelector('.popup__menu-button_pick-up').addEventListener('click', (e)=> {
            if (!e.target.closest('.popup__menu-button_pick-up').classList.contains('popup__menu-button_active')) {
                this._popup.querySelector('.popup__menu-button_active').classList.remove('popup__menu-button_active');
                this._isPickUpMainElementVisible = true;
                this._isCourierMainElementVisible = false;
                e.target.closest('.popup__menu-button_pick-up').classList.add('popup__menu-button_active');
                this._courierMainElement.style.display = 'none';
                this._pickUpMainElement.style.display ='block';
            }
        })
        this._popup.querySelector('.popup__menu-button_courier').addEventListener('click', (e)=> {
            if (!e.target.closest('.popup__menu-button_courier').classList.contains('popup__menu-button_active')) {
                this._popup.querySelector('.popup__menu-button_active').classList.remove('popup__menu-button_active');
                this._isPickUpMainElementVisible = false;
                this._isCourierMainElementVisible = true;
                e.target.closest('.popup__menu-button_courier').classList.add('popup__menu-button_active');
                this._courierMainElement.style.display = 'block';
                this._pickUpMainElement.style.display = 'none';
            }
        })
    }
    _renderPickUpElement (el) {
        this._pickUpMainElement.append(el)
    }
    _renderDeliveryElement (el) {
        this._courierMainElement.append(el)
    }
    activatePopup() {
        this._renderMainSections();
        this.setEventListeners();
    }
}