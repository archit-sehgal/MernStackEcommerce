import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
function HomeComp() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://jerseystore.onrender.com/", {
      methop: "GET",
      headers: {
        "content-type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        setProducts(data);
      });
    });
    setInterval(() => {
      fetch("https://jerseystore.onrender.com/", {
        methop: "GET",
        headers: {
          "content-type": "application/json",
        },
      }).then((res) => {
        res.json().then((data) => {
          setProducts(data);
        });
      });
    }, 1000);
  }, []);

  return (
    <div className="Productsection flex">
      <h1>Our bestSellers Today</h1>
      <div className="productContainer flex">
        {products.map((p) => (
          <div className="singleproduct flex">
            <Link
              to={`/${p.id}`}
              className="productimage"
              style={{
                background: `url(${p.imageLink})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Link>
            <div className="productdesc flex">
              <span>{p.productName}</span>
              <p>{p.price}/-</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default HomeComp;
