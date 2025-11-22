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
      className="h-screen w-screen flex"
      style={{
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.6)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
        color: "white",
      }}
    >
      {/* LEFT SIDEBAR */}
      <div className="w-64 bg-[#003366ee] h-full flex flex-col relative">
        {/* Welcome at top */}
        <div className="flex justify-between items-center p-4 border-b border-blue-800">
          <h2 className="text-2xl font-bold">Welcome, {username}</h2>
          <button
            onClick={handleLogout}
            className="bg-[#003366] px-4 py-2 rounded-xl font-bold shadow-lg hover:bg-blue-800"
          >
            Logout
          </button>
        </div>

        {/* Menu Items scrollable */}
        <div className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-2">
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
      </div>

      {/* MAIN CONTENT */}
      <div className="flex-1 relative"></div>
    </div>
  );
}
