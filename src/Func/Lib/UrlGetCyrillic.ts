/*Клас для генерации кирилистического урла в лат*/
export default class UrlGetCyrillic {

    static translit(text: string) {
// Символ, на который будут заменяться все спецсимволы
        let space = '-';
// Берем значение из нужного поля и переводим в нижний регистр
        text = text.toLowerCase();
        let transl: any;
// Массив для транслитерации
        transl = {
            'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
            'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
            'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
            'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh', 'ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
            ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
            '#': space, '$': space, '%': space, '^': space, '&': space, '*': space,
            '(': space, ')': space, '-': space, '\=': space, '+': space, '[': space,
            ']': space, '\\': space, '|': space, '/': space, '.': space, ',': space,
            '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
            '?': space, '<': space, '>': space, '№': space
        };

        let result = '';
        let curent_sim = '';

        for (let i = 0; i < text.length; i++) {
            // Если символ найден в массиве то меняем его
            if (transl[text[i]] != undefined) {
                if (curent_sim != transl[text[i]] || curent_sim != space) {
                    result += transl[text[i]];
                    curent_sim = transl[text[i]];
                }
            }
            // Если нет, то оставляем так как есть
            else {
                result += text[i];
                curent_sim = text[i];
            }
        }


        result = result.replace(/^-/, '');
        result = result.replace(/-$/, '');

        return result;
    }
/* 
    static intToMonth(i) {
        if (i < 10) {
            return '0' + i.toString()
        } else {
            return i.toString();
        }
    } */
/* 
    static getUrl(id, caption) {
        let d = new Date();
       
        if (caption.length > 80){
            caption = caption.substring(0, 80);
        }
        return UrlGetCyrillic.translit(caption + ' ' + UrlGetCyrillic.intToMonth(d.getMonth() + 1) + ' ' + UrlGetCyrillic.intToMonth(d.getDate()) + " " + id)
    } */
}

