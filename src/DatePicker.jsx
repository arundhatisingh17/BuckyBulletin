import React from "react";

const DatePicker = ({selectedDate, setSelectDate}) => {
    return(
        <div className = "DateField" style = {StyleSheet.datePickerContainer}>
            <label htmlFor="event-date" style={styles.label}>Select Date:</label>
                <input
                    id="event-date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    style={styles.dateInput}
                /> 
        </div>
    );
};

const styles = {
    label: {
      paddingBottom: "33px",
      fontWeight: "bold",
      paddingRight: "7px"
    },
    dateInput: {
      padding: "5px",
      fontSize: "12px",
    },
  };

  export default DatePicker;