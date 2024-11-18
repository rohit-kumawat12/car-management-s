import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();

  const [crad, setCrad] = useState({
    sname: "",
    semail: "",
    spass: "",
    confirmPass: "",
  });

  const [msg, setMsg] = useState("");

  const onChange = (e) => {
    setCrad({ ...crad, [e.target.name]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (crad.spass === crad.confirmPass) {
      const lowercaseEmail = crad.semail.toLowerCase();
      const response = await fetch(
        `https://car-management-u0su.onrender.com/api/auth/newuser`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: crad.sname,
            email: lowercaseEmail,
            password: crad.spass,
          }),
        }
      );
      const json = await response.json();
      if (json.success) {
        setCrad({ sname: "", semail: "", spass: "", confirmPass: "" });
        localStorage.setItem("token", json.authToken);
        navigate("/");
      } else {
        setMsg(json.result[0].msg);
      }
    } else {
      setMsg("Password and Confirm Password must be the same");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-4">Sign Up</h4>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="sname" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                className="form-control"
                id="sname"
                name="sname"
                onChange={onChange}
                value={crad.sname}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="semail" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="semail"
                name="semail"
                onChange={onChange}
                value={crad.semail}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="spass" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="spass"
                name="spass"
                onChange={onChange}
                value={crad.spass}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="confirmPass" className="form-label">
                Confirm Password
              </label>
              <input
                type="password"
                className="form-control"
                id="confirmPass"
                name="confirmPass"
                onChange={onChange}
                value={crad.confirmPass}
                required
              />
            </div>
            {msg && <div className="alert alert-danger">{msg}</div>}
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Sign Up
              </button>
            </div>
            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
