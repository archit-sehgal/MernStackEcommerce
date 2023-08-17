import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function NavComp() {
  const cartfetch = localStorage.getItem("cartCount");
  const isCartEmpty = cartfetch === "0";

  const [cartCount, setCartCount] = useState(0);
  const [adminId, setAdminId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.adminId) {
          setAdminId(data.adminId);
        }
      });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const storedCartCount = localStorage.getItem("cartCount");
      if (storedCartCount) {
        setCartCount(Number(storedCartCount));
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  if (adminId) {
    return (
      <div className="nav flex">
        <Button variant="contained" className="homebtnnav">
          <Link to={"/"}>Home</Link>
        </Button>
        <div className="rightNav flex">
          <a style={{ color: "whitesmoke" }}>{adminId}</a>
          <Button variant="contained">
            <Link
              to={"/admin/signup"}
              onClick={() => {
                localStorage.setItem("token", null);
                localStorage.setItem("cartCount", 0);
                localStorage.removeItem("cartData");
              }}
            >
              logout
            </Link>
          </Button>
          <Button variant="contained">
            <Link to={"/admin/products"}>Add Product</Link>
          </Button>
          <Button disabled={isCartEmpty} variant="contained">
            <Link className="linkcart" to={"/cart"}>
              <i className="fa-solid fa-cart-shopping"></i>
              <span>{cartCount}</span>
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="nav flex">
      <Button variant="contained" className="homebtnnav">
        <Link to={"/"}>Home</Link>
      </Button>
      <div className="rightNav flex">
        <Button variant="contained">
          <Link to={"/admin/signup"}>Admin Signup</Link>
        </Button>
        <Button variant="contained">
          <Link to={"/admin/login"}>Admin Login</Link>
        </Button>
        <Button disabled={isCartEmpty} variant="contained">
          <Link className="linkcart" to={"/cart"}>
            <i className="fa-solid fa-cart-shopping"></i>
            <span>{cartCount}</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default NavComp;
