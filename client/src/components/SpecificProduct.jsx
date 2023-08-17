import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";

function SpecificProduct() {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [count, setCount] = useState(0);

  const updateCartData = (newCount) => {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const existingProduct = cartData.find((item) => item.id === id);
    if (existingProduct) {
      existingProduct.count = newCount;
    } else {
      cartData.push({ id:id, count: newCount,productName:product.productName,imageLink:product.imageLink,price:product.price});
    }
    localStorage.setItem("cartData", JSON.stringify(cartData));

    const totalCartCount = cartData.reduce((total, item) => total + item.count, 0);
    localStorage.setItem("cartCount", totalCartCount.toString());
  };

  useEffect(() => {
    fetch("http://localhost:3000/" + id, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProduct(data.findProduct);
      });
  }, [id]);

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartData")) || [];
    const productInCart = cartData.find((item) => item.id === id);
    if (productInCart) {
      setCount(productInCart.count);
    } else {
      setCount(0);
    }
  }, [id]);

  const AddCount = () => {
    const newCount = count + 1;
    setCount(newCount);
    updateCartData(newCount);
  };

  const subCount = () => {
    if (count > 0) {
      const newCount = count - 1;
      setCount(newCount);
      updateCartData(newCount);
    }
  };

  return (
    <div>
      <div className="specificProduct flex">
        <div className="sp flex">
          <div
            className="sp-img"
            style={{
              backgroundImage: `url(${product.imageLink})`,
              backgroundSize: "contain",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>

          <div className="sp-desc flex">
            <h2>{product.productName}</h2>
            <p>{product.desc}</p>
            <h3>{product.price}</h3>
            <div className="sp-btns flex">
              <Button variant="outlined">Buy Now</Button>
              <Button variant="contained" onClick={AddCount}>
                Add To Cart
              </Button>

              <span className="counter_sp">{count}</span>
              <Button
                className="subcount"
                variant="contained"
                onClick={subCount}
              >
                <i className="fa-solid fa-minus"></i>
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>Cart Count: {localStorage.getItem("cartCount")}</div>
    </div>
  );
}

export default SpecificProduct;
