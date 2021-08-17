import authentication from "../../services/authentication.js";


async function logout(context) {
    await authentication.logout();
    authentication.cleanStorage();
    context.page.redirect('/');
}

export default {
    logout
}