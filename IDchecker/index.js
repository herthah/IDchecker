const ID_LENGTH = 13;
const checkButton = document.getElementById('check-btn');
const clearButton = document.getElementById('clear-btn');

// Dictionary that holds the number of a month as a key (i.e. April = 4)
// and the value is the maximum number of days in that month.
let monthDayDictionary = {
    1: 31,
    2: 28,
    3: 31,
    4: 30,
    5: 31,
    6: 30,
    7: 31,
    8: 31,
    9: 30,
    10: 31,
    11: 30,
    12: 31
};

checkButton.addEventListener('click', displayResult);

// Allow user to press enter instead of clicking check button.
document.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        displayResult();
    }
});

// Clears the input field, and the error/success message
clearButton.addEventListener('click', function () {
    document.getElementById('id-input').value = null;
    document.getElementById('id-input').style.border = null;
    document.getElementById('result').innerText = null;;
});

// Years that are divisible by 4 are leap years.
// Except if the year is divisible by 100 but not by 400.
function isLeapYear(year) {
    if (year % 4 === 0) {
        if (year % 100 === 0) {
            if (year % 400 === 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function checkLenght(id) {
    if (id.length === ID_LENGTH) return true;
    else return false;
}

// Checks the validity. See about link on website.
function validID(id) {
    let sum = 0;
    for (let i = 0; i < ID_LENGTH; i++) {
        let digit = Number(id[i]);
        if ((i + 1) % 2 === 0) {
            let doubleDigit = digit * 2;

            if (doubleDigit > 9) {
                doubleDigit = doubleDigit - 9;
            }

            sum += doubleDigit;
        } else {
            sum += digit;
        }
    }

    if (sum % 10 === 0) return true;
    else return false;
}

// Months must be between 1 and 12.
function validMonth(id) {
    let month = Number(id[2] + id[3]);
    if (month >= 1 && month <= 12) return true;
    else return false;
}

// id parameter is a string.
function validDay(id) {
    let year19 = Number("19" + id[0] + id[1]);
    let year20 = Number("20" + id[0] + id[1]);
    let month = Number(id[2] + id[3]);
    let day = Number(id[4] + id[5]);

    // If the year can be a leap year, and the month is Feb, and the day is 29, then this is an allowed day.
    if ((isLeapYear(year19) || isLeapYear(year20)) && day === 29 && month === 2) {
        return true;
    }

    // Otherwise, the day can not exceed the maximum number of days in a month.
    if (monthDayDictionary[String(month)] < day) {
        return false;
    } else {
        return true;
    }
}

// Change colour of input field and show text indicating validity of ID number.
function displayResult() {
    let idInput = document.getElementById('id-input');
    let id = idInput.value;

    if (checkLenght(id)) {
        if (validID(id) && validMonth(id) && validDay(id)) {
            idInput.style.border = "5px solid rgb(181,229,80)";
            document.getElementById('result').innerText = "✅ Valid ID number.";
        } else {
            idInput.style.border = "5px solid rgb(255, 51, 51)";
            document.getElementById('result').innerText = "❌ Invalid ID number."
        }
    } else {
        idInput.style.border = "5px solid rgb(255, 51, 51)";
        if (id.length < 13) {
            document.getElementById('result').innerText = "❌ ID number has less than 13 digits.";
        } else {
            document.getElementById('result').innerText = "❌ ID number has more than 13 digits.";
        }
    }
}