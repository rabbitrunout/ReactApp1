import React, { useState, useEffect } from "react";
import "./App.css";
import BookingBanner from "./BookingBanner";
import BookingCreator from "./BookingCreator";
import BookingRow from "./BookingRow";
import VisibilityControl from "./VisibilityControl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [userName, setUserName] = useState("Visitor");
  const [bookings, setBookings] = useState([]);
  const [showCompleted, setShowCompleted] = useState(true);

  // Создание новой брони
  const createNewBooking = (zone, slot) => {
    if (!bookings.find(b => b.zone === zone && b.slot === slot)) {
      const updated = [...bookings, { zone, slot, confirmed: false }];
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
      toast.success("Reservation added!");
    } else {
      toast.error("That slot is already taken!");
    }
  };

  // Подтверждение / отмена подтверждения
  const toggleConfirm = booking => {
    const updated = bookings.map(b =>
      b.zone === booking.zone && b.slot === booking.slot
        ? { ...b, confirmed: !b.confirmed }
        : b
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
  };

  // Удаление брони
  const deleteBooking = booking => {
    const updated = bookings.filter(
      b => !(b.zone === booking.zone && b.slot === booking.slot)
    );
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast.info("Reservation deleted!");
  };

  // Редактирование брони
  const editBooking = (oldBooking, newZone, newSlot) => {
    if (!bookings.find(b => b.zone === newZone && b.slot === newSlot)) {
      const updated = bookings.map(b =>
        b.zone === oldBooking.zone && b.slot === oldBooking.slot
          ? { ...b, zone: newZone, slot: newSlot }
          : b
      );
      setBookings(updated);
      localStorage.setItem("bookings", JSON.stringify(updated));
      toast.success("Reservation changed!");
    } else {
      toast.error("That slot is already taken!");
    }
  };

  // Очистка всех завершённых
  const clearCompleted = () => {
    const updated = bookings.filter(b => !b.confirmed);
    setBookings(updated);
    localStorage.setItem("bookings", JSON.stringify(updated));
    toast.info("All completed reservations cleared!");
  };

  // Загрузка из localStorage с дефолтами
  useEffect(() => {
    try {
      const data = localStorage.getItem("bookings");
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setBookings(parsed);
        }
      } else {
        // дефолтные данные
        setUserName("Visitor");
        setBookings([
          { zone: "Zone A", slot: "10:00", confirmed: false },
          { zone: "Zone B", slot: "12:00", confirmed: true },
          { zone: "Zone C", slot: "14:00", confirmed: false }
        ]);
        setShowCompleted(true);
      }
    } catch (err) {
      console.error("Failed to load bookings:", err);
    }
  }, []);

  const activeBookings = bookings.filter(b => !b.confirmed);
  const completedBookings = bookings.filter(b => b.confirmed);

  return (
    <div className="container mt-3">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="my-3">
        <label>Your name:</label>
        <input
          type="text"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          className="form-control"
          placeholder="Please enter your name"
        />
      </div>

      <BookingBanner userName={userName} bookings={bookings} />

      <BookingCreator bookings={bookings} callback={createNewBooking} />

      <div className="table-responsive mt-3">
        {activeBookings.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Location</th>
                <th>Time</th>
                <th>Reservation</th>
              </tr>
            </thead>
            <tbody>
              {activeBookings.map(b => (
                <BookingRow
                  key={`${b.zone}-${b.slot}`}
                  booking={b}
                  toggleConfirm={toggleConfirm}
                  editBooking={editBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
            </tbody>
          </table>
        ) : (
          <p>No active reservations</p>
        )}
      </div>

      <div className="bg-secondary text-white text-center p-2">
        <VisibilityControl
          description="Show completed reservations"
          isChecked={showCompleted}
          callback={setShowCompleted}
        />
      </div>

      {showCompleted && completedBookings.length > 0 && (
        <div className="table-responsive mt-3">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>Location</th>
                <th>Time</th>
                <th>Reservation</th>
              </tr>
            </thead>
            <tbody>
              {completedBookings.map(b => (
                <BookingRow
                  key={`${b.zone}-${b.slot}`}
                  booking={b}
                  toggleConfirm={toggleConfirm}
                  deleteBooking={deleteBooking}
                />
              ))}
            </tbody>
          </table>

          <div className="text-center mt-3">
            <button className="btn btn-danger" onClick={clearCompleted}>
              Clear All Completed
            </button>
          </div>
        </div>
      )}

      {showCompleted && completedBookings.length === 0 && <p>No completed reservations</p>}
    </div>
  );
}

export default App;
