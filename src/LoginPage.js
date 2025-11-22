import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const [openSection, setOpenSection] = useState(null);

  const features = [
    {
      title: "Booking",
      children: [
        { title: "New Booking", path: "/bookings/new" },
        { title: "Previous Bookings", path: "/bookings/previous" },
        { title: "Booking Summary", path: "/bookings/summary" },
      ],
    },
    {
      title: "Bulk Booking",
      children: [
        { title: "Create Bulk", path: "/bulk/create" },
        { title: "View Bulk", path: "/bulk/view" },
        { title: "Bulk Settings", path: "/bulk/settings" },
      ],
    },
    {
      title: "Daily Report",
      children: [
        { title: "Today Report", path: "/report/today" },
        { title: "Weekly Report", path: "/report/weekly" },
        { title: "Monthly Report", path: "/report/monthly" },
      ],
    },
    {
      title: "GST Bill",
      children: [
        { title: "Create GST Bill", path: "/gst/create" },
        { title: "GST Records", path: "/gst/records" },
        { title: "GST Settings", path: "/gst/settings" },
      ],
    },
    {
      title: "Expenses",
      children: [
        { title: "Add Expense", path: "/expenses/add" },
        { title: "Expense List", path: "/expenses/list" },
        { title: "Expense Reports", path: "/expenses/reports" },
      ],
    },
    {
      title: "Staff Management",
      children: [
        { title: "Add Staff", path: "/staff/add" },
        { title: "Staff List", path: "/staff/list" },
        { title: "Payroll", path: "/staff/payroll" },
      ],
    },
    {
      title: "Rooms Availability",
      children: [
        { title: "Check Availability", path: "/rooms/check" },
        { title: "Block Rooms", path: "/rooms/block" },
        { title: "Availability Report", path: "/rooms/report" },
      ],
    },
    {
      title: "Room View",
      children: [
        { title: "Gallery", path: "/room-view/gallery" },
        { title: "Room Details", path: "/room-view/details" },
        { title: "Room Pricing", path: "/room-view/pricing" },
      ],
    },
    {
      title: "Function Hall Booking",
      children: [
        { title: "New Hall Booking", path: "/hall/new" },
        { title: "Hall Schedule", path: "/hall/schedule" },
        { title: "Hall Pricing", path: "/hall/pricing" },
      ],
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "fixed",
        top: 0,
        left: 0,
        minWidth: "100vw",
        minHeight: "100vh",
        display: "flex",
        color: "white",
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.6)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#003366ee] flex flex-col h-full relative">
        {/* Header with welcome */}
        <div className="p-4 border-b border-blue-800">
          <h2 className="text-2xl font-bold">Welcome, {username}</h2>
        </div>

        {/* Menu items scrollable */}
        <div className="flex-1 overflow-y-auto p-2 relative">
          <ul className="p-0 m-0 list-none">
            {features.map((section, idx) => (
              <li key={idx} className="relative">
                <div
                  className="p-2 rounded hover:bg-blue-800 cursor-pointer font-semibold"
                  onMouseEnter={() => setOpenSection(idx)}
                  onMouseLeave={() => setOpenSection(null)}
                >
                  {section.title}
                </div>

                {openSection === idx && (
                  <div
                    className="absolute left-full top-0 ml-2 bg-[#002244] p-3 rounded-lg shadow-xl w-52 z-50"
                    onMouseEnter={() => setOpenSection(idx)}
                    onMouseLeave={() => setOpenSection(null)}
                  >
                    {section.children.map((child, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-2 rounded hover:bg-blue-700 cursor-pointer"
                        onClick={() => navigate(child.path)}
                      >
                        {child.title}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Logout button */}
        <button
          onClick={handleLogout}
          style={{
            position: "absolute",
            top: "30px",
            right: "40px",
            backgroundColor: "#003366",
            color: "white",
            fontWeight: "bold",
            borderRadius: "0.75rem",
            padding: "0.75rem 2rem",
            border: "none",
            fontSize: "1rem",
            boxShadow: "0 2px 8px rgba(0,50,100,0.12)",
            zIndex: 10,
          }}
        >
          Logout
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1"></div>
    </div>
  );
}
