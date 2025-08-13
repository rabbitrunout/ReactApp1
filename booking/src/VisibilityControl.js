import React from "react";

function VisibilityControl({ description, isChecked, callback }) {
  return (
    <div className="form-check my-2">
      <input
        className="form-check-input"
        type="checkbox"
        checked={isChecked}
        onChange={e => callback(e.target.checked)}
        id="visibilityControl"
      />
      <label className="form-check-label" htmlFor="visibilityControl">
        {description}
      </label>
    </div>
  );
}

export default VisibilityControl;
