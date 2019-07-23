import "reflect-metadata";
import { typeorm } from '../../Configs/config';
import { createConnection, ConnectionOptions } from 'typeorm';
import { Product } from './Entity/Product';

console.log(typeorm);

export default createConnection(<ConnectionOptions> typeorm);