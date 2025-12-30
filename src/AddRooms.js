import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const AddRoomTypesAndRooms = () => {
  const [roomType, setRoomType] = useState("");
  const [rate, setRate] = useState("");
  const [gstPercent, setGstPercent] = useState("");
  const [acRate, setAcRate] = useState("");
  const [extraBedFee, setExtraBedFee] = useState("");
  const [remarks, setRemarks] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomType,
          rate,
          gstPercent,
          acRate,
          extraBedFee,
          remarks,
          noOfRooms,
        }),
      });

      if (!response.ok) throw new Error("Failed to Add Details");

      alert("Details added successfully!");
      setRoomType("");
      setRate("");
      setGstPercent("");
      setAcRate("");
      setExtraBedFee("");
      setRemarks("");
      setNoOfRooms("");
    } catch (error) {
      console.error(error);
      alert("Error adding details");
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
        minHeight: "32rem",
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
        Add Room Details
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
            onChange={(e) => {
              const value = e.target.value;
              if (value.length === 0) {
                setRoomType("");
              } else {
                setRoomType(value.charAt(0).toUpperCase() + value.slice(1));
              }
            }}
            required
          />
        </div>

        {/* BASE RATE */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Base Rate
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter rate"
            value={rate}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*\.?\d*$/.test(value)) {
                setRate(value);
              }
            }}
            required
          />
        </div>

        {/* GST % + AC RATE (SAME LINE) */}
        <div className="row mb-3 text-start">
          <div className="col-md-6">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              GST %
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="GST %"
              value={gstPercent}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setGstPercent(value);
                }
              }}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              AC Rent (if AC)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="AC rent"
              value={acRate}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setAcRate(value);
                }
              }}
            />
          </div>
        </div>

        {/* EXTRA BED + NO OF ROOMS (SAME LINE) */}
        <div className="row mb-3 text-start">
          <div className="col-md-6">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              Extra Bed Fee
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Extra bed fee"
              value={extraBedFee}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*\.?\d*$/.test(value)) {
                  setExtraBedFee(value);
                }
              }}
            />
          </div>

          <div className="col-md-6">
            <label className="form-label fw-bold" style={{ color: "#003366" }}>
              No Of Rooms
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Rooms count"
              value={noOfRooms}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) {
                  setNoOfRooms(value);
                }
              }}
              required
            />
          </div>
        </div>

        {/* REMARKS */}
        <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Remarks
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>

        {/* SUBMIT */}
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

export default AddRoomTypesAndRooms;
