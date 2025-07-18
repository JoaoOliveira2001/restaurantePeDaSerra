export async function checkFreeCoca(telefone) {
  try {
    const res = await fetch(
      "https://script.google.com/macros/s/AKfycbzkUEc8W0n7fgUQ5raLNyIZ03dT9S63ZrZUvrbEg2gZbwcBkPlutCJhuFnpvuSX4EKi/exec"
    );
    if (!res.ok) {
      throw new Error(`HTTP error ${res.status}`);
    }
    const data = await res.json();
    const cleanPhone = telefone.replace(/\D/g, "");
    return Array.isArray(data) && data.some((d) => String(d.Telefone) === cleanPhone);
  } catch (err) {
    console.error("Falha ao verificar promoção:", err);
    return false;
  }
}
