import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const [crad, setCrad] = useState({ uemail: "", upass: "" });
  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setCrad({ ...crad, [e.target.name]: e.target.value });
  };

  let navigate = useNavigate();

  const handleClick = async (e) => {
    e.preventDefault();
    const lowercaseEmail = crad.uemail.toLowerCase();
    const response = await fetch(
      `https://car-management-u0su.onrender.com/api/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: lowercaseEmail, password: crad.upass }),
      }
    );

    const json = await response.json();
    if (json.success) {
      localStorage.setItem("token", json.authToken);
      setCrad({ uemail: "", upass: "" });

      navigate("/");
    } else {
      setMsg(json.result[0].msg);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Login</h4>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="uemail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="uemail"
                name="uemail"
                onChange={onChange}
                value={crad.uemail}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="upass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="upass"
                name="upass"
                onChange={onChange}
                value={crad.upass}
                required
              />
            </div>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            </div>
            <p className="text-center mt-3">
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
