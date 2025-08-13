import React, { useState } from "react";

function BookingRow({ booking, toggleConfirm, editBooking, deleteBooking }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editZone, setEditZone] = useState(booking.zone);
  const [editSlot, setEditSlot] = useState(booking.slot);

  const zones = ["Zone A", "Zone B", "Zone C", "Zone D"];
  const slots = ["09:00-12:00", "12:00-15:00", "15:00-18:00"];

  const handleSave = () => {
    if (editZone && editSlot) {
      editBooking(booking, editZone, editSlot);
      setIsEditing(false);
    }
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <select
            className="form-select"
            value={editZone}
            onChange={e => setEditZone(e.target.value)}
          >
            {zones.map(z => (
              <option key={z} value={z}>
                {z}
              </option>
            ))}
          </select>
        ) : (
          booking.zone
        )}
      </td>

      <td>
        {isEditing ? (
          <select
            className="form-select"
            value={editSlot}
            onChange={e => setEditSlot(e.target.value)}
          >
            {slots.map(s => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        ) : (
          booking.slot
        )}
      </td>

      <td className="text-center">
        {isEditing ? (
          <>
            <button
              className="btn btn-sm btn-success me-1"
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </>
        ) : (
          <>
            <input
              type="checkbox"
              checked={booking.confirmed}
              onChange={() => toggleConfirm(booking)}
              title="Mark as completed"
              className="form-check-input"
            />
            <button
              className="btn btn-sm btn-primary ms-2"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            {booking.confirmed && (
              <button
                className="btn btn-sm btn-danger ms-1"
                onClick={() => deleteBooking(booking)}
              >
                Delete
              </button>
            )}
          </>
        )}
      </td>
    </tr>
  );
}

export default BookingRow;
