import "reflect-metadata";
import { typeorm } from '../../Configs/config';
import { createConnection } from 'typeorm';
import { Product } from './Entity/Product';


typeorm.entities.push(Product);

export default createConnection(typeorm);