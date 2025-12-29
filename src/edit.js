import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

/* 🎨 COLOR PALETTE */
const labelColor = "#b7c9f2";
const inputTextColor = "#e6ecff";
const placeholderColor = "#9fb3e0";

/* GLOBAL TEXT STYLE */
const textStyle = {
  whiteSpace: "nowrap",
  color: labelColor,
  textShadow: "0 1px 6px rgba(0,0,0,0.4)",
  fontWeight: "600",
};

/* GLASS INPUT STYLE */
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

/* PLACEHOLDER + SELECT OPTION STYLE */
const inputPlaceholderStyle = `
  ::placeholder {
    color: ${placeholderColor};
    opacity: 0.8;
  }

  select option {
    background: rgba(20, 30, 60, 0.95);
    color: ${inputTextColor};
  }
`;

const BookingForm = () => {
  useEffect(() => window.scrollTo(0, 0), []);

  /* STATES */
  const [customerName, setCustomerName] = useState("");
  const [pax, setPax] = useState("");
  const [mobile, setMobile] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");

  const [roomList, setRoomList] = useState([]);
  const [rooms, setRooms] = useState([
    { roomType: "", noOfRooms: 1, extraBed: 0, ac: true, rate: 0 },
  ]);

  const [advance, setAdvance] = useState("");
  const [advanceMode, setAdvanceMode] = useState("");
  const [kitchenRent, setKitchenRent] = useState("");
  const [discount, setDiscount] = useState("");
  const [gst, setGst] = useState(false);
  const [remarks, setRemarks] = useState("");

  const [total, setTotal] = useState(0);
  const [balance, setBalance] = useState(0);
  const [gstAmount, setGstAmount] = useState(0);

  /* FETCH ROOMS */
  useEffect(() => {
    fetch("http://localhost:8080/api/bookings/roomslist")
      .then((res) => res.json())
      .then((data) => setRoomList(data));
  }, []);

  /* CALCULATE TOTAL */
  useEffect(() => {
    let roomTotal = 0;
    let nights = 1;

    if (checkIn && checkOut) {
      const diff = new Date(checkOut) - new Date(checkIn);
      nights = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if (nights < 1) nights = 1;
    }

    rooms.forEach((r) => {
      roomTotal += r.rate * r.noOfRooms * nights;
      roomTotal += r.extraBed * 500 * nights;
    });

    let base =
      roomTotal +
      Number(kitchenRent || 0) -
      Number(discount || 0);

    const gstVal = gst ? base * 0.12 : 0;

    setGstAmount(gstVal);
    setTotal(base + gstVal);
    setBalance(base + gstVal - Number(advance || 0));
  }, [rooms, kitchenRent, discount, gst, advance, checkIn, checkOut]);

  const addRoomRow = () => {
    setRooms([
      ...rooms,
      { roomType: "", noOfRooms: 1, extraBed: 0, ac: true, rate: 0 },
    ]);
  };

  const removeRoomRow = () => {
    if (rooms.length > 1) setRooms(rooms.slice(0, -1));
  };

  const updateRoom = (i, key, value) => {
    const updated = [...rooms];
    updated[i][key] = value;

    if (key === "roomType") {
      if (value === "") {
        updated[i].rate = 0;
      } else {
        const selected = roomList.find((r) => r.roomType === value);
        if (selected) updated[i].rate = selected.rate;
      }
    }
    setRooms(updated);
  };

  return (
    <div style={{ height: "100vh", overflowY: "auto", padding: "1rem" }}>
      <style>{inputPlaceholderStyle}</style>

      <form className="container-fluid">
        {/* PAYMENTS */}
        <h4 style={textStyle}>Payments</h4>

        <div className="row mb-3">
          <div className="col-md-6">
            <label style={textStyle}>Advance</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="number"
              value={advance}
              placeholder="Enter Advance"
              onChange={(e) => setAdvance(e.target.value)}
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
              type="number"
              value={kitchenRent}
              placeholder="Enter Kitchen Rent"
              onChange={(e) => setKitchenRent(e.target.value)}
            />
          </div>

          <div className="col-md-6">
            <label style={textStyle}>Discount</label>
            <input
              style={fieldStyle}
              className="form-control"
              type="number"
              value={discount}
              placeholder="Enter Discount"
              onChange={(e) => setDiscount(e.target.value)}
            />
          </div>
        </div>

        {/* ✅ GST + GST AMOUNT */}
        <div className="row mb-3 align-items-center">
          <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={gst}
                onChange={(e) => setGst(e.target.checked)}
              />
              <label style={textStyle} className="form-check-label">
                GST (12%)
              </label>
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

        <h5 style={textStyle}>Total: ₹{total.toFixed(2)}</h5>
        <h5 style={textStyle}>Balance: ₹{balance.toFixed(2)}</h5>

        <button className="btn btn-primary mt-3">Save Booking</button>
      </form>
    </div>
  );
};

export default BookingForm;
