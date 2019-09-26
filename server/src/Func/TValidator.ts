export type TCheckField = (cValidator: TValidator) => (sField: string) => TValidator;

export interface ErrorsI {
    [key: string]: { [key: string]: boolean }
}

/**
 * Валидатор поля
 */
export class TValidator {

    protected errors: ErrorsI;

    protected bOk: boolean = true;
    protected data: any;
    protected sErr: string;


    constructor() {
        this.sErr = 'Alert! Error is not set for ';
        this.errors = {};
        return this;
    }

    protected fErr(kError: string, bVal: boolean) {
        if (bVal) {
            this.bOk = false;
        }
        if (!this.errors[this.sErr]) {
            this.errors[this.sErr] = {}
        }
        this.errors[this.sErr][kError] = bVal;
    }

    public fProcess(): void {
        if (!this.fIsOk()) throw this.fGetErrors();
    }

    /**
     * Список ошибок
     */
    public fGetErrors(): { [key: string]: any } {
        return this.errors;
    }

    /**
     * признак отсутвия ошибок
     */
    public fIsOk(): boolean {
        return this.bOk;
    }

    /**
     * Установить валидируемые данные
     * @param data 
     */
    public fSetData(data: any): TValidator {
        this.data = data;
        return this;
    }


    /**
     * строка примечание к ошибке
     * @param sErr: string 
     */
    public fSetErrorString(sErr: string): TValidator {
        this.sErr = sErr;
        return this;
    }

    private fIsNull(): boolean {
        let resp = false;
        try {
            switch (this.data) {
                case undefined:
                    resp = true;
                    break;
                case null:
                    resp = true;
                    break;
            }
        } catch (e) {
            resp = true;
        }

        return resp;
    }

    /**
     * Существование значения
     * @error isNotExist
     */
    public fExist(): TValidator {
        this.fErr('isNotExist', this.fIsNull());
        return this;
    }

    /**
     * Занчение присваивается если пусто
     * @param data 
     */
    public fDefault(data: any): TValidator {
        if(this.fIsNull()) {
            this.data = data;
        }
        return this;
    }

    /**
     * Это id из DB
     */
    public fId(): TValidator {
        this.fExist()
            .fInt()
            .fMore(0)
        return this;
    }

    /**
	 * Text validator
	 *
	 * @param string sKey
	 * @return boolean
	 */
    public fText(sError: string = 'isNotText'): TValidator {
        this.fErr('isNotText', false);

        let bSuccess = false;

        try {
            /* if string is not empty */
            const s = String(this.data).trim();

            if (s) {
                bSuccess = true;
                this.data = s;
            }

            /* if string is empty */
            if (this.data == '') {
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('isNotText', true);
            }
        } catch (e) {
            this.fErr('isNotText', true);
        }

        return this;
    }


    /**
    * Валидирует булевую переменную
    * @error isNotBool
    * @param string sError: string = 'isNotBool'
    * @return boolean
    */
    public fBool(sError: string = 'isNotBool'): TValidator {
        this.fErr('isNotBool', true);

        let bSuccess = false;
        try {
            const i = Number(this.data);

            if (!isNaN(i)) {
                if (i == 0 || i == 1) {
                    bSuccess = true;
                    this.data = Boolean(i);
                } else {
                    bSuccess = false;
                }
            }

            if (!bSuccess) {
                this.fErr('isNotBool', false);
            }

        } catch (e) {
            this.fErr('isNotBool', false);
        }

        return this;
    }

	/**
	 * Проверяет числовые значения
     * @error isNotInt
	 * @param string sKey
	 * @param string sTpl
	 * @param string sError: string = 'isNotInt'
	 * @return boolean
	 */
    public fInt(sError: string = 'isNotInt'): TValidator {
        this.fErr('isNotInt', false);
        let bSuccess = false;
        let i = Math.round(Number(this.data));
        try {
            if (!isNaN(i)) {
                bSuccess = true;
                this.data = i;
            }

            if (!bSuccess) {
                this.fErr('isNotInt', true);
            }

        } catch (e) {
            this.fErr('isNotInt', true);
        }

        return this;
    }

