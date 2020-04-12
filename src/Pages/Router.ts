/**
 * Маршруты
 */

export interface RouteI {
    sUrl: string,
    sTpl: string,
}

/**
 * Главная
 */
export const IndexR: RouteI = {
    sUrl: "/",
    sTpl: "index"
}

/**
 * Корзина
 */
export const CartR: RouteI = {
    sUrl: "/cart",
    sTpl: "cart"
}

/**
 * Политика 
 */
export const PoliticR: RouteI = {
    sUrl: "/politic",
    sTpl: "politic"
}
/**
 * Товар
 */
export const ProductR: RouteI = {
    sUrl: "/:url",
    sTpl: "product_page"
}

/**
 * Блог главная
 */
export const BlogMainR: RouteI = {
    sUrl: "/blog",
    sTpl: "blog/blog_main"
}

/**
 * Блог стр
 */
export const BlogPageR: RouteI = {
    sUrl: "/blog/:url",
    sTpl: "blog/blog_page"
}