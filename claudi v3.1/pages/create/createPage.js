import authentication from "../../services/authentication.js";
import createTeamTepmplate from "./createTemplate.js";



async function view(context) {
    let infoObj = undefined;
    async function submitForm(context, e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        let brand = formData.get('brand');
        let model = formData.get('model');
        let description = formData.get('description');
        let year = Number(formData.get('year'));
        let price = Number(formData.get('price'));
        let imageUrl = formData.get('imageUrl');

        // if you need to put some IS-CORRECT classes take the function from furnitures

        if (brand && model && imageUrl && description && year > 0 && price > 0) {
            try {
                let result = await authentication.post({ brand, model, description, year, imageUrl, price });
                context.page.redirect(`/all`);
            } catch (error) {
                //////////// notifications start //////////////

                // let notification = document.getElementById('notification');
                // let span = notification.querySelector('span');
                // span.textContent = error;
                // notification.style.display = 'block';
                // setTimeout(() => { notification.style.display = 'none'; }, 3000);

                //////////// notifications end //////////////

                alert(error);
            }
        } else {
            //////////// notifications start //////////////

            // let notification = document.getElementById('notification');
            // let span = notification.querySelector('span');
            // span.textContent = error;
            // notification.style.display = 'block';
            // setTimeout(() => { notification.style.display = 'none'; }, 3000);

            //////////// notifications end //////////////

            alert('Fields cannot be empty!');
        }
    }

    submitForm = submitForm.bind(null, context);

    infoObj = {
        submitForm,
    }
    let html = createTeamTepmplate.template(infoObj);
    context.main(html);
}

export default {
    view
}