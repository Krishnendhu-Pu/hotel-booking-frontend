import React, { useState, useEffect } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";


const PreviousBookings = () => {
  const [searchType, setSearchType] = useState("single");
  const [singleDate, setSingleDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [searchId, setSearchId] = useState("");
  const [editingBooking, setEditingBooking] = useState(null);
  const [selectedBookingId, setSelectedBookingId] = useState(null);

  const [editForm, setEditForm] = useState({
    customerName: "",
    roomType: "",
    bookingDate: "",
    status: "CONFIRMED",
  });

  useEffect(() => {}, []);

  const handleSearch = async () => {
    setEditingBooking(null);
    setSelectedBookingId(null);
    setError("");
    setLoading(true);

    try {
      let url = "http://localhost:8080/api/bookings/filter?";

      if (searchType === "single") {
        if (!singleDate) {
          setError("Please select a date");
          setLoading(false);
          return;
        }
        url += `startDate=${singleDate}`;
      } else {
        if (!fromDate || !toDate) {
          setError("Please select both from and to dates");
          setLoading(false);
          return;
        }
        if (new Date(fromDate) > new Date(toDate)) {
          setError("From date cannot be later than To date");
          setLoading(false);
          return;
        }
        url += `startDate=${fromDate}&endDate=${toDate}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch bookings");

      const data = await response.json();
      setBookings(data);
      setCurrentPage(1);

      if (data.length === 0) setError("No bookings found");
    } catch (err) {
      setError("Error fetching bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchById = async () => {
    setEditingBooking(null);
    setSelectedBookingId(null);
    setError("");
    if (!searchId) {
      setError("Enter an ID to search");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`http://localhost:8080/api/bookings/${searchId}`);
      if (!res.ok) {
        if (res.status === 404) setError("Booking not found");
        else setError("Error fetching booking");
        setLoading(false);
        return;
      }

      const b = await res.json();
      setBookings([b]);
      setCurrentPage(1);
    } catch (err) {
      setError("Error fetching booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEditButtonClick = () => {
    if (!selectedBookingId) {
      setError("Please select a booking to edit");
      return;
    }

    const b = bookings.find((bk) => bk.id === selectedBookingId);
    if (!b) return;

    setEditingBooking(b);
    setEditForm({
      customerName: b.customerName ?? "",
      roomType: b.roomType ?? "",
      bookingDate: b.bookingDate,
      status: b.status ?? "CONFIRMED",
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editingBooking) return;

    setLoading(true);
    try {
      const payload = { ...editForm };

      const res = await fetch(
        `http://localhost:8080/api/bookings/${editingBooking.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();

      setBookings((prev) =>
        prev.map((b) => (b.id === updated.id ? updated : b))
      );

      setEditingBooking(null);
      alert("Updated successfully");
    } catch (err) {
      setError("Error updating booking: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleString("en-GB");
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  const downloadPDF = () => {
    if (bookings.length === 0) return;
    const doc = new jsPDF("p", "pt", "a4");
    const head = [["#", "ID", "Customer", "Room", "Date", "Status"]];

    const body = bookings.map((b, i) => [
      i + 1,
      b.id,
      b.customerName,
      b.roomType,
      formatDateTime(b.bookingDate),
      b.status,
    ]);

    autoTable(doc, { head, body, startY: 40 });
    doc.save("bookings.pdf");
  };

  return (
    <div style={{ maxHeight: "100vh",  padding: "1rem" }}>
      <div style={{ width: "100%", maxWidth: "3500px", margin: "0 auto" }}>
        <h1 style={{ whiteSpace: "nowrap",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#003366",
          textShadow: "0 2px 8px #7FFFD4",textAlign: "center", marginBottom: "1.5rem" }}>
          Previous Bookings
        </h1>

       {/* SEARCH SECTION */}
<div
  style={{
    display: "flex",
    gap: "1rem",
    flexWrap: "wrap",
    alignItems: "center",
    padding: "1rem",
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    marginBottom: "1rem",
  }}
>
  {/* Left part: Buttons + Date inputs */}
 <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>

  {/* ROW 1: Buttons (left) + Search by ID Label (right, same horizontal line) */}
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    {/* Buttons group (left) */}
    <div>
      <button
        onClick={() => {
          setSearchType("single");
          setEditingBooking(null);
        }}
        style={{
          padding: "0.5rem 1rem",
          background: searchType === "single" ? "#003366" : "gray",
          color: "white",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        Single Day
      </button>

      <button
        onClick={() => {
          setSearchType("range");
          setEditingBooking(null);
        }}
        style={{
          padding: "0.5rem 1rem",
          background: searchType === "range" ? "#003366" : "gray",
          color: "white",
          marginLeft: 4,
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      >
        Date Range
      </button>
    </div>

    {/* Spacer to push label to same line; label container width matches ID input container below */}
    
  </div>

  {/* ROW 2: Date inputs (left) and ID input + Go button (right) — same horizontal line */}
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    {/* Date inputs (will be on the left, take remaining space) */}
    <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "0.5rem" }}>
      {searchType === "single" ? (
        <input
          type="date"
          value={singleDate}
          onChange={(e) => setSingleDate(e.target.value)}
          style={{
            padding: "0.5rem",
            border: "1px solid #d1d5db",
            borderRadius: "4px",
            fontSize: "14px",
          }}
        />
      ) : (
        <>
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            style={{
              padding: "0.5rem",
              border: "1px solid #d1d5db",
              borderRadius: "4px",
              fontSize: "14px",
            }}
          />
        </>
      )}
    </div>

    {/* ID input + Go button (right), width matches the label container above so label sits exactly above it */}
    <div style={{ width: "200px", display: "flex", alignItems: "center", gap: 8 }}>
      <input
        type="number"
        value={searchId}
        onChange={(e) => setSearchId(e.target.value)}
        placeholder="Enter ID"
        style={{
          padding: "0.5rem",
          flex: 1,
          border: "1px solid #d1d5db",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />
      <button
        onClick={handleSearchById}
        style={{
          backgroundColor: "rgb(0,50,100)",
          color: "white",
          padding: "0.5rem 1.5rem",
          border: "none",
          cursor: "pointer",
          borderRadius: "4px",
          fontSize: "14px",
          fontWeight: "500",
        }}
      >
        Go
      </button>
    </div>
  </div>

  {/* ROW 3: Search button (kept below the inputs as before) */}
  <button
    onClick={handleSearch}
    style={{
      marginTop: 8,
      background: "#003366",
      color: "white",
      padding: "0.5rem 1.5rem",
      width: "100px",
      border: "none",
      cursor: "pointer",
      borderRadius: "4px",
      fontSize: "14px",
      fontWeight: "500",
    }}
  >
    Search
  </button>
</div>

</div>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}

        {/* EDIT FORM */}
        {editingBooking && (
          <div
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "#f3f4f6",
              borderRadius: 8,
            }}
          >
            <h3>Edit Booking (ID: {editingBooking.id})</h3>

            <form onSubmit={handleEditSubmit}>
              <input
                name="customerName"
                value={editForm.customerName}
                onChange={(e) =>
                  setEditForm({ ...editForm, customerName: e.target.value })
                }
                required
              />
              <select
                name="roomType"
                value={editForm.roomType}
                onChange={(e) =>
                  setEditForm({ ...editForm, roomType: e.target.value })
                }
              >
                <option>Economy Double room</option>
            <option>Studio room with balcony</option>
            <option>Family Deluxe room</option>
            <option>Family Deluxe room</option>
            <option>Luxury Tripple room</option>
              </select>
              <input
                type="datetime-local"
                name="bookingDate"
                value={editForm.bookingDate?.substring(0, 16)}
                onChange={(e) =>
                  setEditForm({ ...editForm, bookingDate: e.target.value })
                }
                required
              />

              <select
                name="status"
                value={editForm.status}
                onChange={(e) =>
                  setEditForm({ ...editForm, status: e.target.value })
                }
              >
                <option value="CONFIRMED">CONFIRMED</option>
                <option value="CANCELLED">CANCELLED</option>
                <option value="PENDING">PENDING</option>
              </select>

              <button type="submit" style={{ marginTop: 8 }}>
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditingBooking(null)}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

        {/* TABLE */}
        {!editingBooking && currentBookings.length > 0 && (
          <>
            <button
              onClick={downloadPDF}
              style={{
                marginTop: "1rem",
                background: "#003366",
                color: "white",
                padding: "0.5rem",
              }}
            >
              Download PDF
            </button>

            {/* GLOBAL EDIT BUTTON */}
            <button
              onClick={handleEditButtonClick}
              style={{
                marginTop: "1rem",
                marginLeft: "10px",
                 backgroundColor: "rgb(0,50,100)",
                color: "white",
                padding: "0.5rem",
              }}
            >
              Edit Selected Booking
            </button>

            <table
              style={{
                width: "130%",
                marginTop: "1rem",
                borderCollapse: "collapse",
              }}
            >
              <thead>
                <tr style={{ background: "#003366", color: "white" }}>
                  <th>Select</th>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Room</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody style={{ color: "#fefefaff", background: "rgba(255,255,255,0.09)",textShadow: "0 2px 8px #0d2250ff" }}>
                {currentBookings.map((b) => (
                  <tr key={b.id}>
                    <td style={{ textAlign: "center" }}>
                      <input
                        type="radio"
                        name="selectedBooking"
                        checked={selectedBookingId === b.id}
                        onChange={() => setSelectedBookingId(b.id)}
                        style={{ width: 18, height: 18 }}
                      />
                    </td>
                    <td>{b.id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.roomType}</td>
                    <td>{formatDateTime(b.bookingDate)}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div style={{ marginTop: 10 }}>
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    style={{
                      background: i + 1 === currentPage ? "#1d4ed8" : "gray",
                      color: "white",
                      padding: "5px 10px",
                      marginRight: 5,
                    }}
                    onClick={() => setCurrentPage(i + 1)}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PreviousBookings;
