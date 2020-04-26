
/**
 * Загрузка картинки
 */
export namespace ImgUploadR {
    export const route = "/img/img_upload";

    /* запрос */
    export interface RequestI {
        fileBase64: string; // файл для загрузки
    }

    /* ответ */
    export interface ResponseI {
        file_name: string; // md5 содержимого
    }

}

/**
 * Полученеи файла
 */
export namespace ImgGetR {
    export const route = "/telegram/img/:file_name/:img_size";

    /* запрос */
    export interface RequestI {
    }

    /* ответ */
    export interface ResponseI {
    }

}
