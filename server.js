const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function getBirthdayData(dob) {
    const now = new Date();
    const birthDate = new Date(dob);

    if (isNaN(birthDate)) {
        return null;
    }

    // Age
    let age = now.getFullYear() - birthDate.getFullYear();

    const monthDiff = now.getMonth() - birthDate.getMonth();

    if (
        monthDiff < 0 ||
        (monthDiff === 0 && now.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    // Time difference
    const diff = now - birthDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    return {
        age,
        daysLived: days,
        hoursLived: hours,
        minutesLived: minutes,
        secondsLived: seconds
    };
}

app.post("/birthday", (req, res) => {
    const { dob } = req.body;

    if (!dob) {
        return res.status(400).json({
            success: false,
            message: "Date of birth required"
        });
    }

    const result = getBirthdayData(dob);

    if (!result) {
        return res.status(400).json({
            success: false,
            message: "Invalid date"
        });
    }

    res.json({
        success: true,
        dob,
        ...result
    });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
