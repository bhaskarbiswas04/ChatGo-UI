export const extractTime = (dateString) => {
  const date = new Date(dateString);
  const hours = padZero(date.getHours());
  const minutes = padZero(date.getMinutes());
  return `${hours}:${minutes}`;
};

// Helper function to turn "9:5" into "09:05"
function padZero(number) {
  return number.toString().padStart(2, "0");
}