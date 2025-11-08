import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProducts, updateCart } from '../redux/features/slice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items: products, cart: cartItems, loading } = useSelector(state => state.products);

  useEffect(() => {
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      dispatch(updateCart(JSON.parse(cartData)));
    }
    dispatch(fetchProducts());
  }, [dispatch]);

  const calculateTotal = () => {
    return products
      .filter(product => cartItems[product.title])
      .reduce((total, product) => {
        return total + (product.price * cartItems[product.title]);
      }, 0);
  };

  const handleUpdateCart = (item, action) => {
    const updatedCart = { ...cartItems };
    
    if (action === 'add') {
      updatedCart[item] = (updatedCart[item] || 0) + 1;
    } else if (action === 'remove' && updatedCart[item] > 0) {
      updatedCart[item] = updatedCart[item] - 1;
      if (updatedCart[item] === 0) {
        delete updatedCart[item];
      }
    }

    dispatch(updateCart(updatedCart));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-3 sm:px-4 py-8">
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  const cartProducts = products.filter(product => cartItems[product.title]);

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center"
        >
          Continue Shopping
        </Link>
      </div>

      {cartProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cartProducts.map(product => (
              <div key={product.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-4 border rounded-lg bg-white shadow-sm">
                <img 
                  src={product.image} 
                  alt={product.title} 
                  className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg"
                />
                <div className="flex-grow w-full sm:w-auto">
                  <h2 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">{product.title}</h2>
                  <p className="text-gray-600 text-sm sm:text-base mb-3 sm:mb-0">₹{product.price}</p>
                </div>
                <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <button 
                      onClick={() => handleUpdateCart(product.title, 'remove')}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-lg font-bold min-w-[40px] sm:min-w-[44px] transition duration-300"
                    >
                      -
                    </button>
                    <span className="text-base sm:text-lg font-semibold min-w-[30px] text-center">{cartItems[product.title]}</span>
                    <button 
                      onClick={() => handleUpdateCart(product.title, 'add')}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-lg font-bold min-w-[40px] sm:min-w-[44px] transition duration-300"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right sm:text-left">
                    <p className="text-sm text-gray-500 sm:hidden">Subtotal</p>
                    <p className="text-base sm:text-lg font-semibold">₹{(product.price * cartItems[product.title]).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 sm:mt-8 p-4 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-lg sm:text-xl font-semibold">Total:</span>
              <p className="text-xl sm:text-2xl font-bold text-blue-600">₹{calculateTotal().toFixed(2)}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;