export function cleanPhoneNumber(input) {
  if (typeof input !== 'string') {
    return '';
  }

  // Remove espaços, traços e parênteses
  const noFormatting = input.replace(/[\s()-]/g, '');

  // Remove o '+' inicial, se houver
  const noPlus = noFormatting.replace(/^\+/, '');

  // Mantém apenas dígitos
  return noPlus.replace(/\D/g, '');
}
