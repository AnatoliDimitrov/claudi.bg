import authentication from "../../services/authentication.js";
import allTemplate from "./allTemplate.js";


async function view(context) {
    let arr = await authentication.getMostRecent();
    // let isLoggedIn = authentication.isLoggedIn();
    let html = allTemplate.template(arr);
    context.main(html);
}

export default {
    view
}