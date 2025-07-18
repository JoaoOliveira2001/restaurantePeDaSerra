export function normalizePhone(telefone) {
  const digits = telefone.replace(/\D/g, "");
  return digits.startsWith("55") ? digits : "55" + digits;
}
