import { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
function AdminProduct() {
  return (
    <div>
      <Form />
    </div>
  );
}
function Form() {
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [imageLink, setimageLink] = useState("");
  const navigate = useNavigate();
  const isLoginDisabled =
    productName === "" || desc === "" || price === "" || imageLink === "";
  return (
    <div className="admin_div productdiv flex">
      <div className="adminformcover flex">
        <TextField
          onChange={(e) => setProductName(e.target.value)}
          id="productName"
          label="Enter product Name"
          variant="outlined"
          required
        />

        <TextField
          onChange={(e) => setDesc(e.target.value)}
          id="desc"
          label="Enter Product description"
          variant="outlined"
          required
        />
        <TextField
          onChange={(e) => setPrice(e.target.value)}
          id="Price"
          label="Enter Product Price"
          variant="outlined"
          required
        />
        <TextField
          onChange={(e) => setimageLink(e.target.value)}
          id="imageLink"
          label="Drop Image Link"
          variant="outlined"
          required
        />

        <Button
          disabled={isLoginDisabled}
          variant="contained"
          onClick={() => {
            fetch("https://jerseystore.onrender.com/admin/products", {
              method: "POST",
              body: JSON.stringify({
                productName: productName,
                desc: desc,
                price: price,
                imageLink: imageLink,
              }),
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + localStorage.getItem("token"),
              },
            }).then((res) => {
              res.json().then((data) => {
                console.log(data);
                navigate("/");
              });
            });
          }}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
}
export default AdminProduct;
