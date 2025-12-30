import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* 🎨 COLOR PALETTE */
const labelColor = "#b7c9f2";
const inputTextColor = "#e6ecff";
const placeholderColor = "#9fb3e0";

/* GLOBAL TEXT STYLE (LABELS & HEADERS) */
const textStyle = {
  whiteSpace: "nowrap",
  color: labelColor,
  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
  fontWeight: "600",
};

/* GLASS INPUT STYLE (TABLE) */
const glassInput = {
  background: "rgba(169, 155, 246, 0.09)",
  backdropFilter: "blur(20px)",
  borderRadius: "2rem",
  border: "1px solid rgba(255,255,255,0.12)",
  color: inputTextColor,
  width: "100%",
  padding: "0.375rem 0.75rem",
};

/* NORMAL INPUT STYLE */
const fieldStyle = {
  background: "rgba(255,255,255,0.09)",
  backdropFilter: "blur(20px)",
  borderRadius: "2rem",
  border: "1px solid rgba(255,255,255,0.12)",
  color: inputTextColor,
  width: "100%",
  padding: "0.375rem 0.75rem",
};

/* PLACEHOLDER STYLE */
const inputPlaceholderStyle = `
  ::placeholder { color: ${placeholderColor}; opacity: 0.8; }
  select option { background: rgba(20, 30, 60, 0.95); color: ${inputTextColor}; }
`;

