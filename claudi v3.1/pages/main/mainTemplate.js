import { html } from '../../node_modules/lit-html/lit-html.js';

function template() {
    return html`
    <section id="main">
            <div id="welcome-container">
                <h1>Welcome To Car Tube</h1>
                <img class="hero" src="/images/car-png.webp" alt="carIntro">
                <h2>To see all the listings click the link below:</h2>
                <div>
                    <a href="/all" class="button">Listings</a>
                </div>
            </div>
        </section>
`;
}

// function movieCard(movie, isLoggedIn) {
//     return html`
//     <div class="card mb-4">
//                         <img class="card-img-top"
//                              src=${movie.img}
//                              alt="Card image cap" width="400">
//                         <div class="card-body">
//                             <h4 class="card-title">${movie.title}</h4>
//                         </div>
//                         <div class="card-footer">
//                             ${isLoggedIn
//                              ? html` <a href="/details/${movie._id}">
//                                 <button type="button" class="btn btn-info">Details</button>
//                             </a>`
//                             : html``}
//                         </div>

//                     </div>
//                     `;
// }

export default {
    template
}