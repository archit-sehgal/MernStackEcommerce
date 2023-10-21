import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Link, useNavigate } from "react-router-dom";
function AdminSignup() {
  const navigate = useNavigate();
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");

  const isLoginDisabled = adminId === "" || password === "";

  return (
    <div>
      <div className="admin_div flex">
        <div className="adminformcover flex">
          <TextField
            onChange={(e) => {
              setAdminId(e.target.value);
            }}
            id="adminId"
            label="Create Admin Id"
            variant="outlined"
            required
          />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            id="password"
            label="Create Admin Password"
            variant="outlined"
            required
          />
          <Button
            disabled={isLoginDisabled}
            variant="contained"
            onClick={() => {
              fetch("https://jerseystore.onrender.com/admin/signup", {
                method: "POST",
                body: JSON.stringify({
                  adminId: adminId,
                  password: password,
                }),
                headers: {
                  "content-type": "application/json",
                },
              }).then((res) => {
                res.json().then((data) => {
                  if (data.token) {
                    localStorage.setItem("token", data.token);
                    navigate("/admin/login");
                  }
                });
              });
            }}
          >
            Signup
          </Button>
        </div>
      </div>
    </div>
  );
}
export default AdminSignup;