	/**
	 * Проверяет дату
	 * @error isNotDate
	 * @param string sKey
	 * @param string sError: string = 'isNotInt'
	 * @return boolean
	 */
    public fDate(sError: string = 'isNotDate'): TValidator {
        this.fErr('isNotDate', false);
        let dateformat = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
        let bSuccess = false;
        try {
            // Match the date format through regular expression
            if (Boolean(this.data.match(dateformat))) {
                //Test which seperator is used '/' or '-'
                let opera1 = this.data.split('/');
                let opera2 = this.data.split('-');
                let lopera1 = opera1.length;
                let lopera2 = opera2.length;
                // Extract the string into month, date and year
                let aKey: any[];
                if (lopera1 > 1) {
                    aKey = this.data.split('/');
                }
                else if (lopera2 > 1) {
                    aKey = this.data.split('-');
                }
                let dd = parseInt(aKey[2]);
                let mm = parseInt(aKey[1]);
                let yy = parseInt(aKey[0]);
                // Create list of days of a month [assume there is no leap year by default]
                let ListofDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
                if (mm == 1 || mm > 2) {
                    if (dd > ListofDays[mm - 1]) {
                        bSuccess = false;
                    }
                }
                if (mm == 2) {
                    let lyear = false;
                    if ((!(yy % 4) && yy % 100) || !(yy % 400)) {
                        lyear = true;
                    }
                    if ((lyear == false) && (dd >= 29)) {
                        bSuccess = false;
                    }
                    if ((lyear == true) && (dd > 29)) {
                        bSuccess = false;
                    }
                }
                bSuccess = true;
            }
            else {
                bSuccess = false;
            }

            if (!bSuccess) {
                this.fErr('isNotDate', true);
            }
        } catch (e) {
            this.fErr('isNotDate', true);
        }

        return this;

    }

