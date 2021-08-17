import authentication from "../../services/authentication.js";
import detailsTemplate from "./detailsTemplate.js";

async function view(context) {

    async function del(context, e) {
        let confirmation = confirm('Are you sure?');
        if (confirmation) {
            await authentication.del(context.params.id)
            context.page.redirect(`/all`);
        }
    }
    del = del.bind(null, context);

    let element = await authentication.getOne(context.params.id);
    let isOwner = element._ownerId === authentication.getUserId();

    let html = detailsTemplate.template(element, isOwner, del);
    context.main(html);
}

export default {
    view
}