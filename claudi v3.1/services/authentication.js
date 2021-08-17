import constants from "./constants.js";
import { jsonRequest } from "./http.js";



async function get() {
    try {
        let result = await jsonRequest(constants.CURRENT);
        return result;
    } catch (err) {
        alert(err);
    }
}

async function getMostRecent() {
    try {
        let result = await jsonRequest(constants.MOST_RECENT, `get`);
        return result;
    } catch (err) {
        alert(err);
    }
}

async function getMy(userId) {
    try {
        let result = await jsonRequest(`${constants.CURRENT}${`?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`}`);
        return result;
    } catch (err) {
        alert(err);
    }
}


async function getOne(id) {
    try {
        let result = await jsonRequest(`${constants.CURRENT}/${id}`, 'get');
        return result;
    } catch (err) {
        alert(err);
    }
}

async function filterByUserId(id) {
    try {
        let result = await jsonRequest(`${constants.CURRENT}?where=_ownerId%3D%22${id}%22`, 'get');
        return result;
    } catch (err) {
        alert(err);
    }
}

async function filterByYear(year) {
    try {
        let result = await jsonRequest(`${constants.CURRENT}?where=year%3D${year}`, 'get', undefined, true);
        return result;
    } catch (err) {
        alert(err);
    }
}

async function postWithoutAuth(body) {
    try {
        await jsonRequest(constants.CURRENT, 'Post', body);
    } catch (err) {
        alert(err);
    }
}

async function post(body) {
    try {
        await jsonRequest(constants.CURRENT, 'Post', body, true, true);
    } catch (err) {
        alert(err);
    }
}

async function put(id, body) {
    try {
        await jsonRequest(`${constants.CURRENT}/${id}`, 'put', body, true, true);
    } catch (err) {
        alert(err);
    }
}

async function del(id) {
    try {
        await jsonRequest(`${constants.CURRENT}/${id}`, 'delete', undefined, true);
    } catch (err) {
        alert(err);
    }
}

async function login(loginUser) {
       return await jsonRequest(constants.LOGIN, 'Post', loginUser);
}

async function logout() {
    try {
        await jsonRequest(constants.LOGOUT, 'Get', undefined, true, true);
    } catch (err) {
        alert(err);
    }
}

async function register(newUser) {
    return await jsonRequest(constants.REGISTER, 'Post', newUser);
}

function cleanStorage() {
    localStorage.clear();
}

function isLoggedIn() {
    return localStorage.getItem('userToken') !== null &&
        localStorage.getItem('userToken') !== undefined;
}

function getUserEmail() {
    return localStorage.getItem('userEmail');
}

function getUserName() {
    return localStorage.getItem('username');
}

function getUserGender() {
    return localStorage.getItem('gender');
}

function getUserId() {
    return localStorage.getItem('userId');
}

function getAuthToken() {
    return localStorage.getItem('userToken');
}

function fillLocaleStorage(loginResult) {
    localStorage.setItem('userToken', loginResult.accessToken);
    localStorage.setItem('userId', loginResult._id);
    localStorage.setItem('userEmail', loginResult.email);
    localStorage.setItem('username', loginResult.username);
}

export default {
    // getters
    get,
    getOne,
    getMostRecent,
    getMy,

    // authentication
    login,
    register,
    logout,
    
    // delete
    del,

    //post
    post,
    postWithoutAuth,

    //put
    put,

    //filters
    filterByUserId,
    fillLocaleStorage,
    filterByYear,
    
    // helpers that do NOT use the server
    getUserName,
    getAuthToken,
    getUserId,
    getUserEmail,
    getUserGender,
    isLoggedIn,
    cleanStorage,
};