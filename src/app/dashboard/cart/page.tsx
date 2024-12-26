import { cookies } from 'next/headers';
import { ItemCard } from '@/shopping-cart';
import { products, type Product } from '@/products/data/products';

export const metadata = {
    title: 'Shopping Cart',
    description: 'Shopping Cart',
};

interface ProductInCart {
    product: Product;
    quantity: number;
}
const getProductsInCart = (cart: { [id: string]: number }) => {
    const productsInCart: ProductInCart[] = [];
    for (const id of Object.keys(cart)) {
        const product = products.find((prod) => prod.id === id);
        if (product) {
            productsInCart.push({ product, quantity: cart[id] });
        }
    }
    return productsInCart;
};

export default async function CartPage() {
    const cookiesStore = cookies();
    const cart = JSON.parse((await cookiesStore).get('cart')?.value ?? '{}');
    const productsInCart = getProductsInCart(cart);

    return (
        <div>
            <h1 className='text-5xl'>Products in cart</h1>
            <hr className='mb-2' />
            <div className='flex flex-col sm:flex-row gap-2 w-full'>
                <div className='flex flex-col gap-2 w-full sm:w-8/12'>
                    {productsInCart.map(({ product, quantity }) => (
                        <ItemCard
                            key={product.id}
                            product={product}
                            quantity={quantity}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
