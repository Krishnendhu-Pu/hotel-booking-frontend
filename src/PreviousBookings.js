import React, { useState } from "react";

const PreviousBookings = () => {
  const [searchType, setSearchType] = useState("single"); // 'single' or 'range'
  const [singleDate, setSingleDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
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
      
      if (!response.ok) {
        throw new Error("Failed to fetch bookings");
      }
      
      const data = await response.json();
      setBookings(data);
      
      if (data.length === 0) {
        setError("No bookings found for the selected date(s)");
      }
    } catch (err) {
      setError("Error fetching bookings: " + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        background: "rgba(255,255,255,0.09)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "2rem",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.13)",
        border: "1px solid rgba(255,255,255,0.09)",
        padding: "2rem",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#003366",
          textShadow: "0 2px 8px #7FFFD4",
          marginBottom: "1.5rem",
          textAlign: "center",
        }}
      >
        Previous Bookings
      </h1>

      {/* Search Type Selection */}
      <div style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          <button
            onClick={() => setSearchType("single")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: searchType === "single" ? "#003366" : "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Single Day
          </button>
          <button
            onClick={() => setSearchType("range")}
            style={{
              padding: "0.75rem 1.5rem",
              backgroundColor: searchType === "range" ? "#003366" : "#6b7280",
              color: "white",
              border: "none",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Date Range
          </button>
        </div>
      </div>

      {/* Date Input Fields */}
      <div style={{ marginBottom: "1.5rem" }}>
        {searchType === "single" ? (
          <div>
            <label
              style={{
                display: "block",
                fontWeight: "bold",
                color: "#003366",
                marginBottom: "0.5rem",
              }}
            >
              Select Date
            </label>
            <input
              type="date"
              value={singleDate}
              onChange={(e) => setSingleDate(e.target.value)}
              style={{
                width: "100%",
                padding: "0.75rem",
                borderRadius: "0.5rem",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
            />
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#003366",
                  marginBottom: "0.5rem",
                }}
              >
                From Date
              </label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
            </div>
            <div>
              <label
                style={{
                  display: "block",
                  fontWeight: "bold",
                  color: "#003366",
                  marginBottom: "0.5rem",
                }}
              >
                To Date
              </label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #ccc",
                  fontSize: "1rem",
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Search Button */}
      <button
        onClick={handleSearch}
        disabled={loading}
        style={{
          width: "100%",
          backgroundColor: "rgb(0,50,100)",
          color: "white",
          border: "none",
          fontWeight: "bold",
          fontSize: "1.12rem",
          padding: "0.75rem",
          borderRadius: "0.5rem",
          cursor: loading ? "not-allowed" : "pointer",
          marginBottom: "1.5rem",
        }}
      >
        {loading ? "Searching..." : "Search Bookings"}
      </button>

      {/* Error Message */}
      {error && (
        <div
          style={{
            padding: "1rem",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            border: "1px solid rgba(239, 68, 68, 0.3)",
            borderRadius: "0.5rem",
            color: "#ef4444",
            marginBottom: "1.5rem",
            textAlign: "center",
          }}
        >
          {error}
        </div>
      )}

      {/* Bookings Table */}
      {bookings.length > 0 && (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "rgba(255,255,255,0.05)",
              borderRadius: "0.5rem",
              overflow: "hidden",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#003366" }}>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  ID
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Customer Name
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Room Type
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Booking Date & Time
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking, index) => (
                <tr
                  key={booking.id}
                  style={{
                    backgroundColor:
                      index % 2 === 0
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(255,255,255,0.02)",
                    borderBottom: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <td style={{ padding: "1rem", color: "#003366", fontWeight: "bold" }}>
                    {booking.id}
                  </td>
                  <td style={{ padding: "1rem", color: "#003366", fontWeight: "bold" }}>
                    {booking.customerName}
                  </td>
                  <td style={{ padding: "1rem", color: "#003366", fontWeight: "bold" }}>
                    {booking.roomType}
                  </td>
                  <td style={{ padding: "1rem", color: "#003366", fontWeight: "bold" }}>
                    {formatDateTime(booking.bookingDate)}
                  </td>
                  <td style={{ padding: "1rem", color: "#003366", fontWeight: "bold" }}>
                    <span
                      style={{
                        padding: "0.25rem 0.75rem",
                        borderRadius: "1rem",
                        backgroundColor:
                          booking.status === "CONFIRMED"
                            ? "rgba(34, 197, 94, 0.2)"
                            : "rgba(239, 68, 68, 0.2)",
                        color:
                          booking.status === "CONFIRMED" ? "#22c55e" : "#ef4444",
                        fontSize: "0.875rem",
                        fontWeight: "bold",
                      }}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PreviousBookings;