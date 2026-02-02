import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";
import PreviousBookings from "./PreviousBookings";
import AddRooms from "./AddRooms";
import UpdateRooms from "./UpdateRooms.js";
import BookingSummary from "./BookingSummary.js"

export default function Home() {
  const navigate = useNavigate();
  const username = localStorage.getItem("username") || "Guest";
  const [openSection, setOpenSection] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  const menuRefs = useRef({});
  const [editingBookingId, setEditingBookingId] = useState(null);


  const features = [
    {
      title: "Home",
      children: [
        { title: "Dashboard", path: "/home/dashboard" },
        { title: "Overview", path: "/home/overview" },
        { title: "Statistics", path: "/home/statistics" },
      ],
    },
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
      title: "Rooms Maintenance",
      children: [
        { title: "Check Availability", path: "/rooms/check" },
        { title: "Update Rooms", path: "/rooms/UpdateRooms" },
        { title: "Add Rooms", path: "/rooms/AddRooms" },
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

  const handleNavigate = (path, bookingId = null) => {
  setEditingBookingId(bookingId);
  setCurrentPage(path);
};

  const getSubmenuPosition = (idx) => {
    if (menuRefs.current[idx]) {
      const rect = menuRefs.current[idx].getBoundingClientRect();
      return rect.top;
    }
    return 0;
  };

  const renderContent = () => {
    switch (currentPage) {
      case "/home/dashboard":
      case "/home/overview":
      case "/home/statistics":
        return (
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                color: "#003366",
                textShadow: "0 2px 8px #7FFFD4",
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              Welcome to Hotel Management System
            </h2>
            <p
              style={{
                color: "#85afdaff",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
            >
              Select a menu item to get started
            </p>
          </div>
        );
      case "/bookings/new":
  return <BookingForm />;

case "/bookings/edit":
  return <BookingForm id={editingBookingId} />;

      case "/bookings/previous":
  return <PreviousBookings onEdit={(id) => handleNavigate("/bookings/edit", id)} />;
      
      case "/bookings/summary":
        return <BookingSummary />
      case "/rooms/AddRooms":
          return <AddRooms />
     
        
      
     
        
      case "/rooms/UpdateRooms":
        return <UpdateRooms/>

      default:
        return (
          <div style={{ textAlign: "center" }}>
            <h2
              style={{
                color: "#003366",
                textShadow: "0 2px 8px #7FFFD4",
                fontSize: "2.5rem",
                fontWeight: "bold",
              }}
            >
              Welcome to Hotel Management System 
            </h2>
            <p
              style={{
                color: "#85afdaff",
                fontSize: "1.2rem",
                marginTop: "1rem",
              }}
            >
              Select a menu item to get started
            </p>
          </div>
        );
    }
  };

  const menuTextStyle = {
    color: "#85afdaff",
    textShadow: "0 2px 8px #032c1eff",
    fontWeight: "bold",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        margin: 0,
        padding: 0,
        overflow: "hidden",
        background:
          "linear-gradient(rgba(0,0,50,0.6), rgba(0,50,100,0.7)), url('https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=1950&q=80') center/cover no-repeat",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          width: "256px",
          height: "100vh",
          backgroundColor: "#003366ee",
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Welcome */}
        <div
          style={{
            padding: "1rem",
            borderBottom: "1px solid #1e40af",
          }}
        >
          <span
            style={{
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#003366",
              textShadow: "0 2px 8px #7FFFD4",
            }}
          >
            Welcome, {username}
          </span>
        </div>

        {/* Menu */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "visible",
            padding: "0.5rem",
          }}
        >
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {features.map((section, idx) => (
              <li key={idx} style={{ position: "relative" }}>
                <div
                  ref={(el) => (menuRefs.current[idx] = el)}
                  style={{
                    ...menuTextStyle,
                    padding: "0.75rem 1rem",
                    borderRadius: "0.5rem",
                    transition: "background-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    setOpenSection(idx);
                    e.currentTarget.style.backgroundColor = "#1e40af";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  {section.title}
                </div>

                {openSection === idx && (
                  <React.Fragment>
                    {/* Invisible bridge to prevent hover break */}
                    <div
                      style={{
                        position: "fixed",
                        left: "256px",
                        top: `${getSubmenuPosition(idx)}px`,
                        width: "20px",
                        height: `${menuRefs.current[idx]?.offsetHeight || 50}px`,
                        zIndex: 999,
                      }}
                      onMouseEnter={() => setOpenSection(idx)}
                      onMouseLeave={() => setOpenSection(null)}
                    />
                    <div
                      style={{
                        position: "fixed",
                        left: "264px",
                        top: `${getSubmenuPosition(idx)}px`,
                        backgroundColor: "#002244",
                        borderRadius: "0.6rem",
                        minWidth: "14rem",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)",
                        zIndex: 1000,
                        padding: "0.5rem",
                      }}
                      onMouseEnter={() => setOpenSection(idx)}
                      onMouseLeave={() => setOpenSection(null)}
                    >
                      {section.children.map((child, cIdx) => (
                        <div
                          key={cIdx}
                          style={{
                            ...menuTextStyle,
                            padding: "0.5rem 0.75rem",
                            borderRadius: "0.4rem",
                            transition: "background-color 0.2s",
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = "#1d4ed8";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                          }}
                          onClick={() => handleNavigate(child.path)}
                        >
                          {child.title}
                        </div>
                      ))}
                    </div>
                  </React.Fragment>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          height: "100vh",
          overflow: "auto",
          position: "relative",
        }}
      >
        {/* Logout Button */}
        <div
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            zIndex: 10,
          }}
        >
          <button
            onClick={handleLogout}
            style={{
              ...menuTextStyle,
              backgroundColor: "#003366",
              padding: "0.5rem 1.5rem",
              borderRadius: "0.5rem",
              border: "none",
              fontSize: "1rem",
              transition: "background-color 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#1e40af";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#003366";
            }}
          >
            Logout
          </button>
        </div>

        {/* Content Area */}
        <div
          style={{
            height: "100%",
            width: "80%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          {renderContent()}
        </div>
      </div>
    </div>
  );
}