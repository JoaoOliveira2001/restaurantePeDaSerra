import React from 'react';
import { checkAvailability } from '../utils/schedule';

function AvailabilityNotice({ category }) {
  const available = checkAvailability(category);
  if (available) return null;

  let message = '';
  if (category === 'marmitas') {
    message = '🕒 Marmitas: disponíveis de segunda a sexta, das 11h às 15h.';
  } else if (category === 'lanches') {
    message = '🕒 Lanches: seg–qui 10h–21h; sex/sáb 10h–23h; dom 18h–23h.';
  } else {
    return null;
  }

  return (
    <div className="bg-yellow-500 text-black p-3 rounded mb-4">
      {message}
    </div>
  );
}

export default AvailabilityNotice;
