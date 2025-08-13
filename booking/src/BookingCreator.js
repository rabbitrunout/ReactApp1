import React, { useState } from "react";

function BookingCreator({ bookings, callback }) {
  const [zone, setZone] = useState("Zone A");
  const [slot, setSlot] = useState("09:00-12:00");

  const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
  const slots = ["09:00-12:00", "12:00-15:00", "15:00-18:00"];

  const occupiedSlots = bookings
    .filter(b => b.zone === zone)
    .map(b => b.slot);

  const handleAdd = () => {
    if (!occupiedSlots.includes(slot)) {
      callback(zone, slot);
    } else {
      alert("This slot is already taken!");
    }
  };

  return (
    <div className="d-flex align-items-center mb-3">
      <select className="form-select me-2" value={zone} onChange={e => setZone(e.target.value)}>
        {zones.map(z => <option key={z} value={z}>{z}</option>)}
      </select>

      <select className="form-select me-2" value={slot} onChange={e => setSlot(e.target.value)}>
        {slots.map(s => (
          <option key={s} value={s} disabled={occupiedSlots.includes(s)}>
            {s} {occupiedSlots.includes(s) ? "(Occupied)" : ""}
          </option>
        ))}
      </select>

      <button className="btn btn-primary" onClick={handleAdd}>Add Reservation</button>
    </div>
  );
}

export default BookingCreator;
