import { useCart as useCartContext } from '../context/CartContext';

export const useCart = () => {
  const cart = useCartContext();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  return {
    ...cart,
    formattedTotal: formatPrice(cart.cartTotal),
    isEmpty: cart.items.length === 0,
    itemCount: cart.cartCount,
  };
}; 