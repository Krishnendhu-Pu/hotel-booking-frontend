import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomTypes = () => {
  const [roomType, setRoomType] = useState("");
  const [Rate, setRate] = useState("");
  const [Remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(false); // ✅ FIXED (added missing loading state)

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/RoomTypes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType,
          Rate,
          Remarks,
        }),
      });

      if (!response.ok) throw new Error("Failed to Add Rooms");

      alert("Room added successfully!");
      setRoomType("");
      setRate("");
    } catch (error) {
      console.error(error);
      alert("Error adding Rooms");
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
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <h1
        style={{
          whiteSpace: "nowrap",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#003366a8",
          textShadow: "0 2px 8px #7FFFD4",
        }}
        className="mb-4"
      >
        Add Room Types
      </h1>

      <form onSubmit={handleSubmit}>
        {/* ROOM TYPE */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Room Type
          </label>
         <input
            type="text"
            className="form-control"
            placeholder="Enter room type"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          />
        </div>
        <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Rate
          </label>
          <input
    type="text"
    className="form-control"
    placeholder="Enter rate"
    value={Rate}
    onChange={(e) => {
      const value = e.target.value;

      // Allows numbers like: 100, 100.50, 0.99, .99
      if (/^\d*\.?\d*$/.test(value)) {
        setRate(value);
      }
    }}
    required
  />
  </div>
  <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Remarks
          </label>
         <input
            type="text"
            className="form-control"
            placeholder="Enter remarks "
            value={Remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* SUBMIT BUTTON */}
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
            boxShadow: "0 2px 8px rgba(0,50,100,0.13)",
          }}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
};

export default RoomTypes;
