import React, { useState, useEffect } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const BookingSummary = () => {
  const [activeTab, setActiveTab] = useState("today");
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Common pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Weekly/Monthly/Yearly filters
  const [week, setWeek] = useState("");
  
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const months = [
    "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
    "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
  ];

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear + i);

  const inputStyle = {
    background: "#003366",
    color: "white",
    padding: "0.5rem 1.5rem",
    border: "none",
    cursor: "pointer",
    borderRadius: "4px",
    outline: "none",
  };

  const formatDateTime = (d) => {
    if (!d) return "";
    return new Date(d).toLocaleString("en-GB");
  };

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const getDateRange = (type) => {
    let startDate, endDate;
    const now = new Date();

    if (type === "today") {
      startDate = now;
      endDate = now;
    } else if (type === "weekly") {
      if (!week || !month || !year) return {};
      const firstDay = new Date(year, month - 1, 1);
      startDate = new Date(firstDay.getTime() + (week - 1) * 7 * 24 * 60 * 60 * 1000);
      const lastDayOfMonth = new Date(year, month, 0);
      endDate = new Date(Math.min(startDate.getTime() + 6 * 24 * 60 * 60 * 1000, lastDayOfMonth.getTime()));
    } else if (type === "monthly") {
      if (!month || !year) return {};
      startDate = new Date(year, month - 1, 1);
      endDate = new Date(year, month, 0);
    } else if (type === "yearly") {
      if (!year) return {};
      startDate = new Date(year, 0, 1);
      endDate = new Date(year, 11, 31);
    }

    return {
      start: startDate.toISOString().split("T")[0],
      end: endDate.toISOString().split("T")[0],
    };
  };

  const fetchReport = async () => {
    setError("");
    setLoading(true);

    try {
      let type = activeTab;
      let { start, end } = getDateRange(type);

      if (!start || !end) {
        setError("Please select required filters for this report");
        setLoading(false);
        return;
      }

      const url = `http://localhost:8080/api/bookings/filter?startDate=${start}&endDate=${end}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      const data = await response.json();
      setBookings(data);
      setCurrentPage(1);

      if (data.length === 0) setError("No bookings found for selected period");
    } catch (err) {
      setError("Error fetching bookings: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const currentBookings = bookings.slice(
    (currentPage - 1) * itemsPerPage,
    (currentPage - 1) * itemsPerPage + itemsPerPage
  );

  const downloadPDF = () => {
    if (bookings.length === 0) return;

    const doc = new jsPDF("p", "pt", "a4");
    let title = "";
    if (activeTab === "today") title = `Today's Booking Report`;
    if (activeTab === "weekly") title = `Weekly Booking Report - Week ${week} ${months[month - 1]} ${year}`;
    if (activeTab === "monthly") title = `Monthly Booking Report - ${months[month - 1]} ${year}`;
    if (activeTab === "yearly") title = `Yearly Booking Report - ${year}`;

    doc.setFontSize(16);
    doc.text(title, 40, 30);

    const head = [
      ["#", "ID", "Customer", "Rooms", "Check In", "Check Out", "Status"],
    ];

    const body = bookings.map((b, i) => [
      i + 1,
      b.id,
      b.customerName,
      b.rooms?.map((r) => `${r.roomType} (${r.noOfRooms})`).join(", "),
      formatDateTime(b.checkIn),
      formatDateTime(b.checkOut),
      b.status,
    ]);

    autoTable(doc, {
      head,
      body,
      startY: 50,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [0, 51, 102] },
    });

    doc.save(`${title.replace(/\s/g, "_")}.pdf`);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <div style={{ maxWidth: "3500px", margin: "0 auto" }}>
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#003366",
            textShadow: "0 2px 8px #7FFFD4",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          Booking Reports
        </h1>

        {/* Tabs */}
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          {["today", "weekly", "monthly", "yearly"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                ...inputStyle,
                background: activeTab === tab ? "#1d4ed8" : "#003366",
              }}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          {(activeTab === "weekly" || activeTab === "monthly") && (
            <select value={month} onChange={(e) => setMonth(e.target.value)} style={inputStyle}>
              <option value="">Select Month</option>
              {months.map((m, i) => (
                <option key={i} value={i + 1}>{m}</option>
              ))}
            </select>
          )}

          {activeTab === "weekly" && (
            <select value={week} onChange={(e) => setWeek(e.target.value)} style={inputStyle}>
              <option value="">Select Week</option>
              {[1,2,3,4,5].map((w) => (
                <option key={w} value={w}>{w}</option>
              ))}
            </select>
          )}

          {(activeTab !== "today") && (
            <select value={year} onChange={(e) => setYear(e.target.value)} style={inputStyle}>
              <option value="">Select Year</option>
              {years.map((y, i) => (
                <option key={i} value={y}>{y}</option>
              ))}
            </select>
          )}

          <button onClick={fetchReport} style={inputStyle}>
            Fetch
          </button>

          <button onClick={downloadPDF} style={inputStyle}>
            Download PDF
          </button>
        </div>

        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
        {loading && <div>Loading...</div>}

        {!loading && currentBookings.length > 0 && (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "130%", marginTop: "1rem", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#003366", color: "white" }}>
                  <th>ID</th>
                  <th>Customer</th>
                  <th>Rooms</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody style={{ color: "#fefefaff", background: "rgba(255,255,255,0.09)", textShadow: "0 2px 8px #0d2250ff" }}>
                {currentBookings.map((b) => (
                  <tr key={b.id}>
                    <td>{b.id}</td>
                    <td>{b.customerName}</td>
                    <td>{b.rooms?.map((r) => `${r.roomType} (${r.noOfRooms})`).join(", ")}</td>
                    <td>{formatDateTime(b.checkIn)}</td>
                    <td>{formatDateTime(b.checkOut)}</td>
                    <td>{b.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>

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
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingSummary;
