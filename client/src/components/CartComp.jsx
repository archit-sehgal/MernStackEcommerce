import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function CartComp() {
  const [cartData, setCartData] = useState(
    JSON.parse(localStorage.getItem("cartData")) || []
  );
  const [cartCount, setCartCount] = useState(0);

  const updateCartData = (newCartData) => {
    setCartData(newCartData);
    localStorage.setItem("cartData", JSON.stringify(newCartData));
  };

  const handleDeleteAll = () => {
    // Clear cart data and count from localStorage
    localStorage.removeItem("cartData");
    localStorage.removeItem("cartCount");
    window.location="/"
    // Update component state to reflect changes
    setCartData([]);
    setCartCount(0);
  };

  let totalcartValue = 0;
  cartData.forEach((cd) => {
    totalcartValue += cd.price * cd.count;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCartCount = localStorage.getItem("cartCount");
      if (storedCartCount) {
        setCartCount(Number(storedCartCount));
      }
    }, 500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="cartsection flex">
      <div className="cartcont flex">
        <h1>Product details:</h1>
        {cartData.map((cd) => (
          <div className=" cartpr flex" key={cd.id}>
            <Link
              to={`/${cd.id}`}
              className="cartimage"
              style={{
                background: `url(${cd.imageLink})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            ></Link>
            <div className=" pp-pn-pc flex">
              <div className="pn-pp flex">
                <span>{cd.productName}</span>
                <p>{cd.price}/-</p>
                <span className="totalamtc">
                  Total Amount : {cd.price * cd.count}/-
                </span>
              </div>
              <div className="qty flex">
                <p>Qty.{cd.count}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="right-cart flex">
        <div className="cart-box-rght flex">
          <div className="cartb-r-in flex">
            <h2>Cart details:</h2>
            <div className="totalAmt flex">
              <p>your total purchase value:</p>
              <span>{totalcartValue}/-</span>
            </div>
            <div className="cancelorder flex">
            <p>Proceed with order.</p>
            <Button variant="contained">Proceed</Button>
              <p>or click below to cancel the order.</p>
              <Button variant="contained" onClick={handleDeleteAll}>
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartComp;
