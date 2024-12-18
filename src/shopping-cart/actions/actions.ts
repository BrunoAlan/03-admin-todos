'use client';

import { getCookie, hasCookie } from 'cookies-next';

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



