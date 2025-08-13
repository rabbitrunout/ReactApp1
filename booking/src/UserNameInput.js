import React, { useState } from "react";

function UserNameInput({ userName, saveUserName }) {
  const [tempName, setTempName] = useState(userName);

  const handleBlur = () => {
    saveUserName(tempName.trim() || "Visitor");
  };

  return (
    <div className="text-center mb-3">
      <input
        type="text"
        className="form-control"
        style={{ maxWidth: "250px", margin: "0 auto" }}
        value={tempName}
        onChange={e => setTempName(e.target.value)}
        onBlur={handleBlur}
        placeholder="Enter your name"
      />
    </div>
  );
}

export default UserNameInput;
