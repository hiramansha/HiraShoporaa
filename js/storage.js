// ==========================================
// SHOPORA - STORAGE SYSTEM
// ==========================================


// ==========================================
// STORAGE KEYS
// ==========================================

const STORAGE_KEYS = {

    CART: "cart",

    ORDERS: "orders",

    CURRENT_USER: "shopora_current_user"

};


// ==========================================
// GET DATA
// ==========================================

function getData(key, defaultValue = []) {

    const data = localStorage.getItem(key);

    try {

        return data
            ? JSON.parse(data)
            : defaultValue;

    } catch (error) {

        console.error("Storage error:", error);

        return defaultValue;

    }

}


// ==========================================
// SAVE DATA
// ==========================================

function saveData(key, data) {

    localStorage.setItem(
        key,
        JSON.stringify(data)
    );

}


// ==========================================
// CART
// ==========================================

function getCart() {

    return getData(
        STORAGE_KEYS.CART,
        []
    );

}


function saveCart(cart) {

    saveData(
        STORAGE_KEYS.CART,
        cart
    );

}


// ==========================================
// ORDERS
// ==========================================

function getOrders() {

    return getData(
        STORAGE_KEYS.ORDERS,
        []
    );

}


function saveOrders(orders) {

    saveData(
        STORAGE_KEYS.ORDERS,
        orders
    );

}


// ==========================================
// CURRENT USER
// ==========================================

function getCurrentUser() {

    return getData(
        STORAGE_KEYS.CURRENT_USER,
        null
    );

}


function saveCurrentUser(user) {

    saveData(
        STORAGE_KEYS.CURRENT_USER,
        user
    );

}


function logoutUser() {

    localStorage.removeItem(
        STORAGE_KEYS.CURRENT_USER
    );

}


// ==========================================
// GENERATE ORDER ID
// ==========================================

function generateOrderId() {

    return "SHOPORA-" + Date.now();

}
