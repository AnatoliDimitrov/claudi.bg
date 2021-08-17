const BASE = 'http://localhost:3030';
const CURRENT = `${BASE}/data/cars`;
const MOST_RECENT = `${CURRENT}?sortBy=_createdOn%20desc`;
const LOGIN = `${BASE}/users/login`;
const REGISTER = `${BASE}/users/register`;
const LOGOUT = `${BASE}/users/logout`;

export default {
    BASE,
    CURRENT,
    LOGIN,
    REGISTER,
    LOGOUT,
    MOST_RECENT
}