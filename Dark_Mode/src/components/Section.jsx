import React, { useEffect, useState } from "react";
import "./Section.css";

const Section = ({ theme }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  if (loading == true) {
    return <p className="loding">Loading.....</p>;
  }
  return (
    <>
      <div
        className="main"
        style={{ backgroundColor: theme == "light" ? "white" : "black" }}
      >
        {data.map((data) => (
          <div
            key={data.id}
            className="cards"
            style={{
              backgroundColor: theme == "light" ? "white" : "red",
              color: theme == "light" ? "black" : "white",
            }}
          >
            <img className="pImg" src={data.image} alt="" />
            <p>{data.title}</p>
            <p>Price: ${data.price}</p>
            <p>Category: {data.category}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Section;
