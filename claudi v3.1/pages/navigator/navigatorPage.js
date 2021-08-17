import authentication from "../../services/authentication.js";
import navigatorTemplate from "./navigatorTemplate.js";


function view(context, next) {
    let isLogedIn = authentication.isLoggedIn();
    let username = authentication.getUserName();
    let path = context.pathname;
    let html = navigatorTemplate.navTemplate(isLogedIn, username, path);
    context.navigator(html);
    next();
}

export default {
    view
}