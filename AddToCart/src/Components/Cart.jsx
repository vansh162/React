import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Cart = () => {
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }

    axios.get("http://localhost:3004/product").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  const calculateTotal = () => {
    return products
      .filter(product => cartItems[product.title])
      .reduce((total, product) => {
        return total + (product.price * cartItems[product.title]);
      }, 0);
  };

  const updateCart = (item, action) => {
    const updatedCart = { ...cartItems };
    
    if (action === 'add') {
      updatedCart[item] = (updatedCart[item] || 0) + 1;
    } else if (action === 'remove' && updatedCart[item] > 0) {
      updatedCart[item] = updatedCart[item] - 1;
      if (updatedCart[item] === 0) {
        delete updatedCart[item];
      }
    }

    localStorage.setItem("Cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Continue Shopping
        </Link>
      </div>
      
      {Object.keys(cartItems).length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Start Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {products
              .filter(product => cartItems[product.title])
              .map(product => (
                <div key={product.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
                  <img 
                    src={product.image} 
                    alt={product.title} 
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-grow">
                    <h3 className="font-semibold text-lg">{product.title}</h3>
                    <p className="text-gray-600 text-sm">{product.category}</p>
                    <p className="text-gray-700 mt-1">₹{product.price}</p>
                  </div>
                  <div className="flex items-center bg-gray-100 rounded-lg">
                    <button 
                      onClick={() => updateCart(product.title, 'remove')}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 font-bold text-lg"
                    >
                      -
                    </button>
                    <span className="px-3 py-1 font-semibold">{cartItems[product.title]}</span>
                    <button 
                      onClick={() => updateCart(product.title, 'add')}
                      className="px-3 py-1 text-blue-600 hover:text-blue-800 font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="font-semibold">₹{(product.price * cartItems[product.title]).toFixed(2)}</p>
                  </div>
                </div>
              ))
            }
          </div>
          
          <div className="mt-8 border-t pt-6">
            <div className="flex justify-between items-center text-xl font-bold">
              <span>Total:</span>
              <span>₹{calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default Cart