import React, { useState, useEffect } from "react";
import { getMedicineForDate } from "./medicineSchedule";
import "./MedicineScheduler.css"; // Import the CSS file

function MedicineScheduler() {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState("7am");
    const [medicineSchedule, setMedicineSchedule] = useState({
        rightEye: {},
        leftEye: {},
    });
    const [timeTaken, setTimeTaken] = useState({});

    useEffect(() => {
        setMedicineSchedule(getMedicineForDate(date));
    }, [date]);

    useEffect(() => {
        // Load the checkbox state from localStorage when the component mounts
        const storedTimeTaken = JSON.parse(localStorage.getItem(date)) || {};
        setTimeTaken(storedTimeTaken);
    }, [date]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const handleCheckboxChange = (time) => {
        const updatedTimeTaken = {
            ...timeTaken,
            [time]: !timeTaken[time],
        };
        setTimeTaken(updatedTimeTaken);

        // Save the updated checkbox state in localStorage
        localStorage.setItem(date, JSON.stringify(updatedTimeTaken));
    };

    const timeOptions = ["7am", "9am", "11am", "1pm", "3pm", "5pm", "7pm", "9pm"];

    return (
        <div>
            <h1>Eye Medicine Scheduler</h1>
            <p>HINT: Select both date and time to see what medicines need to be taken</p>
            <div className="date-time">
                <input type="date" value={date} onChange={handleDateChange} />
                <select value={selectedTime} onChange={handleTimeChange}>
                    {timeOptions.map((time) => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>
            </div>

            {/* Checkbox for marking the medicines as consumed at the selected time */}
            <div className="checkbox-container">
                <input
                    type="checkbox"
                    id={`time-checkbox-${selectedTime}`}
                    checked={timeTaken[selectedTime] || false}
                    onChange={() => handleCheckboxChange(selectedTime)}
                />
                <label htmlFor={`time-checkbox-${selectedTime}`}>
                    Mark medicines for {selectedTime} as consumed
                </label>
            </div>
            <div className="medicine-schedule">
                <h2>Medicine Schedule for {date} at {selectedTime}:</h2>
                <div>
                    <div>
                        <h3>Right Eye Schedule:</h3>
                        <ul>
                            {medicineSchedule.rightEye[selectedTime] ? (
                                medicineSchedule.rightEye[selectedTime].map((medicine, idx) => (
                                    <li key={idx}>{medicine}</li>
                                ))
                            ) : (
                                <li>No medicines scheduled for the right eye at this time.</li>
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3>Left Eye Schedule:</h3>
                        <ul>
                            {medicineSchedule.leftEye[selectedTime] ? (
                                medicineSchedule.leftEye[selectedTime].map((medicine, idx) => (
                                    <li key={idx}>{medicine}</li>
                                ))
                            ) : (
                                <li>No medicines scheduled for the left eye at this time.</li>
                            )}
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MedicineScheduler;
