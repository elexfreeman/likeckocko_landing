import * as Config from "../Config/Config";

/**
 * Интерфейс сео данных
 */
export interface SeoI {
    og: {
        type: string,
        siteName: string,
        title: string,
        description: string,
        url: string,
        image: string,
        imageType: string,
    },
    sTitle: string,
    sDescription: string,
    sKeywords: string,
    sPage: string,
}

/**
 * Тип стараницы сео
 */
export type FSeoPage = (sHost: string) => SeoI

/**
 * Деолтная ф-я
 * @param sHost 
 */
export const fMake =
    (sHost: string) =>
        (sTitle: string) =>
            (sDescription: string) =>
                (sImage: string) =>
                    (sKeywords: string): SeoI => {
                        const sNTitle = (sTitle) ? sTitle : 'Likechoco - Интернет магазин шоколада ручной работы';
                        const sNDescription = (sDescription) ? sDescription : 'Likechoco - Интернет магазин шоколада ручной работы';
                        const sNKeywords = (sKeywords) ? sKeywords : 'магазин шоколада ручной работы шоколад';
                        const sNImage = (sImage) ? sImage : Config.protocol + '://' + sHost + '/img/logo.jpg';
                        return {
                            og: {
                                type: 'website',
                                siteName: Config.siteName,
                                title: sNTitle,
                                description: sNDescription,
                                url: Config.protocol + '://' + sHost,
                                image: sNImage,
                                imageType: 'image/jpeg',
                            },
                            sTitle: sNTitle,
                            sDescription: sNDescription,
                            sKeywords: sNKeywords,
                            sPage: 'Likechoco',
                        }
                    }

/**
 * Главная станица
 * @param sHost 
 */
export const fMain: FSeoPage = (sHost: string) =>
    fMake(sHost)
        (null)
        (null)
        (null)
        (null);

export const fSeo = (sHost: string, sUrl: string) => {
    switch (sUrl) {
        case '/':
            return fMain(sHost);

        default:
            return fMain(sHost);
    }
}