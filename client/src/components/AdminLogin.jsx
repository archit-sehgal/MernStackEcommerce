import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
function AdminLogin() {
  return (
    <div>
      <Form />
    </div>
  );
}

function Form() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const isLoginDisabled = adminId === "" || password === "";

  return (
    <div className="admin_div flex">
      <div className="adminformcover flex">
        <TextField
          onChange={(e) => setAdminId(e.target.value)}
          id="adminId"
          label="Enter Admin Id"
          variant="outlined"
          required
        />

        <TextField
          onChange={(e) => setPassword(e.target.value)}
          id="password"
          label="Enter Admin Password"
          variant="outlined"
          required
        />

        <Button
          disabled={isLoginDisabled}
          variant="contained"
          onClick={() => {
            fetch("http://localhost:3000/admin/login", {
              method: "POST",
              body: JSON.stringify({
                adminId: adminId,
                password: password,
              }),
              headers: {
                "content-type": "application/json",
                authorization: "bearer " + localStorage.getItem("token"),
              },
            }).then((res) => {
              res.json().then((data) => {
                if (data.token) {
                  // Navigate to the admin login page using navigate
                  localStorage.setItem("token", data.token);
                  window.location = "/admin/products";
                }
              });
            });
          }}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
export default AdminLogin;
