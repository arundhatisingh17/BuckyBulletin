import React, { useState } from "react";

const DatePicker = () => {
    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

    const handleDateChange = async (event) => {
        const newDate = event.target.value;
        setDate(newDate);
        console.log(newDate);

        try {
            const response = await fetch("http://127.0.0.1:5000/api/date", {  // ✅ FIXED API URL
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ selected_date: newDate }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Response from Flask:", data);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="DateField" style={styles.datePickerContainer}>
            <label htmlFor="event-date" style={styles.label}>Select Date:</label>
            <input
                id="event-date"
                type="date"
                value={date}
                onChange={handleDateChange}
                style={styles.dateInput}
            />
        </div>
    );
};

const styles = {
    label: {
        paddingBottom: "10px",
        fontWeight: "bold",
        paddingRight: "7px",
    },
    dateInput: {
        padding: "5px",
        fontSize: "12px",
    },
};

export default DatePicker;