const BookingForm = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  /* STATES */
  const [customerName, setCustomerName] = useState("");
  const [pax, setPax] = useState("");
  const [mobile, setMobile] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [gstAmount, setGstAmount] = useState(0);

  const [roomList, setRoomList] = useState([]);
  const [rooms, setRooms] = useState([
    { roomType: "", noOfRooms: 1, extraBed: 0, ac: true, rate: 0, gstPercent: 0, acRate: 0, extraBedFee: 0 },
  ]);

  const [advance, setAdvance] = useState("");
  const [advanceMode, setAdvanceMode] = useState("");
  const [kitchenRent, setKitchenRent] = useState("");
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);

  /* FETCH ROOMS FROM API */
  useEffect(() => {
    fetch("http://localhost:8080/api/bookings/roomslist")
      .then((res) => res.json())
      .then((data) => setRoomList(data));
  }, []);

  /* CALCULATE TOTAL BASED ON ROOMS, AC, EXTRA BED, GST, AND DATES */
  useEffect(() => {
    let roomTotal = 0;

    let nights = 1;
    if (checkIn && checkOut) {
      const inDate = new Date(checkIn);
      const outDate = new Date(checkOut);
      const diffTime = outDate - inDate;
      nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (nights < 1) nights = 1;
    }

    rooms.forEach((r) => {
      let effectiveRate = r.rate;

      // If AC selected, add AC rate
      if (r.ac && r.acRate) {
        effectiveRate += r.acRate;
      }

      roomTotal += effectiveRate * r.noOfRooms * nights;

      // Extra bed charge
      if (r.extraBedFee) {
        roomTotal += r.extraBed * r.extraBedFee * nights;
      }
    });

    let t = roomTotal + Number(kitchenRent || 0) - Number(discount || 0);

    let gstVal = 0;
    if (gst) {
      // Calculate GST per room
      rooms.forEach((r) => {
        const rateWithAc = r.rate + (r.ac && r.acRate ? r.acRate : 0);
        gstVal += rateWithAc * r.noOfRooms * (r.gstPercent || 0) / 100 * nights;
        if (r.extraBedFee) {
          gstVal += r.extraBed * r.extraBedFee * (r.gstPercent || 0) / 100 * nights;
        }
      });
      t += gstVal;
    }

    setGstAmount(gstVal);
    setTotal(t);
    setBalance(t - Number(advance || 0));
  }, [rooms, kitchenRent, discount, gst, advance, checkIn, checkOut]);

  const addRoomRow = () => {
    setRooms([
      ...rooms,
      { roomType: "", noOfRooms: 1, extraBed: 0, ac: true, rate: 0, gstPercent: 0, acRate: 0, extraBedFee: 0 },
    ]);
  };

  const removeRoomRow = () => {
    if (rooms.length > 1) setRooms(rooms.slice(0, -1));
  };

  /* UPDATE ROOM DETAILS AND FETCH EXTRA INFO FROM ROOM LIST */
  const updateRoom = (i, key, value) => {
    const updated = [...rooms];
    updated[i][key] = value;

    if (key === "roomType") {
      if (value === "") {
        updated[i].rate = 0;
        updated[i].gstPercent = 0;
        updated[i].acRate = 0;
        updated[i].extraBedFee = 0;
      } else {
        const selected = roomList.find((r) => r.roomType === value);
        if (selected) {
          updated[i].rate = selected.rate || 0;
          updated[i].gstPercent = selected.gstPercent || 0;
          updated[i].acRate = selected.acRate || 0;
          updated[i].extraBedFee = selected.extraBedFee || 0;
        }
      }
    }

    setRooms(updated);
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", padding: "1rem" }}>
      <style>{inputPlaceholderStyle}</style>
      <form className="container-fluid">
        {/* === Guest Details === */}
        <h4 style={textStyle}>Guest Details</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label style={textStyle}>Name</label>
            <input
              style={fieldStyle}
              className="form-control"
              placeholder="Enter Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label style={textStyle}>Pax</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="number"
              placeholder="Enter Pax"
              value={pax}
              onChange={(e) => setPax(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-6">
            <label style={textStyle}>Mobile</label>
            <input
              style={fieldStyle}
              className="form-control"
              placeholder="Enter Mobile"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label style={textStyle}>Check-In</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="datetime-local"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label style={textStyle}>Check-Out</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="datetime-local"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
            />
          </div>
        </div>

        {/* === Room Details === */}
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4 style={textStyle}>Room Details</h4>
          <div>
            <button type="button" className="btn btn-sm btn-success me-2" onClick={addRoomRow}>+</button>
            <button type="button" className="btn btn-sm btn-danger" onClick={removeRoomRow} disabled={rooms.length === 1}>−</button>
          </div>
        </div>

        <div className="table-responsive mb-4">
          <table style={{ width: "100%", marginTop: "1rem" }}>
            <thead>
              <tr style={{ background: "#003366", color: "white" }}>
                <th>Room Type</th>
                <th>No Of Rooms</th>
                <th>Extra Bed</th>
                <th style={{ paddingRight: "2rem" }}>AC</th>
                <th>Rate</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((r, i) => (
                <tr key={i} style={{ color: "#003366" }}>
                  <td>
                    <select
                      className="form-select"
                      style={glassInput}
                      value={r.roomType}
                      onChange={(e) => updateRoom(i, "roomType", e.target.value)}
                    >
                      <option value="">Select</option>
                      {roomList.map((rt) => (
                        <option key={rt.id} value={rt.roomType}>{rt.roomType}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={glassInput}
                      value={r.noOfRooms}
                      onChange={(e) => updateRoom(i, "noOfRooms", +e.target.value)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={glassInput}
                      value={r.extraBed}
                      onChange={(e) => updateRoom(i, "extraBed", +e.target.value)}
                    />
                  </td>
                  <td className="text-center" style={{ paddingRight: "2rem" }}>
                    <input
                      type="checkbox"
                      checked={r.ac}
                      onChange={(e) => updateRoom(i, "ac", e.target.checked)}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      style={glassInput}
                      value={r.rate + (r.ac && r.acRate ? r.acRate : 0)}
                      disabled
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* === Payments === */}
        <h4 style={textStyle}>Payments</h4>
        <div className="row mb-3">
          <div className="col-md-6">
            <label style={textStyle}>Advance</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="numeric"
              value={advance}
              placeholder="Enter Advance"
              onChange={(e) => setAdvance(+e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label style={textStyle}>Advance Mode</label>
            <input
              style={fieldStyle}
              className="form-control"
              value={advanceMode}
              placeholder="Enter Mode"
              onChange={(e) => setAdvanceMode(e.target.value)}
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label style={textStyle}>Kitchen Rent</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="numeric"
              value={kitchenRent}
              placeholder="Enter Kitchen Rent"
              onChange={(e) => setKitchenRent(+e.target.value)}
            />
          </div>
          <div className="col-md-6">
            <label style={textStyle}>Discount</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="numeric"
              value={discount}
              placeholder="Enter Discount"
              onChange={(e) => setDiscount(+e.target.value)}
            />
          </div>
        </div>

        {/* GST Checkbox */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={gst}
                onChange={(e) => setGst(e.target.checked)}
              />
              <label style={textStyle} className="form-check-label">GST</label>
            </div>
          </div>
          <div className="col-md-3">
            <label style={textStyle}>GST Amount</label>
            <input
              style={fieldStyle}
              className="form-control"
              value={gst ? gstAmount.toFixed(2) : ""}
              disabled
            />
          </div>
        </div>

        <label style={textStyle}>Remarks</label>
        <textarea
          style={fieldStyle}
          className="form-control mb-3"
          value={remarks}
          placeholder="Enter Remarks"
          onChange={(e) => setRemarks(e.target.value)}
        />

        <h5 style={textStyle}>Total: ₹{total}</h5>
        <h5 style={textStyle}>Balance: ₹{balance}</h5>

        <button className="btn btn-primary mt-3">Save Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
