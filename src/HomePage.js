import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          width: "28rem",          // bigger card
          minHeight: "18rem",      // make card taller
        }}
      >
        <h1
          className="mb-4 text-primary"  // blue color
          style={{ whiteSpace: "nowrap", fontSize: "1.8rem" }} // force single line
        >
          🏨 Hotel Booking System
        </h1>

        <div className="d-grid gap-3">
          <button
            onClick={() => navigate("/login")}
            className="btn btn-primary"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="btn btn-success"
          >
            Register
          </button>

          <button
            onClick={() => navigate("/forgot-password")}
            className="btn btn-link text-decoration-none"
         >
             Forgot Password?
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
