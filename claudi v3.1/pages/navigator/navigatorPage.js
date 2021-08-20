import navigatorTemplate from "./navigatorTemplate.js";


function view(context, next) {
    let html = navigatorTemplate.navTemplate();
    context.navigator(html);
    next();
}

export default {
    view
}