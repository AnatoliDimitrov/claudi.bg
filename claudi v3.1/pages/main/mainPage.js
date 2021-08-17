import mainTemplate from "./mainTemplate.js";


async function view(context) {
    let html = mainTemplate.template();
    context.main(html);
}

export default {
    view
}