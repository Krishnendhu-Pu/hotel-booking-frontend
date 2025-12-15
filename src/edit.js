import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const RoomTypes = () => {
  const [roomType, setRoomType] = useState("");
  const [Rate, setRate] = useState("");
  const [loading, setLoading] = useState(false);
  const [roomTypesList, setRoomTypesList] = useState([]);
  const [editId, setEditId] = useState(null); // ⭐ To detect editing mode

  // 🔥 Fetch existing room types on page load
  useEffect(() => {
    fetchRoomTypes();
  }, []);

  const fetchRoomTypes = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/RoomTypes");
      const data = await response.json();
      setRoomTypesList(data);
    } catch (error) {
      console.error("Error fetching room types:", error);
    }
  };

  // ADD / UPDATE SUBMIT HANDLER
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = { roomType, Rate };

    try {
      let url = "http://localhost:8080/api/RoomTypes";
      let method = "POST";

      if (editId) {
        // ⭐ UPDATE existing room
        url = `http://localhost:8080/api/RoomTypes/${editId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Failed");

      alert(editId ? "Room updated successfully!" : "Room added successfully!");
      setRoomType("");
      setRate("");
      setEditId(null); // reset edit mode
      fetchRoomTypes();
    } catch (error) {
      console.error(error);
      alert("Error while saving.");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Load data into form on Edit click
  const handleEdit = (room) => {
    setRoomType(room.roomType);
    setRate(room.rate);
    setEditId(room.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="card p-5 shadow-lg text-center"
      style={{
        maxWidth: "700px",
        width: "100%",
        margin: "auto",
        background: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#003366a8",
          textShadow: "0 2px 8px #7FFFD4",
        }}
        className="mb-4"
      >
        {editId ? "Edit Room Type" : "Add Room Types"}
      </h1>

      {/* FORM */}
      <form onSubmit={handleSubmit}>
        <div className="mb-3 text-start">
          <label className="form-label fw-bold" style={{ color: "#003366" }}>
            Room Type
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter room name"
            value={roomType}
            onChange={(e) => setRoomType(e.target.value)}
            required
          />
        </div>

        {/* RATE */}
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
              if (/^\d*\.?\d*$/.test(value)) {
                setRate(value);
              }
            }}
            required
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          type="submit"
          className="btn w-100"
          style={{
            backgroundColor: "rgb(0,50,100)",
            color: "white",
            fontWeight: "bold",
          }}
          disabled={loading}
        >
          {loading ? "Saving..." : editId ? "Update" : "Add"}
        </button>
      </form>

      <hr className="my-4" />

      {/* TABLE */}
      <h3 className="text-start mb-3" style={{ color: "#003366" }}>
        Existing Room Types
      </h3>

      <table className="table table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Room Type</th>
            <th>Rate</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {roomTypesList.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center">
                No Room Types Added
              </td>
            </tr>
          ) : (
            roomTypesList.map((room, index) => (
              <tr key={room.id}>
                <td>{index + 1}</td>
                <td>{room.roomType}</td>
                <td>{room.rate}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleEdit(room)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RoomTypes;
