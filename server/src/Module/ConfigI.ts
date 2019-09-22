import {System } from '@a-a-game-studio/aa-core/lib';
export interface ChockoConfI extends System.MainRequest.ConfI  {
    apiUrl: string;
    site: {
        phone: string,
        email: string,
    },

    protocol: string,
    baseUrl: string,
}