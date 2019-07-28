import "reflect-metadata";
import { typeorm } from '../../Configs/config';
import { createConnection, ConnectionOptions } from 'typeorm';

console.log(typeorm);

export default createConnection(<ConnectionOptions> typeorm);