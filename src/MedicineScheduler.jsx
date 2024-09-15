import React, { useState, useEffect } from "react";
import { getMedicineForDate } from "./medicineSchedule";

function MedicineScheduler() {
    const today = new Date().toISOString().split("T")[0];
    const [date, setDate] = useState(today);
    const [selectedTime, setSelectedTime] = useState("7am");
    const [medicineSchedule, setMedicineSchedule] = useState({
        rightEye: {},
        leftEye: {},
    });

    useEffect(() => {
        setMedicineSchedule(getMedicineForDate(date));
    }, [date]);

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setSelectedTime(e.target.value);
    };

    const timeOptions = ["7am", "9am", "11am", "1pm", "3pm", "5pm", "7pm", "9pm"];

    return (
        <div>
            <h1>Eye Medicine Scheduler</h1>
            <p>HINT: Select both date and time to see what medicines need to be taken</p>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <input type="date" value={date} onChange={handleDateChange} />
                <select value={selectedTime} onChange={handleTimeChange}>
                    {timeOptions.map((time) => (
                        <option key={time} value={time}>{time}</option>
                    ))}
                </select>
            </div>
            <div>
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
