const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

function getZodiacSign(day, month) {

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        return "Aquarius";
    }

    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return "Pisces";
    }

    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        return "Aries";
    }

    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        return "Taurus";
    }

    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return "Gemini";
    }

    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        return "Cancer";
    }

    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        return "Leo";
    }

    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        return "Virgo";
    }

    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        return "Libra";
    }

    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        return "Scorpio";
    }

    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        return "Sagittarius";
    }

    return "Capricorn";
}

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

    // Time lived
    const diff = now - birthDate;

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // Zodiac
    const zodiac = getZodiacSign(
        birthDate.getDate(),
        birthDate.getMonth() + 1
    );

    return {
        zodiac,
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
