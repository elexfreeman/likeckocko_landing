import { AAClasses } from '@a-a-game-studio/aa-core/lib'

export interface ProductI {
    id: number;
    caption: string;
    description: string;
    img: string;
    url: string;
    price: number;
    isPublished: boolean;
}