import React, { useEffect, useState } from "react";

function CartComp() {
  const [cartCount, setCartCount] = useState("");
  const cartData = JSON.parse(localStorage.getItem("cartData"));
  console.log(cartData); // Log the entire cartData object

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCartCount = localStorage.getItem("cartCount");
      if (storedCartCount) {
        setCartCount(Number(storedCartCount));
      }
    }, 500);

    return () => {
      clearInterval(interval); // Clean up the interval on component unmount
    };
  }, []); // Empty dependency array to run the effect once when component mounts

  return (
    <div className="cartdiv">
      <h1>Cart value: {cartCount}</h1>
      {cartData.map((cd) => (
        <div key={cd.id}>
          {cd.count > 0 && (
            <div>
              {cd.id}: {cd.count}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default CartComp;
