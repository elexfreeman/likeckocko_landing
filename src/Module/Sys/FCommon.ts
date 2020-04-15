import { isEmpty } from 'lodash';
declare var global: any;

import axios from 'axios';
import * as moment from 'moment';
const EXIF = require('../Lib/exif.js');

export const sApiUrl = global.window.apiUrl;


/**
 * Ориентация фотки берется из камеры
 * @param file 
 */
export const faLoadExifOrientation = (file: any): Promise<number> => {
    return new Promise((resolve, reject) => {
        // function () - важно иначе неработает !!!
        const exif = EXIF.getData(file, function () {
            if (this.exifdata) {
                resolve(this.exifdata.Orientation);
            } else {
                resolve(0);
            }
        });
    });
};

/**
 * Стандартные заголовки API
 */
export const fApiHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'token': isEmpty(localStorage.getItem('token')) ? ('') : localStorage.getItem('token'),
    };
};

/**
 * Запрос к Api
 */
export const faRequestApi = (sRoute: string) =>
    async (data?: any): Promise<any> => {
        return (await axios.post(
            sApiUrl + sRoute,
            data,
            {
                headers: fApiHeaders(),
            })).data;
    };

/**
 * Convert input file to base64
 */
export const faGetBase64 = (file: any): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            resolve(String(reader.result));
        };
        reader.onerror = (error) => {
            reject(error);
        };
    });
};


/**
 * Resize image width
 */
export const faResizeImg =
    (nWidth: number) =>
        (nOrientation: number) =>
            (buffImg64: string): Promise<string> => {
                return new Promise((resolve, reject) => {
                    /* Create img native class */
                    const img = new Image();
                    /* insert base64img */
                    img.src = buffImg64;
                    /* loading... */
                    img.onload = () => {
                        /* cavas manipulating */
                        const canvas = document.createElement('canvas');
                        canvas.width = nWidth;
                        /* calc height */
                        canvas.height = canvas.width * (img.height / img.width);
                        const ctx = canvas.getContext('2d');

                        let width = canvas.width;
                        let height = canvas.height;

                        // calc orientation
                        if (nOrientation) {
                            if (nOrientation > 4) {
                                canvas.width = height;
                                canvas.height = width;
                            }
                            switch (nOrientation) {
                                case 2:
                                    ctx.translate(width, 0); ctx.scale(-1, 1);
                                    break;
                                case 3:
                                    ctx.translate(width, height);
                                    ctx.rotate(Math.PI);
                                    break;
                                case 4:
                                    ctx.translate(0, height); ctx.scale(1, -1);
                                    break;
                                case 5:
                                    width = canvas.height;
                                    height = canvas.width;
                                    ctx.rotate(0.5 * Math.PI);
                                    ctx.scale(1, -1);
                                    break;
                                case 6:
                                    width = canvas.height;
                                    height = canvas.width;
                                    ctx.rotate(0.5 * Math.PI);
                                    ctx.translate(0, -height);
                                    break;
                                case 7:
                                    width = canvas.height;
                                    height = canvas.width;
                                    ctx.rotate(0.5 * Math.PI);
                                    ctx.translate(width, -height); ctx.scale(-1, 1);
                                    break;
                                case 8:
                                    width = canvas.height;
                                    height = canvas.width;
                                    ctx.rotate(-0.5 * Math.PI);
                                    ctx.translate(-width, 0);
                                    break;
                            }
                        }

                        ctx.drawImage(img, 0, 0, width, height);
                        resolve(canvas.toDataURL('image/jpeg', JPG_QUALITY));
                    }; // img.onload
                }); // Promise
            };


export const JPG_QUALITY = 0.7;





export const fFormatDate = (date: string): string =>
    moment(date).format('DD.MM.YYYY HH:mm');


export const faResizeImgFile =
    (nWidth: number) =>
        async (file: File): Promise<string> => {
            const orientation: number = <number>await faLoadExifOrientation(file);
            return await faResizeImg(nWidth)(orientation)(await faGetBase64(file));
        };
