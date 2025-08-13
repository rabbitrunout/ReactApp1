import React from "react";

function BookingBanner({ userName, bookings }) {
  const total = bookings.length;
  const completed = bookings.filter(b => b.confirmed).length;

  return (
    <div className="alert alert-info text-center">
      <h5 className="hello-text">
        Hello, <span className="name">{userName}</span>!
      </h5>
      <p>Total reservations: {total} | Completed: {completed}</p>
    </div>
  );
}

export default BookingBanner;