	/**
	 * Проверяет числовые значения - 2.22
	 * @error isNotDecimal
	 * @param string sError: string = 'isNotDecimal'
	 * @return boolean
	 */
    public fDecimal(sError: string = 'isNotDecimal'): TValidator {
        let bSuccess = false;
        this.fErr('isNotDecimal', bSuccess);

        try {
            let i = parseFloat(Number(this.data).toFixed(2));

            if (!isNaN(i)) {
                this.data = i;
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('isNotDecimal', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotDecimal', !bSuccess);
        }

        return this;
    }


    // ================================================================
    // Логические проверки
    // ================================================================

	/**
	 * Проверяет на больше
	 * @error isNotMoreThan
	 * @param iVal: number
	 * @param sError: string = 'isNotMoreThan'
	 */
    public fMore(iVal: number, sError: string = 'isNotMoreThan'): TValidator {

        let bSuccess = false;
        this.fErr('isNotMoreThan', bSuccess);
        try {
            let i = Number(this.data);

            if (!isNaN(i)) {
                if (i > iVal) { // Если значение больше - все хорошо
                    bSuccess = true;
                }
            }

            if (!bSuccess) {
                this.fErr('isNotMoreThan', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotMoreThan', !bSuccess);
        }

        return this;


    }

	/**
	 * Проверяет на больше
	 * @error isNotMoreOrEqualThan
	 * @param iVal: number
	 */
    public fMoreOrEqual(iVal: number, sError: string = 'isNotMoreOrEqualThan'): TValidator {

        let bSuccess = false;
        this.fErr('isNotMoreOrEqualThan', bSuccess);
        try {
            let i = Number(this.data)

            if (!isNaN(i)) {
                if (i >= iVal) { // Если значение больше - все хорошо
                    bSuccess = true;
                }
            }

            if (!bSuccess) {
                this.fErr('isNotMoreOrEqualThan', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotMoreOrEqualThan', !bSuccess);
        }

        return this;
    }

	/**
	 * Проверяет на меньше
	 *
	 * @param iVal: number
	 * @param sError: string = 'isNotLessThan'
	 */
    public fLess(iVal: number, sError: string = 'isNotLessThan'): TValidator {

        let bSuccess = false;
        this.fErr('isNotLessThan', bSuccess);
        try {
            let i = Number(this.data);

            if (!isNaN(i)) {
                if (i < iVal) { // Если значение меньше - все хорошо
                    bSuccess = true;
                }
            }

            if (!bSuccess) {
                this.fErr('isNotLessThan', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotLessThan', !bSuccess);
        }

        return this;
    }

	/**
	 * Проверяет на меньше или равно
	 * @error isLessOrEqualThan
	 * @param iVal: number
	 */
    public fLessOrEqual(iVal: number, sError: string = 'isLessOrEqualThan'): TValidator {

        let bSuccess = false;
        this.fErr('isLessOrEqualThan', bSuccess);
        try {
            let i = Number(this.data);

            if (!isNaN(i)) {
                if (i <= iVal) { // Если значение меньше - все хорошо
                    bSuccess = true;
                }
            }

            if (!bSuccess) {
                this.fErr('isLessOrEqualThan', !bSuccess);
            }

        } catch (e) {
            this.fErr('isLessOrEqualThan', !bSuccess);
        }

        return this;
    }

	/**
	 * Проверяет на макс количесво символов
	 *
	 * @param iLen: number
	 * @param sError: string = 'moreThanMaxLen'
	 */
    public fMaxLen(iLen: number, sError: string = 'moreThanMaxLen'): TValidator {

        let bSuccess = false;
        this.fErr('moreThanMaxLen', bSuccess);
        try {
            let s = String(this.data);

            if (s.length <= iLen) { // Если значение меньше - все хорошо
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('moreThanMaxLen', !bSuccess);
            }

        } catch (e) {
            this.fErr('moreThanMaxLen', !bSuccess);
        }

        return this;

    }

	/**
	 * Проверяет на минимальное количесво символов
	 *
	 * @param iLen: number
	 * @param sError: string = 'lessThanMinLen'
	 */
    public fMinLen(iLen: number, sError: string = 'lessThanMinLen'): TValidator {

        let bSuccess = false;
        this.fErr('lessThanMinLen', bSuccess);
        try {
            let s = String(this.data);

            if (s.length >= iLen) { // Если значение минимальное - все хорошо
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('lessThanMinLen', !bSuccess);
            }

        } catch (e) {
            this.fErr('lessThanMinLen', !bSuccess);
        }

        return this;

    }

    /**
     * @error isNotEqual
     * @param Val 
     * @param sError: string = 'isNotEqual'
     */
    public fEqual(Val: any, sError: string = 'isNotEqual'): TValidator {

        let bSuccess = false;
        this.fErr('isNotEqual', bSuccess);
        try {
            bSuccess = (Val == this.data);

            if (!bSuccess) {
                this.fErr('isNotEqual', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotEqual', !bSuccess);
        }

        return this;
    }

    /**
     * Данные не должны существовать
     * @error isExist
     * @param sError: string = 'isExist' 
     */
    public fNotExist(sError: string = 'isExist'): TValidator {

        let bSuccess = false;
        this.fErr('isExist', bSuccess);
        try {
            if (!this.data) {
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('isExist', !bSuccess);
            }

        } catch (e) {
            this.fErr('isExist', !bSuccess);
        }

        return this;
    }

    /**
     * Проверка что значение должно быть true
     * @error isNotTrue
     * @param sError: string = 'isNotTrue' 
     */
    public fTrue(sError: string = 'isNotTrue'): TValidator {

        let bSuccess = false;
        this.fErr('isNotTrue', bSuccess);
        try {
            if (this.data == true) {
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('isNotTrue', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotTrue', !bSuccess);
        }

        return this;
    }

    /**
     * Проверка что значение должно быть false
     * @error isNotFalse
     * @param sError: string = 'isNotFalse' 
     */
    public fFalse(sError: string = 'isNotFalse'): TValidator {

        let bSuccess = false;
        this.fErr('isNotFalse', bSuccess);
        try {
            if (this.data == false) {
                bSuccess = true;
            }

            if (!bSuccess) {
                this.fErr('isNotFalse', !bSuccess);
            }

        } catch (e) {
            this.fErr('isNotFalse', !bSuccess);
        }

        return this;
    }

    /**
     * Выполнить ф-ю если все OK
     * Не будет корректно работать с асинхронными ф-ми
     * @param fnc: Function
     * @param arg: any[] - аргументы для fnc
     * @param sError: string = 'fncHasError' 
     */
    public fDoIfOk(fnc: Function, arg: any[] = [], sError: string = 'fncHasError'): any {
        let resp;
        this.fErr('fncHasError', false);
        if (this.fIsOk()) {
            try {
                resp = fnc(...arg);
            } catch (e) {
                this.fErr('fncHasError', true);
            }
        }

        return resp;
    }

    /**
     * Выполнить асинхронную ф-ю если все OK
     * @param fnc: Function
     * @param sError: string = 'fncAsyncHasError' 
     */
    public async faDoIfOkAsync(fnc: Function): Promise<any> {

        let resp;
        this.fErr('fncHasError', false);
        if (this.fIsOk()) {
            try {
                resp = await fnc();
            } catch (e) {
                this.errors = { ...this.errors, ...e }
            }
        }

        return resp;
    }

}