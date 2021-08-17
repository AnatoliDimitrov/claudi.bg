import authentication from "../../services/authentication.js";
import registerTemplate from "./registerTemplate.js";

function ValidateEmail(mail) {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
        return (true)
    }
    return (false)
}

async function view(context) {
    let infoObj = undefined;
    async function submitForm(context, e) {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);
        //let email = formData.get('email');
        let username = formData.get('username');
        let password = formData.get('password');
        let repass = formData.get('repeatPass');

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
        if (!repass) {
            if (errorMessage) {
                errorMessage += '\nRepeat password can not be empty!'
            } else {
                errorMessage += 'Repeat Password can not be empty!'
            }
        }
        if (repass !== password) {
            if (errorMessage) {
                errorMessage += '\nRepeat password and password have to be the same!'
            } else {
                errorMessage += 'Repeat password and password have to be the same!'
            }
        }

        // Change from username to email if needed
        // Be careful with object that send fro authantication
        // See what info you are saving in localStorage
        // Rewrite the constants

        if (username && password && repass && (password === repass)) {
            try {
                let result = await authentication.register({ username, password })
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

            alert('Fields cannot be empty!');
        }
    }

    submitForm = submitForm.bind(null, context);

    infoObj = {
        submitForm,
    }
    let html = registerTemplate.template(infoObj);
    context.main(html);
}

export default {
    view
}