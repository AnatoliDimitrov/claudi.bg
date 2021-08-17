import authentication from "../../services/authentication.js";
import searchTemplate from "./searchTemplate.js";

let element = [];

async function view(context) {
    async function search(context, e) {
        let input = e.target.previousElementSibling;
        let year = Number(input.value);
        console.log(year);

        let result = await authentication.filterByYear(year);
        element = result;
        input.value = '';

        context.page.redirect('/search');
    }
    search = search.bind(null, context);

    let html = searchTemplate.template(element, search);
    context.main(html);
}

export default {
    view
}