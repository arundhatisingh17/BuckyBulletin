import React from "react";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import { Form } from "react-bootstrap";

const CustomDatePicker = ({ selectedDate, setSelectedDate }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label><strong>Select Date:</strong></Form.Label>
      <div className="custom-datepicker-container">
        <DatePicker
          onChange={setSelectedDate}
          value={selectedDate}
          format="yyyy-MM-dd"
          className="custom-datepicker"
        />
      </div>
    </Form.Group>
  );
};

export default CustomDatePicker;