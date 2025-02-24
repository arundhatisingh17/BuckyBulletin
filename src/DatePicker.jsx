import React from "react";
import { Form } from "react-bootstrap";

const DatePicker = ({ selectedDate, setSelectedDate }) => {
  
  const getLocalDate = (date) => {
    const local = new Date(date);
    local.setMinutes(local.getMinutes() - local.getTimezoneOffset()); // Adjust for timezone offset
    return local.toISOString().split("T")[0]; // Format as YYYY-MM-DD
  };

  return (
    <Form.Group className="mb-3">
      <Form.Label><strong>Select Date:</strong></Form.Label>
      <Form.Control
        type="date"
        value={getLocalDate(selectedDate)}
        onChange={(e) => setSelectedDate(new Date(e.target.value))}
        style={{ cursor: "pointer", maxWidth: "200px" }}
      />
    </Form.Group>
  );
};

export default DatePicker;