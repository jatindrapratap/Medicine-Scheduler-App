import React, { useState } from "react";
import { getMedicineForDate } from "./medicineSchedule";

function MedicineScheduler() {
    const [date, setDate] = useState("");
    const [medicineSchedule, setMedicineSchedule] = useState({
        rightEye: {},
        leftEye: {},
    });

    const handleDateChange = (e) => {
        setDate(e.target.value);
        setMedicineSchedule(getMedicineForDate(e.target.value));
    };

    return (
        <div>
            <h1>Eye Medicine Scheduler</h1>
            <input type="date" value={date} onChange={handleDateChange} />
            <div>
                <h2>Medicine Schedule for {date}:</h2>
                <div>
                    <div>
                        <h3>Right Eye Schedule:</h3>
                        <ul>
                            {Object.keys(medicineSchedule.rightEye).length === 0 ? (
                                <li>No medicines scheduled for the right eye on this date.</li>
                            ) : (
                                Object.entries(medicineSchedule.rightEye)
                                    .sort(([timeA], [timeB]) => {
                                        const timeOrder = [
                                            "7am",
                                            "9am",
                                            "11am",
                                            "1pm",
                                            "3pm",
                                            "5pm",
                                            "7pm",
                                            "9pm",
                                        ];
                                        return timeOrder.indexOf(timeA) - timeOrder.indexOf(timeB);
                                    })
                                    .map(([time, medicines], index) => (
                                        <li key={index}>
                                            <strong>{time}:</strong>
                                            <ul>
                                                {medicines.map((medicine, idx) => (
                                                    <li key={idx}>{medicine}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                            )}
                        </ul>
                    </div>

                    <div>
                        <h3>Left Eye Schedule:</h3>
                        <ul>
                            {Object.keys(medicineSchedule.leftEye).length === 0 ? (
                                <li>No medicines scheduled for the left eye on this date.</li>
                            ) : (
                                Object.entries(medicineSchedule.leftEye)
                                    .sort(([timeA], [timeB]) => {
                                        const timeOrder = [
                                            "7am",
                                            "9am",
                                            "11am",
                                            "1pm",
                                            "3pm",
                                            "5pm",
                                            "7pm",
                                            "9pm",
                                        ];
                                        return timeOrder.indexOf(timeA) - timeOrder.indexOf(timeB);
                                    })
                                    .map(([time, medicines], index) => (
                                        <li key={index}>
                                            <strong>{time}:</strong>
                                            <ul>
                                                {medicines.map((medicine, idx) => (
                                                    <li key={idx}>{medicine}</li>
                                                ))}
                                            </ul>
                                        </li>
                                    ))
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MedicineScheduler;
