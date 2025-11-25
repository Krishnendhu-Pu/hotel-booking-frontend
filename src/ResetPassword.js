import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post("http://localhost:8080/api/Auth/reset-password", {
        email,
        newPassword
      });
      setMessage("Password updated successfully!");
      setTimeout(() => {
        navigate("/login");
      }, 1600);
    } catch (err) {
      setMessage("Error resetting password");
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
        justifyContent: "center",
      }}
    >
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          width: "28rem",
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold"
          style={{
            color: "rgb(0,50,100)",
          }}
        >
          Reset Password
        </h2>

        <form onSubmit={handleReset}>
          <div className="mb-3 text-start">
            <label
              htmlFor="newPassword"
              className="form-label fw-bold"
              style={{ color: "rgb(0,50,100)", fontSize: "1.07rem" }}
            >
              Enter new password
            </label>
            <input
              type="password"
              id="newPassword"
              className="form-control"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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
              boxShadow: "0 2px 8px rgba(0,50,100,0.10)",
            }}
          >
            Submit
          </button>
        </form>

        {message && (
          <div
            className={`alert ${message.includes("successfully") ? "alert-success" : "alert-danger"} mt-4 text-center`}
            role="alert"
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
