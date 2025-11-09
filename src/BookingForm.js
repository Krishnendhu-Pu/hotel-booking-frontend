import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './Booking.css'; // optional, for custom styles

const BookingForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [roomType, setRoomType] = useState("Deluxe");
  const [bookingDate, setBookingDate] = useState("");
  const [loading, setLoading] = useState(false);

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

      // Optional: get JSON if backend returns a response
      const data = await response.json().catch(() => null);
      console.log("Booking created:", data);

      alert("Booking successful!");

      // Reset form fields
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

  return (
    <div className="container mt-5 p-4 shadow rounded bg-light" style={{ maxWidth: "500px" }}>
      <h2 className="text-primary text-center mb-4">Hotel Booking</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Customer Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter customer name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Room Type</label>
          <select
            className="form-select"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          >
            <option>Deluxe</option>
            <option>Suite</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Booking Date & Time</label>
          <input
            type="datetime-local"
            className="form-control"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
