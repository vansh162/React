// steps to create json server:
// 1. install json by npm i json-server
// 2. create a file name db.json
// 3. add this in package.json in script part. "json-server(name the server)": "json-server --watch db.json --port 3004"
// 4. npm run json-server(this name should same as above name)

import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [data, setData] = useState([]);
  const [ogData, setOgData] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const cartData = localStorage.getItem("Cart");
    if (cartData) {
      setCartItems(JSON.parse(cartData));
    }
  }, []);
  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios.get("http://localhost:3004/product").then((res) => {
      setData(res.data);
      setOgData(res.data);
    });
  }

  function handlesort() {
    let sortHandle = data.sort((a, b) => a.price - b.price);
    setData([...sortHandle]);
  }

  function handlesort2() {
    let sortHandle = data.sort((a, b) => b.price - a.price);
    setData([...sortHandle]);
  }

  function handleFilter(value) {
    if (value === "all") {
      setData(ogData);
    } else {
      const filterMap = {
        "men's": (item) => item.category === "Men's Shirt" || item.category === "Men's T-Shirt",
        "women's": (item) => item.category === "Women's T-Shirt",
        "sneakers": (item) => item.category === "Sneakers"
      };
      
      if (filterMap[value]) {
        const filterData = ogData.filter(filterMap[value]);
        setData(filterData);
      }
    }
  }

  function handleSearch(query) {
    setSearchQuery(query);
    if (!query.trim()) {
      setData(ogData);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filteredData = ogData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm)
    );
    setData(filteredData);
  }

  function updateCart(item, action) {
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
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col sm:flex-row gap-4 mb-8 items-center justify-center">
          <div className="relative w-full sm:w-96">
            <input
              type="text"
              placeholder="Search products or categories..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            )}
          </div>
          <button 
            onClick={handlesort}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            Low to High
          </button>
          <button 
            onClick={handlesort2}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
          >
            High to Low
          </button>
          <select 
            onChange={(e) => handleFilter(e.target.value)}
            className="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
          >
            <option defaultValue={""}>Select Category</option>
            <option value="all">All</option>
            <option value="men's">Men's Wear</option>
            <option value="women's">Women's Wear</option>
            <option value="sneakers">Sneakers</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data && data.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
              <div className="relative overflow-hidden aspect-w-1 aspect-h-1">
                <img
                  src={item.image}
                  className="w-full h-full object-cover transition duration-300 ease-in-out hover:scale-110"
                  alt={item.title}
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.category}</p>
                <p className="text-sm text-gray-700 mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-600">₹{item.price}</span>
                  <div className="flex items-center space-x-2">
                    {cartItems[item.title] ? (
                      <div className="flex items-center bg-gray-100 rounded-lg">
                        <button 
                          onClick={() => updateCart(item.title, 'remove')}
                          className="px-3 py-1 text-blue-600 hover:text-blue-800 font-bold text-lg"
                        >
                          -
                        </button>
                        <span className="px-3 py-1 font-semibold">{cartItems[item.title]}</span>
                        <button 
                          onClick={() => updateCart(item.title, 'add')}
                          className="px-3 py-1 text-blue-600 hover:text-blue-800 font-bold text-lg"
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => updateCart(item.title, 'add')}
                        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded transition duration-300"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
