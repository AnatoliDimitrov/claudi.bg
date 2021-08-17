import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

function template(arr, userId) {
    return html`
    <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">
${arr.length !== 0
        ? html`${arr.map(c => html`${single(c)}`)}`
: html`<p class="no-cars"> You haven't listed any cars yet.</p>`}
            </div>
        </section>
`;
}

function single(e) {
    return html`
     <!-- Display all records -->
     <div class="listing">
                    <div class="preview">
                        <img src=${e.imageUrl}>
                    </div>
                    <h2>${e.brand} ${e.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${e.year}</h3>
                            <h3>Price: ${e.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${e._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
                    `;
}

export default {
    template
}