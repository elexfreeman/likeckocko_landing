import * as express from 'express';
const path = require('path');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb',extended: true }));
app.use(bodyParser.json());

const cors = require('cors');
/*для подкл к API*/
app.use(cors());
app.options('*', cors());


app.use(express.static('./public'));

app.set('views', path.join(__dirname, '/View'));
app.set('view engine', 'ejs');


/* LEGO ошибок */
import ErrorSysMiddleware from './System/Middleware/ErrorSysMiddleware'
app.use(ErrorSysMiddleware);

import RequestSysMiddleware from './System/Middleware/RequestSysMiddleware'
app.use(RequestSysMiddleware);

import SeoMiddleware from './System/Middleware/SeoMiddleware'
app.use(SeoMiddleware);

import ResponseSysMiddleware from './System/Middleware/ResponseSysMiddleware'
app.use(ResponseSysMiddleware);

/* проверка авторизации на уровне приложения */
import AuthSysMiddleware from './System/Middleware/AuthSysMiddleware'
app.use(AuthSysMiddleware);



// Базовый модуль
import * as IndexController from './Controller/IndexController';
app.use(IndexController.router);

// Базовый модуль
import * as OrderController from './Controller/OrderController';
app.use(OrderController.router);

// Страница корзины
import * as CartController from './Controller/CartController';
app.use(CartController.router);


// Страница товара (должна быть самой поседней в подкл)
import * as ProductController from './Controller/ProductController';
app.use(ProductController.router);



console.log('server start at http://localhost:3005');
app.listen(3005);
