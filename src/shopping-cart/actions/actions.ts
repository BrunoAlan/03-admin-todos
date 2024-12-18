'use client';

import { getCookie, hasCookie, setCookie } from 'cookies-next';

/*
Shopping Cart object
{
'uuid-1': 3,
'uuid-2': 1,
'uuid-3': 2
}
*/

export const getCookieCart = async (): Promise<{ [id: string]: number }> => {
    if (hasCookie('cart')) {
        const cookieCart = JSON.parse(
            ((await getCookie('cart')) as string) ?? '{}'
        );
        return cookieCart;
    }
    return {};
};

export const addProductToCart = async (id: string): Promise<void> => {
    const cookieCart = await getCookieCart();
    if (cookieCart[id]) {
        cookieCart[id] += 1;
    } else {
        cookieCart[id] = 1;
    }
    setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = async (id: string): Promise<void> => {
    const cookieCart = await getCookieCart();
    if (cookieCart[id]) delete cookieCart[id];
    setCookie('cart', JSON.stringify(cookieCart));
};
