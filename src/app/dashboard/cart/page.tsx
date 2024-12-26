import { cookies } from 'next/headers';
import { ItemCard } from '@/shopping-cart';
import { products, type Product } from '@/products/data/products';
import { WidgetItem } from '@/components';

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

    const total = productsInCart.reduce(
        (acc, { product, quantity }) => acc + product.price * quantity,
        0
    );

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

                <div className='flex flex-col w-full sm:w-4/12'>
                    <WidgetItem title='Summary'>
                        <div className='mt-2 flex justify-center gap-4'>
                            <h3 className='text-3xl font-bold text-gray-700'>
                                $ {(total * 1.15).toFixed(2)}
                            </h3>
                        </div>
                        <span className='font-bold text-center text-gray-500'>
                            Taxes 15%: $ {(total * 0.15).toFixed(2)}
                        </span>
                    </WidgetItem>
                </div>
            </div>
        </div>
    );
}
