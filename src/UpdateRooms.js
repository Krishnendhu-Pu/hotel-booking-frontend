import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const UpdateRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  const [roomType, setRoomType] = useState("");
  const [rate, setRate] = useState("");
  const [gstPercent, setGstPercent] = useState("");
  const [acRate, setAcRate] = useState("");
  const [extraBedFee, setExtraBedFee] = useState("");
  const [remarks, setRemarks] = useState("");
  const [noOfRooms, setNoOfRooms] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔹 Fetch rooms
  const fetchRooms = async () => {
    const res = await fetch("http://localhost:8080/api/bookings/roomslist");
    const data = await res.json();
    setRooms(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  // 🔹 Select room
  const handleSelect = (room) => {
    setSelectedRoomId(room.id);
    setRoomType(room.roomType);
    setRate(room.rate);
    setGstPercent(room.gstPercent ?? "");
    setAcRate(room.acRate ?? "");
    setExtraBedFee(room.extraBedFee ?? "");
    setRemarks(room.remarks ?? "");
    setNoOfRooms(room.noOfRooms);
  };

  // 🔹 Update room
  const handleUpdate = async () => {
    if (!selectedRoomId) {
      alert("Please select a room");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:8081/api/rooms/${selectedRoomId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomType,
            rate,
            gstPercent: gstPercent || null,
            acRate: acRate || null,
            extraBedFee: extraBedFee || null,
            remarks,
            noOfRooms,
          }),
        }
      );

      if (!response.ok) throw new Error("Update failed");

      alert("Room updated successfully");
      fetchRooms();
    } catch (err) {
      alert("Error updating room");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete room
  const handleDelete = async () => {
    if (!selectedRoomId) {
      alert("Please select a room to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this room?")) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/rooms/${selectedRoomId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error("Delete failed");

      alert("Room deleted successfully");

      setSelectedRoomId(null);
      setRoomType("");
      setRate("");
      setGstPercent("");
      setAcRate("");
      setExtraBedFee("");
      setRemarks("");
      setNoOfRooms("");

      fetchRooms();
    } catch (err) {
      alert("Error deleting room");
      console.error(err);
    }
  };

  return (
    <div
      className="card p-5 shadow-lg"
      style={{
        maxWidth: "900px",
        width: "100%",
        background: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
        borderRadius: "2rem",
        border: "1px solid rgba(255,255,255,0.09)",
      }}
    >
      <h1
        className="text-center mb-4"
        style={{
          fontWeight: "bold",
          color: "#003366",
          textShadow: "0 2px 8px #7FFFD4",
        }}
      >
        Update Room Details
      </h1>

      {/* ROOM TABLE */}
      <div className="table-responsive mb-4">
        <table style={{ width: "100%", marginTop: "1rem" }}>
          <thead>
            <tr style={{ background: "#003366", color: "white" }}>
              <th>Select</th>
              <th>Room Type</th>
              <th style={{ paddingRight: "2rem" }}>Rate</th>
              <th >GST %</th>
              <th>AC Rate</th>
              <th>Extra Bed</th>
              <th>No Of Rooms</th>
              <th>Remarks</th>
            </tr>
          </thead>
          <tbody
            style={{
              color: "#fefefaff",
              background: "rgba(255,255,255,0.09)",
              textShadow: "0 2px 8px #0d2250ff",
            }}
          >
            {rooms.map((room) => (
              <tr
                key={room.id}
                className={
                  selectedRoomId === room.id ? "table-info fw-bold" : ""
                }
              >
                <td className="text-center">
                  <input
                    type="radio"
                    name="room"
                    checked={selectedRoomId === room.id}
                    onChange={() => handleSelect(room)}
                  />
                </td>
                <td>{room.roomType}</td>
                <td style={{ paddingRight: "2rem" }}>₹{room.rate}</td>
                <td >{room.gstPercent ?? "-"}%</td>
                <td>₹{room.acRate ?? "-"}</td>
                <td>₹{room.extraBedFee ?? "-"}</td>
                <td>{room.noOfRooms}</td>
                <td>{room.remarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* EDIT FORM */}
      <div className="row g-3 mb-3">
        <div className="col-md-6">
          <label className="fw-bold">Room Type</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="fw-bold">Rate</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label className="fw-bold" >GST %</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={gstPercent}
            onChange={(e) =>
  setGstPercent(e.target.value === "" ? "" : Number(e.target.value))
}

          />
        </div>

        <div className="col-md-4">
          <label className="fw-bold" >AC Rate</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={acRate}
            onChange={(e) =>
  setAcRate(e.target.value === "" ? "" : Number(e.target.value))
}

          />
        </div>

        <div className="col-md-4">
          <label className="fw-bold">Extra Bed Fee</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={extraBedFee}
            onChange={(e) =>
  setExtraBedFee(e.target.value === "" ? "" : Number(e.target.value))
}

          />
        </div>

        <div className="col-md-6">
          <label className="fw-bold">No Of Rooms</label>
          <input
            type="number"
            className="form-control form-control-sm"
            value={noOfRooms}
            onChange={(e) => setNoOfRooms(e.target.value)}
          />
        </div>

        <div className="col-md-6">
          <label className="fw-bold">Remarks</label>
          <input
            type="text"
            className="form-control form-control-sm"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
          />
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="d-flex gap-3">
        <button
          className="btn w-100"
          style={{
            backgroundColor: "rgb(0,50,100)",
            color: "white",
            fontWeight: "bold",
          }}
          onClick={handleUpdate}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update"}
        </button>

        <button className="btn btn-danger w-100 fw-bold" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default UpdateRooms;
