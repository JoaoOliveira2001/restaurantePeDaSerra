export function checkAvailability(category) {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = now.getHours();

  if (category === 'marmitas') {
    const isWeekday = day >= 1 && day <= 5; // Monday to Friday
    return isWeekday && hour >= 11 && hour < 15;
  }

  if (category === 'lanches') {
    // Lanches are now available 24/7
    return true;
  }

  return true;
}
