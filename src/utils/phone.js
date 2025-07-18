export function cleanPhoneNumber(input) {
  const digits = input.replace(/[^0-9]/g, "");
  return digits.startsWith("55") ? digits : `55${digits}`;
}
