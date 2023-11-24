export default function generateCookieExpirationDates() {
    const currentDate = new Date();
  
    const sevenDaysLater = new Date(currentDate);
    sevenDaysLater.setDate(currentDate.getDate() + 7);
  
    const oneDayLater = new Date(currentDate);
    oneDayLater.setDate(currentDate.getDate() + 1);
  
    return { sevenDaysLater, oneDayLater };
  }