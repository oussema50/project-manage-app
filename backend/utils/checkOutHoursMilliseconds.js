exports.timeStringToMilliseconds = (timeString) => {
    // Initialize hours and minutes
    let hours = 0;
    let minutes = 0;

    // Extract hours and minutes using regular expressions
    const hoursMatch = timeString.match(/(\d+)\s*h/); // Matches any digits before "h"
    const minutesMatch = timeString.match(/(\d+)\s*min/); // Matches any digits before "min"

    if (hoursMatch) {
        hours = parseInt(hoursMatch[1], 10);
    }
    if (minutesMatch) {
        minutes = parseInt(minutesMatch[1], 10);
    }

    // Convert hours and minutes to milliseconds
    const hoursInMilliseconds = hours * 60 * 60 * 1000;
    const minutesInMilliseconds = minutes * 60 * 1000;

    // Total milliseconds
    return hoursInMilliseconds + minutesInMilliseconds;
};
