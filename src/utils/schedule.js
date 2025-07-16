export function checkAvailability(category) {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  if (category === 'marmitas') {
    const isWeekday = day >= 1 && day <= 5; // Monday to Friday
    return isWeekday && hour >= 11 && hour < 15;
  }

  if (category === 'lanches') {
    if (day >= 1 && day <= 4) {
      // Monday to Thursday
      return hour >= 10 && hour < 21;
    }
    if (day === 5 || day === 6) {
      // Friday and Saturday
      return hour >= 10 && hour < 23;
    }
    if (day === 0) {
      // Sunday
      return hour >= 18 && hour < 23;
    }
  }

  return true;
}
