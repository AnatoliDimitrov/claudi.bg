import authentication from "../../services/authentication.js";
import loginTemplate from "./loginTemplate.js";


async function view(context) {
    let infoObj = undefined;
    async function submitForm(context, e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        //let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');

        let errorMessage = '';

        if (!username) {
            errorMessage += 'Username can not be empty!'
        }
        if (!password) {
            if (errorMessage) {
                errorMessage += '\nPassword can not be empty!'
            } else {
                errorMessage += 'Password can not be empty!'
            }
        }

        // Change from username to email if needed
        // Be careful with object that send fro authantication
        // See what info you are saving in localStorage
        // Rewrite the constants

        if (username && password) {
            try {
                let result = await authentication.login({ username, password })
                authentication.fillLocaleStorage(result);
                context.page.redirect('/all');
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

            alert(errorMessage);
        }
    }

    submitForm = submitForm.bind(null, context);

    infoObj = {
        submitForm,
    }
    let html = loginTemplate.template(infoObj);
    context.main(html);
}

export default {
    view
}