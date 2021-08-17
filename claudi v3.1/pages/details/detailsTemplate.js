import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

function template(element, isOwner, del) {
    return html`
            <section id="listing-details">
            <h1>Details</h1>
            <div class="details-info">
                <img src=${element.imageUrl}>
                <hr>
                <ul class="listing-props">
                    <li><span>Brand:</span>${element.brand}</li>
                    <li><span>Model:</span>${element.model}</li>
                    <li><span>Year:</span>${element.year}</li>
                    <li><span>Price:</span>${element.price}$</li>
                </ul>

                <p class="description-para">Some description of this car. Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Sunt voluptate quam nesciunt ipsa veritatis voluptas optio debitis repellat porro
                    sapiente.</p>
${isOwner
        ? html`<div class="listings-buttons">
                    <a href="/edit/${element._id}" class="button-list">Edit</a>
                    <a @click=${del} href="#" class="button-list">Delete</a>
                </div>`
: nothing}
            </div>
        </section>
    `;
}

export default {
    template,
}