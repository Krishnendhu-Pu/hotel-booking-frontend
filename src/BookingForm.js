import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // <-- this was missing
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [roomType, setRoomType] = useState("Deluxe");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate(); // <-- this is necessary

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName,
          roomType,
          bookingDate,
          status: "CONFIRMED",
        }),
      });
      if (!response.ok) throw new Error("Failed to create booking");
      const data = await response.json().catch(() => null);
      alert("Booking successful!");
      setCustomerName("");
      setRoomType("Deluxe");
      setBookingDate("");
    } catch (error) {
      console.error(error);
      alert("Error creating booking");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        minHeight: "100vh",
        minWidth: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        color: "white",
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.6)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      {/* Logout button - top right */}
      <button
        onClick={handleLogout}
        style={{
          position: "absolute",
          top: "30px",
          right: "40px",
          backgroundColor: "#003366",
          color: "white",
          fontWeight: "bold",
          borderRadius: "0.75rem",
          padding: "0.75rem 2rem",
          border: "none",
          fontSize: "1rem",
          boxShadow: "0 2px 8px rgba(0,50,100,0.12)",
          zIndex: 10
        }}
      >
        Logout
      </button>
      <div
        className="card p-5 shadow-lg text-center"
        style={{
          maxWidth: "500px",
          width: "100%",
          minHeight: "24rem",
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
            color: "#2d69a6ff",
            textShadow: "0 2px 8px #7FFFD4"
          }}
          className="mb-4"
        >
          Hotel Booking
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              Customer Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter customer name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              Room Type
            </label>
            <select
              className="form-select"
              value={roomType}
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option>Deluxe</option>
              <option>Suite</option>
            </select>
          </div>
          <div className="mb-3 text-start">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              Booking Date & Time
            </label>
            <input
              type="datetime-local"
              className="form-control"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
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
              boxShadow: "0 2px 8px rgba(0,50,100,0.13)"
            }}
            disabled={loading}
          >
            {loading ? "Booking..." : "Book Now"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
