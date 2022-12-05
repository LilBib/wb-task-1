export class InputValidator {
    constructor (inputSelector) {
        this._inputSelector = inputSelector;
        this._formElement = document.querySelector('.form');
        this._inputElement = this._formElement.querySelector(inputSelector);
        this._placeholderElement = this._inputElement.previousElementSibling;
        this._errorElement = this._inputElement.nextElementSibling;
        this._nameInputSelector = '.form__input_type_name';
        this._surnameInputSelector = '.form__input_type_surname';
        this._emailInputSelector = '.form__input_type_email';
        this._numberInputSelector = '.form__input_type_number';
        this._indexInputSelector = '.form__input_type_index';
        this._nameError = 'Укажите имя';
        this._surnameError = 'Введите фамилию';
        this._invalidEmailError = 'Проверьте адрес электронной почты';
        this._emptyEmailError = 'Укажите электронную почту';
        this._invalidNumberError = 'Формат: +9 999 999 99 99';
        this._emptyNumberError = 'Укажите номер телефона';
        this._invalidIndexError = 'Формат: 1234567';
        this._emptyIndexError = 'Укажите индекс';
        this._textRegExp = /^[А-Яа-я]+$/;
        this._emailRegExp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        this._numberRegExp = /^\+7\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}\s[0-9]{2}$/;
        this._indexRegExp = /^[0-9]{7,10}$/;
        this._activeError = '';
        this._isEmpty = true;
        this.isDirty = false;
        this.isValid = false;
        this._spanElement = this._errorElement.cloneNode(true);
    }
    _setEventListeners () {
        if (this._inputSelector===this._nameInputSelector) {
            this._activeError = this._nameError;
            this._inputElement.addEventListener('input', (e)=> {
                this._isEmpty = e.target.value.length === 0;
                if (this._isEmpty && this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (!this._isEmpty && !this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (e.target.value.match(this._textRegExp)) {
                    this._activeError = '';
                    this.isValid = true;
                } else {
                    this._activeError = this._nameError;
                    this.isValid = false;
                }
            })
            this._inputElement.addEventListener('blur', ()=> {
                if (!this._isEmpty) {
                    this.isDirty=true;
                }
            })
            window.addEventListener('resize', () => {
                if (document.querySelector('.page').clientWidth>700) {                
                    this._inputElement.closest('.form__input-container').style.maxWidth = `calc(100%/2)`
                } else this._inputElement.closest('.form__input-container').style.maxWidth = `100%`
            })
        }
        if (this._inputSelector===this._surnameInputSelector) {
            this._activeError=this._surnameError;
            this._inputElement.addEventListener('input', (e)=> {
                this._isEmpty = e.target.value.length === 0;
                if (this._isEmpty && this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (!this._isEmpty && !this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (e.target.value.match(this._textRegExp)) {
                    this._activeError = '';
                    this.isValid = true;
                } else {
                    this._activeError = this._surnameError;
                    this.isValid = false;
                }
            })
            this._inputElement.addEventListener('blur', ()=> {
                if (!this._isEmpty) {
                    this.isDirty=true;
                }
            })
            window.addEventListener('resize', () => {
                if (document.querySelector('.page').clientWidth>700) {                
                    this._inputElement.closest('.form__input-container').style.maxWidth = `calc(100%/2)`
                    this._inputElement.closest('.form__input-container').style.margin = '0'
                } else this._inputElement.closest('.form__input-container').style.maxWidth = `100%`
            })
        }
        if (this._inputSelector===this._emailInputSelector) {
            this._activeError=this._emptyEmailError;
            this._inputElement.addEventListener('input', (e)=> {
                this._isEmpty = e.target.value.length === 0;
                if (this._isEmpty && this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (!this._isEmpty && !this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (e.target.value.match(this._emailRegExp)) {
                    this._activeError = '';
                    this.isValid = true;
                } else if (this._isEmpty) {
                    this._activeError = this._emptyEmailError;
                    this.isValid = false;
                } else {
                    this._activeError = this._invalidEmailError;
                    this.isValid = false;
                }
            })
            this._inputElement.addEventListener('blur', ()=> {
                if (!this._isEmpty) {
                    this.isDirty=true;
                }
            })
            window.addEventListener('resize', () => {
                if (this._errorElement.classList.contains('form__error__type_email') && this._errorElement.textContent===this._invalidEmailError && document.querySelector('.page').clientWidth<1511 && document.querySelector('.page').clientWidth>700) {
                    this._errorElement.style.bottom = "-17px";
                } else if (this._errorElement.classList.contains('form__error__type_email') && this._errorElement.textContent===this._invalidEmailError && document.querySelector('.page').clientWidth<1511 && document.querySelector('.page').clientWidth>700) {
                    this._errorElement.style.bottom = "-17px";
                } else if (this._errorElement.classList.contains('form__error__type_email') && document.querySelector('.page').clientWidth<1213 && document.querySelector('.page').clientWidth>700) {
                    this._errorElement.style.bottom = "-17px";
                } else this._errorElement.style.bottom = "0px";
                if (document.querySelector('.page').clientWidth>700) {
                    this._inputElement.closest('.form__input-container').style.maxWidth = `calc(100%/3)`
                } else this._inputElement.closest('.form__input-container').style.maxWidth = `100%`
            })
            
        }
        if (this._inputSelector===this._numberInputSelector) {
            this._activeError=this._emptyNumberError;
            this._inputElement.addEventListener('input', (e)=> {
                this._isEmpty = e.target.value.length === 0;
                if (this._isEmpty && this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (!this._isEmpty && !this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (e.target.value.match(/^8$/) || e.target.value.match(/^7$/) || e.target.value.match(/^\+7$/) || e.target.value.match(/^9$/)) {
                    e.target.value = '+7 (';
                }

                if (e.target.value.match(/^\+7\s\([0-9]{3}$/)) {
                    e.target.value = e.target.value + ') ';
                }
                if (e.target.value.match(/^\+7\s\([0-9]{3}\)\s[0-9]{3}$/)) {
                    e.target.value = e.target.value + ' ';
                }                
                if (e.target.value.match(/^\+7\s\([0-9]{3}\)\s[0-9]{3}\s[0-9]{2}$/)) {
                    e.target.value = e.target.value + ' ';
                }
                if (e.target.value.match(this._numberRegExp)) {
                    this._activeError = '';
                    this.isValid = true;
                } else if (this._isEmpty) {
                    this._activeError = this._emptyNumberError
                    this.isValid = false;
                } else {
                    this._activeError = this._invalidNumberError;
                    this.isValid = false;
                }
            })
            this._inputElement.addEventListener('blur', ()=> {
                if (!this._isEmpty) {
                    this.isDirty=true;
                }
            })
            window.addEventListener('resize', () => {
                if (document.querySelector('.page').clientWidth>700 && document.querySelector('.page').clientWidth<1118) {
                    this._errorElement.style.bottom = "-17px";
                } else this._errorElement.style.bottom = "0";
                if (document.querySelector('.page').clientWidth>700) {
                    this._inputElement.closest('.form__input-container').style.maxWidth = `calc(100%/3)`
                } else this._inputElement.closest('.form__input-container').style.maxWidth = `100%`
            })
        }
        if (this._inputSelector===this._indexInputSelector) {
            this._activeError = this._emptyIndexError;
            this._inputElement.addEventListener('input', (e)=> {
                this._isEmpty = e.target.value.length === 0;
                if (this._isEmpty && this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (!this._isEmpty && !this._placeholderElement.classList.contains('form__placeholder_active')) {
                    this._togglePlaceholder();
                }
                if (e.target.value.match(this._indexRegExp)) {
                    this._activeError = '';
                    this.isValid = true;
                } else if (this._isEmpty) {
                    this._activeError = this._emptyIndexError;
                    this.isValid = false;
                } else {
                    this._activeError = this._invalidIndexError;
                    this.isValid = false;
                }
            })
            this._inputElement.addEventListener('blur', ()=> {
                if (!this._isEmpty) {
                    this.isDirty=true;
                }
            })
            window.addEventListener('resize', () => {
                if (document.querySelector('.page').clientWidth>700) {
                    this._inputElement.closest('.form__input-container').style.maxWidth = `calc(100%/3)`
                    this._inputElement.closest('.form__input-container').style.margin = `0`;
                } else this._inputElement.closest('.form__input-container').style.maxWidth = `100%`      
                if (document.querySelector('.page').clientWidth<1305 && document.querySelector('.page').clientWidth>700) {
                    this._spanElement.style.bottom = "-17px";
                } else this._spanElement.style.bottom = "0";
            })
            this._inputElement.closest('.form__input-container').append(this._spanElement);
            this._spanElement.textContent = 'Для таможенного оформления';
            this._spanElement.style.color = 'black';
            this._indexSpanElement = this._errorElement.nextElementSibling;
        }
        this._inputElement.addEventListener('input', () => {
            if (this.isDirty && !this.isValid) {
                this.showError();
            }
            if (this.isDirty && this.isValid) {
                this._hideError();
            }
            if (!this.isDirty) {
                this._hideError();
            }
        }) 
        this._inputElement.addEventListener('blur', () => {
            if (!this.isValid && this.isDirty) {
                this.showError();
            } else this._hideError();
        }) 
        this._hideError();1213
    }
    showError () {
        this._inputElement.style.color = '#F55123';
        this._inputElement.style.borderColor = '#F55123';
        this._errorElement.textContent = this._activeError;
        this._errorElement.style.display = "block";
        this._spanElement.style.display = 'none';
        if (this._errorElement.textContent===this._emptyNumberError && document.querySelector('.page').clientWidth>700 && document.querySelector('.page').clientWidth<1118) {
            this._errorElement.style.bottom = "-17px";
        } else if (this._errorElement.textContent===this._invalidEmailError && document.querySelector('.page').clientWidth<1511 && document.querySelector('.page').clientWidth>700) {
            this._errorElement.style.bottom = "-17px";
        } else if (this._errorElement.textContent===this._invalidEmailError && document.querySelector('.page').clientWidth<307) {
            this._errorElement.style.bottom = "-17px";
        } else if (this._errorElement.classList.contains('form__error__type_email') && document.querySelector('.page').clientWidth<1213 && document.querySelector('.page').clientWidth>700) {
            this._errorElement.style.bottom = "-17px";
        } else this._errorElement.style.bottom = "0px";
    }
    _hideError () {
        this._inputElement.style.color = '#000';
        this._inputElement.style.borderColor = '#cccccc';
        this._errorElement.textContent = '';
        this._errorElement.style.display = "none";
        this._spanElement.style.display = 'block';
        if  (document.querySelector('.page').clientWidth<1305 && document.querySelector('.page').clientWidth>700) {
            this._spanElement.style.bottom = "-17px";
        } else this._spanElement.style.bottom = "0"
    }
    _togglePlaceholder() {
        this._placeholderElement.classList.toggle('form__placeholder_active');
    }
    enableValidation () {
        this._setEventListeners();
    }
}