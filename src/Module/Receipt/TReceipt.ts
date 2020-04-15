/**
 * Рецепт
 */
export interface ReceiptI {
    id?: string;
    caption: string;
    description: string;
}




/**
 * Картинки рецептов
 */
export interface ReceiptImgI {
    id?: number;
    img_id: number;
    receipt_id: number;
}
