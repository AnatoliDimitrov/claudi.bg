import { html } from '../../node_modules/lit-html/lit-html.js';

function template(arr) {
    return html`
    <section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
${arr.length !== 0
        ? html`${arr.map(c => html`${single(c)}`)}`
:html`
                <p class="no-cars">No cars in database.</p>`}
                <!-- Display if there are no records -->
            </div>
        </section>
`;
}

function single(e) {
    return html`
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