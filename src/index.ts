import * as express from 'express';
import { port } from "./Func/Config/Config";
import { fApp } from './FApp';


import { IndexController } from "./Pages/IndexP";
import { fLogErrors } from './Func/Sys/Middleware/MidErrorHandler';
import { ProductController } from './Pages/ProductP';
import { CartController } from './Pages/CartP';
import { OrderController } from './Pages/OrderAPI';
import { BlogController } from './Pages/BlogP';

const app: express.Express = fApp(express())
    (true) // bUseCors
    (true) // bUseBodyParser
    (true) // bUseStatic
    (true); // bUseViews

console.log('server start at http://localhost:' + port);


app.use(IndexController); // главная
app.use(CartController); // корзина
app.use(OrderController); // API корзины
app.use(BlogController); // товар


/* Все остальны стр вставлять выше товара */
app.use(ProductController); // товар

app.use(fLogErrors);

app.listen(port);    