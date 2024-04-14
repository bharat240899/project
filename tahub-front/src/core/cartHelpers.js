export const addItem = (item=[] ,count=0 ,next=f =>f) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }
        cart.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
};

export const addWishList = (item,count=0,next=f =>f) => {
    let wishList = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishList')) {
            wishList = JSON.parse(localStorage.getItem('wishList'));
        }
        wishList.push({
            ...item,
            count: 1
        });

        // remove duplicates
        // build an Array from new Set and turn it back into array using Array.from
        // so that later we can re-map it
        // new set will only allow unique values in it
        // so pass the ids of each object/product
        // If the loop tries to add the same value again, it'll get ignored
        // ...with the array of ids we got on when first map() was used
        // run map() on it again and return the actual product from the cart

        wishList = Array.from(new Set(wishList.map(p => p._id))).map(id => {
            return wishList.find(p => p._id === id);
        });

        localStorage.setItem('wishList', JSON.stringify(wishList));
        next();
    }
};


export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length;
        }
    }
    return 0;
};

export const wishListTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishList')) {
            return JSON.parse(localStorage.getItem('wishList')).length;
        }
    }
    return 0;
};


export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'));
        }
    }
    return [];
};

export const getWishList = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishList')) {
            return JSON.parse(localStorage.getItem('wishList'));
        }
    }
    return [];
};

export const updateItem = (productId, count) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart[i].count = count;
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
};


export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
};

export const removewishListItem = productId => {
    let wishList = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('wishList')) {
            wishList = JSON.parse(localStorage.getItem('wishList'));
        }

        wishList.map((product, i) => {
            if (product._id === productId) {
                wishList.splice(i, 1);
            }
        });

        localStorage.setItem('wishList', JSON.stringify(wishList));
    }
    return wishList;
};