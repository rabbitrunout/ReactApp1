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

  // Загрузка бронирований
  useEffect(() => {
    const data = localStorage.getItem("bookings");
    setBookings(data ? JSON.parse(data) : []);
  }, []);

  // Автосохранение
  useEffect(() => {
    localStorage.setItem("bookings", JSON.stringify(bookings));
  }, [bookings]);

  // Добавление новой брони
  const createNewBooking = (zone, slot) => {
    if (!bookings.find(b => b.zone === zone && b.slot === slot)) {
      setBookings([...bookings, { zone, slot, confirmed: false }]);
      toast.success("Reservation added!");
    } else {
      toast.error("That slot is already taken!");
    }
  };

  // Подтверждение брони (перенос в завершённые)
  const toggleConfirm = booking => {
    setBookings(bookings.map(b =>
      b.zone === booking.zone && b.slot === booking.slot
        ? { ...b, confirmed: !b.confirmed }
        : b
    ));
  };

  // Удаление брони
  const deleteBooking = booking => {
    setBookings(bookings.filter(b =>
      !(b.zone === booking.zone && b.slot === booking.slot)
    ));
    toast.info("Reservation deleted!");
  };

  // Редактирование брони
  const editBooking = (oldBooking, newZone, newSlot) => {
    if (!bookings.find(b => b.zone === newZone && b.slot === newSlot)) {
      setBookings(bookings.map(b =>
        b.zone === oldBooking.zone && b.slot === oldBooking.slot
          ? { ...b, zone: newZone, slot: newSlot }
          : b
      ));
      toast.success("Reservation changed!");
    } else {
      toast.error("That slot is already taken!");
    }
  };

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
                  bookings={bookings}
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

      <VisibilityControl
        description="Show completed reservations"
        isChecked={showCompleted}
        callback={setShowCompleted}
      />

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
                  bookings={bookings}
                  toggleConfirm={toggleConfirm}
                  editBooking={editBooking}
                  deleteBooking={deleteBooking}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showCompleted && completedBookings.length === 0 && <p>No completed reservations</p>}
    </div>
  );
}

export default App;
