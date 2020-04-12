import { MainRequest } from "../Func/Sys/MainRequest";
import * as express from 'express';
import { faSendRouter } from "../Func/Sys/FResponse";
import { BlogMainR, BlogPageR } from "./Router"
import { BlogI } from "../Func/Blog/TBlog";
import * as FBlog from "../Func/Blog/FBlog";
import { fGetUrl, fGetIdFromUrl } from "../Func/Lib/UrlGetCyrillic";


const router = express.Router();


/**
 * Индексная страница
 */
router.get(BlogMainR.sUrl, faSendRouter(BlogMainR.sTpl, async (req: MainRequest) => {
    const aBlog: BlogI[] = await FBlog.faList();

    req.seo.sPage = "Блог компании Likechoco";
    req.seo.sTitle = `Блог компании Likechoco`;
    req.seo.sDescription = `Блог компании Likechoco`;

    return {
        aBlog: aBlog,
        fGetUrl: fGetUrl, /* TODO: переделать под хелпер */
    }

}));

/**
 * страница
 */
router.get(BlogPageR.sUrl, faSendRouter(BlogPageR.sTpl, async (req: MainRequest) => {

    const blogId = fGetIdFromUrl(req.params['url']);

    const blog: BlogI = await FBlog.faById(blogId);

    req.seo.sPage = blog.title;
    req.seo.sTitle = `Likechoco - ${blog.title}`;
    req.seo.sDescription = `Likechoco - ${blog.title}`;

    return {
        blog: blog,
        fGetUrl: fGetUrl,
    }
}));

export {
    router as BlogController
}
