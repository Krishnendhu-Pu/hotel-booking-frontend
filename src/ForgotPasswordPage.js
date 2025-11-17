import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
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
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          width: "28rem",
          minHeight: "17rem",
          background: "rgba(255,255,255,0.09)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          borderRadius: "2rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
          border: "1px solid rgba(255,255,255,0.09)"
        }}
      >
        <h1
          style={{
            whiteSpace: "nowrap",
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#003366",
            textShadow: "0 2px 8px #7FFFD4"  // aquamarine shadow for classy accent
          }}
          className="mb-4"
        >
          Forgot Password
        </h1>
        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label
                htmlFor="email"
                className="form-label fw-bold"
                style={{ color: "#003366", fontSize: "1.07rem" }}
              >
                Enter your email address
              </label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                boxShadow: "0 2px 8px rgba(0,50,100,0.10)"
              }}
            >
              Submit
            </button>
          </form>
        ) : (
          <div className="alert alert-success" role="alert">
            ✅ Check your email for reset instructions!
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
