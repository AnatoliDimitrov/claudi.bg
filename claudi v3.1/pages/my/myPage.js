import authentication from "../../services/authentication.js";
import allTemplate from "./myTemplate.js";


async function view(context) {
    let userId = authentication.getUserId();
    // let email = authentication.getUserEmail();
    // let gender = authentication.getUserGender();
    // let username = authentication.getUserName();
    let arr = await authentication.getMy(userId);
    console.log(arr);
    // let isLoggedIn = authentication.isLoggedIn();
    let html = allTemplate.template(arr, userId);
    context.main(html);
}

export default {
    view
}