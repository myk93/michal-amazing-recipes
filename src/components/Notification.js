import React from 'react';

function Notification({ message, type = 'success' }) {
  return (
    <div className={`notification ${type}`}>
      {message}
    </div>
  );
}

export default Notification;
