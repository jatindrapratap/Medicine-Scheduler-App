export function getMedicineForDate(date) {
    const startRightEye = new Date("2024-09-08");
    const startLeftEye = new Date("2024-09-14");
    const today = new Date(date);
  
    const rightEyeSchedule = {};
    const leftEyeSchedule = {};
  
    const timeSchedules = {
      1: ["9pm"],
      3: ["7am", "1pm", "7pm"],
      4: ["7am", "11am", "3pm", "7pm"],
      2: ["7am", "7pm"],
      6: ["7am", "9am", "11am", "1pm", "3pm", "5pm"],
    };
  
    const daysFromStart = (startDate) =>
      Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  
    // Right Eye Medicines
    if (today >= startRightEye) {
      const daysFromStartRight = daysFromStart(startRightEye);
  
      // MoxiTobra
      if (daysFromStartRight < 21) {
        rightEyeSchedule["MoxiTobra"] = timeSchedules[4];
      }
  
      // Trupred
      if (daysFromStartRight < 7) {
        rightEyeSchedule["Trupred"] = timeSchedules[6];
      } else if (daysFromStartRight < 14) {
        rightEyeSchedule["Trupred"] = timeSchedules[4];
      } else if (daysFromStartRight < 28) {
        rightEyeSchedule["Trupred"] = timeSchedules[3];
      } else if (daysFromStartRight < 42) {
        rightEyeSchedule["Trupred"] = timeSchedules[2];
      } else if (daysFromStartRight < 56) {
        rightEyeSchedule["Trupred"] = timeSchedules[1];
      }
  
      // Nexanac
      if (daysFromStartRight < 15) {
        rightEyeSchedule["Nexanac"] = timeSchedules[3];
      }
  
      // Cellusoothe
      if (daysFromStartRight < 60) {
        rightEyeSchedule["Cellusoothe"] = timeSchedules[4];
      }
  
      // Tropicacyl
      if (daysFromStartRight < 7) {
        rightEyeSchedule["Tropicacyl"] = ["9pm"];
      }
    }
  
    // Left Eye Medicines
    if (today >= startLeftEye) {
      const daysFromStartLeft = daysFromStart(startLeftEye);
  
      // MoxiTobra
      if (daysFromStartLeft < 21) {
        leftEyeSchedule["MoxiTobra"] = timeSchedules[4];
      }
  
      // Trupred
      if (daysFromStartLeft < 7) {
        leftEyeSchedule["Trupred"] = timeSchedules[6];
      } else if (daysFromStartLeft < 14) {
        leftEyeSchedule["Trupred"] = timeSchedules[4];
      } else if (daysFromStartLeft < 28) {
        leftEyeSchedule["Trupred"] = timeSchedules[3];
      } else if (daysFromStartLeft < 42) {
        leftEyeSchedule["Trupred"] = timeSchedules[2];
      } else if (daysFromStartLeft < 56) {
        leftEyeSchedule["Trupred"] = timeSchedules[1];
      }
  
      // Nexanac
      if (daysFromStartLeft < 15) {
        leftEyeSchedule["Nexanac"] = timeSchedules[3];
      }
  
      // Cellusoothe
      if (daysFromStartLeft < 60) {
        leftEyeSchedule["Cellusoothe"] = timeSchedules[4];
      }
  
      // Tropicacyl
      if (daysFromStartLeft < 7) {
        leftEyeSchedule["Tropicacyl"] = ["9pm"];
      }
    }
  
    // Organize medicines by time for both right and left eye schedules
    const organizeByTime = (schedule) => {
      const organizedSchedule = {};
      Object.entries(schedule).forEach(([medicine, times]) => {
        times.forEach((time) => {
          if (!organizedSchedule[time]) {
            organizedSchedule[time] = [];
          }
          organizedSchedule[time].push(medicine);
        });
      });
      return organizedSchedule;
    };
  
    return {
      rightEye: organizeByTime(rightEyeSchedule),
      leftEye: organizeByTime(leftEyeSchedule),
    };
  }
  