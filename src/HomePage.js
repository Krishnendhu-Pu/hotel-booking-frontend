import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

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
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          width: "28rem",
          minHeight: "18rem",
          background: "rgba(255,255,255,0.10)", // super transparent
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31,38,135,0.10)",
          border: "1px solid rgba(255,255,255,0.08)"
        }}
      >
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
           AA RESIDENCY
        </h1>
        <div className="d-grid gap-3">
          <button
            onClick={() => navigate("/login")}
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
            onClick={() => navigate("/register")}
            className="btn w-100"
            style={{
              backgroundColor: "#30acbe",
              color: "white",
              border: "none",
              fontWeight: "bold",
              fontSize: "1.12rem",
              letterSpacing: "0.02em",
              boxShadow: "0 2px 8px rgba(30,172,190,0.08)"
            }}
          >
            Register
          </button>
          
        </div>
      </div>
    </div>
  );
}

export default HomePage;
