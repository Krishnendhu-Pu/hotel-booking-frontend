import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";

  const features = [
    { title: "Booking", path: "/bookings" },
    { title: "Bulk Booking", path: "/bulk-booking" },
    { title: "Daily Report", path: "/daily-report" },
    { title: "GST Bill", path: "/gst-bill" },
    { title: "Expenses", path: "/expenses" },
    { title: "Staff Management", path: "/staff" },
    { title: "Rooms Availability", path: "/rooms" },
    { title: "Room View", path: "/room-view" },
    { title: "Function Hall Booking", path: "/hall-booking" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        minWidth: '100vw',
        position: 'fixed',
        top: 0,
        left: 0,
        color: '#003366',
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.6)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat"
      }}
      className="flex flex-col justify-center items-center"
    >
      {/* Logout button - top right */}
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
          zIndex: 10
        }}
      >
        Logout
      </button>

      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{
          whiteSpace: "nowrap",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#003366",
          textShadow: "0 2px 8px #7FFFD4"
        }}
        className="text-5xl font-extrabold mb-12"
      >
        Welcome, <span className="text-yellow-400">{username}</span>
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-6 rounded-3xl shadow-2xl cursor-pointer hover:scale-105 transform transition-all duration-300"
            onClick={() => navigate(item.path)}
          >
            <h2
              className="text-xl font-bold text-center"
              style={{
                color: "#85afdaff",
                textShadow: "0 2px 8px #032c1eff"
              }}
            >
              {item.title}
            </h2>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
