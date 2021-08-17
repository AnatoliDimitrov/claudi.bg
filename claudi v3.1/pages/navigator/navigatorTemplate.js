
import { html } from '../../node_modules/lit-html/lit-html.js';
import { ifDefined } from '../../node_modules/lit-html/directives/if-defined.js';

function navTemplate(isLoggedIn, username, path) {
    return html`
    <nav>
        <a class=${ifDefined(path.startsWith('/index') ? 'active' : undefined)} href="/index">Home</a>
        <a href="/all" class=${ifDefined(path.startsWith('/all') ? 'active' : undefined)}>All Listings</a>
        <a href="/search" class=${ifDefined(path.startsWith('/search') ? 'active' : undefined)}>By Year</a>
        ${isLoggedIn
        ? html`<!-- Logged users -->
        <div id="profile">
            <a>Welcome ${username}</a>
            <a href="/my" class=${ifDefined(path.startsWith('/my') ? 'active' : undefined)}>My Listings</a>
            <a href="/create" class=${ifDefined(path.startsWith('/create') ? 'active' : undefined)}>Create Listing</a>
            <a href="/logout">Logout</a>
        </div>`
        : html`
        <!-- Guest users -->
        <div id="guest">
            <a href="/login" class=${ifDefined(path.startsWith('/login') ? 'active' : undefined)}>Login</a>
            <a href="/register" class=${ifDefined(path.startsWith('/register') ? 'active' : undefined)}>Register</a>
        </div>`}
        
    </nav>
    `;
}

export default {
    navTemplate
}