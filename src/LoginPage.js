import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/Auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userName, password }),
      });
      if (response.ok) {
        const data = await response.json();
        
        localStorage.setItem("token", data.token);
        localStorage.setItem("username", userName);
        navigate("/Home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        minHeight: "100vh",
        minWidth: "100vw",
        color: "white",
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.6)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <div className="card p-5 shadow-lg text-center"
        style={{
          width: "28rem",
          minHeight: "20rem",
          background: "rgba(255,255,255,0.10)",  // glassy
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          border: "1px solid rgba(255,255,255,0.08)"
        }}>
        <h1
          style={{
            whiteSpace: "nowrap",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#003366",
            textShadow: "0 2px 8px #7FFFD4"
          }}
          className="mb-4"
        >
          Login
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleLogin}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="btn w-100"
            style={{
              backgroundColor: "rgb(0,50,100)",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.12rem",
              letterSpacing: "0.02em",
              boxShadow: "0 2px 8px rgba(0,50,100,0.12)"
            }}
          >
            Login
          </button>
          <button
            onClick={() => navigate("/forgot-password")}
            className="btn btn-link text-decoration-none w-100"
            style={{
              color: "rgb(0,50,100)",
              fontWeight: "bold",
              fontSize: "1.04rem"
            }}
          >
            Forgot Password?
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Not registered?{" "}
          <button
            onClick={() => navigate("/register")}
            className="btn btn-link p-0"
            style={{ color: "#003366", fontWeight: "bold" }}
          >
            Create an account
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
