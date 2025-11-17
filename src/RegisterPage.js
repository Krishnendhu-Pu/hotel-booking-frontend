import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch("http://localhost:8080/api/Auth/registration", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      if (response.ok) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        const errData = await response.json();
        setError(errData.error || "Registration failed");
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
          minHeight: "22rem",
          background: "rgba(255,255,255,0.10)",  // glassy translucent
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
          Register
        </h1>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleRegister}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>Username</label>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>Email ID</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              backgroundColor: "#30acbe",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.12rem",
              letterSpacing: "0.02em",
              boxShadow: "0 2px 8px rgba(30,172,190,0.11)"
            }}
          >
            Register
          </button>
        </form>
        <p className="text-center mt-3 mb-0">
          Already registered?{" "}
          <button
            onClick={() => navigate("/login")}
            className="btn btn-link p-0"
            style={{ color: "#003366", fontWeight: "bold" }}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
