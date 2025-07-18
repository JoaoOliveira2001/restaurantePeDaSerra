export async function fetchFreeCocaList() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbzkUEc8W0n7fgUQ5raLNyIZ03dT9S63ZrZUvrbEg2gZbwcBkPlutCJhuFnpvuSX4EKi/exec"
  );
  if (!res.ok) {
    throw new Error(`HTTP error ${res.status}`);
  }
  const data = await res.json();
  if (!Array.isArray(data)) return [];
  return data.map((d) => String(d.Telefone).replace(/\D/g, ""));
}

export function hasFreeCoca(telefone, list) {
  const clean = telefone.replace(/\D/g, "");
  return Array.isArray(list) && list.includes(clean);
}
