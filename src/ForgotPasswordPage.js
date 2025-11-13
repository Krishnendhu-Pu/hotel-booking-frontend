import React, { useState } from "react";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would normally call an API to send reset email
      setSubmitted(true);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card p-5 shadow-lg text-center" style={{ width: "28rem" }}>
        <h2 className="mb-4 text-primary">Forgot Password</h2>

        {!submitted ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label htmlFor="email" className="form-label">
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
            <button type="submit" className="btn btn-primary w-100">
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
