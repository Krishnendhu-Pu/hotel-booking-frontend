import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const BookingForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ room types list (only strings)
  const [roomTypes, setRoomTypes] = useState([]);

  // ✅ fetch full room list but extract ONLY roomType
  useEffect(() => {
    fetch("http://localhost:8080/api/bookings/roomslist")
      .then((res) => res.json())
      .then((data) => {
        // extract roomType only
        const types = data.map((room) => room.roomType);
        setRoomTypes(types);
      })
      .catch((err) => console.error("Error fetching room types", err));
  }, []);

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

      alert("Booking successful!");
      setCustomerName("");
      setRoomType("");
      setBookingDate("");
    } catch (error) {
      console.error(error);
      alert("Error creating booking");
    } finally {
      setLoading(false);
    }
  };

  return (
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
          color: "#003366a8",
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
            required
          >
            <option value="">Select room type</option>

            {/* ✅ display only roomType */}
            {roomTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
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
  );
};

export default BookingForm;
