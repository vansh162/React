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
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
        <Link 
          to="/" 
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 flex items-center gap-2"
        >
          Continue Shopping
        </Link>
      </div>

      {products.filter(product => cartItems[product.title]).map(product => (
        <div key={product.id} className="flex items-center mb-4 p-4 border rounded-lg">
          <img src={product.image} alt={product.title} className="w-24 h-24 object-cover rounded-lg" />
          <div className="ml-4 flex-grow">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-600">₹{product.price}</p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => handleUpdateCart(product.title, 'remove')}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              -
            </button>
            <span>{cartItems[product.title]}</span>
            <button 
              onClick={() => handleUpdateCart(product.title, 'add')}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              +
            </button>
          </div>
        </div>
      ))}

      <div className="mt-8 text-right">
        <p className="text-xl font-bold">Total: ₹{calculateTotal().toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;